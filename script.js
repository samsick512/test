const MODEL_URL = "./my_model/";

const imageUpload = document.getElementById("imageUpload");
const labelContainer = document.getElementById("label-container");
const statusMessage = document.getElementById("statusMessage");
const previewImage = document.getElementById("previewImage");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const resultSummary = document.getElementById("resultSummary");

let model;
let maxPredictions = 0;

function setStatus(message) {
  statusMessage.textContent = message;
}

function createLabelRow() {
  const item = document.createElement("div");
  item.className = "label-item";

  const row = document.createElement("div");
  row.className = "label-row";

  const name = document.createElement("span");
  const score = document.createElement("span");
  row.append(name, score);

  const track = document.createElement("div");
  track.className = "label-track";

  const bar = document.createElement("div");
  bar.className = "label-bar";
  track.appendChild(bar);

  item.append(row, track);

  return { item, name, score, bar };
}

function buildSummary(topPrediction) {
  const percentage = (topPrediction.probability * 100).toFixed(1);
  return `${topPrediction.className} ${percentage}%`;
}

async function loadModel() {
  if (model) {
    return model;
  }

  setStatus("모델을 불러오는 중입니다.");

  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer.innerHTML = "";
  for (let index = 0; index < maxPredictions; index += 1) {
    const row = createLabelRow();
    labelContainer.appendChild(row.item);
  }

  setStatus("모델 준비가 완료되었습니다.");
  return model;
}

function renderPredictions(predictions) {
  const sortedPredictions = [...predictions].sort((left, right) => right.probability - left.probability);
  const topPrediction = sortedPredictions[0];

  resultSummary.textContent = buildSummary(topPrediction);

  predictions.forEach((prediction, index) => {
    const row = labelContainer.children[index];
    const percentage = (prediction.probability * 100).toFixed(1);
    const [nameNode, scoreNode] = row.querySelector(".label-row").children;

    nameNode.textContent = prediction.className;
    scoreNode.textContent = `${percentage}%`;
    row.querySelector(".label-bar").style.width = `${percentage}%`;
  });
}

async function predictFromSource(sourceElement) {
  if (!model) {
    await loadModel();
  }

  const predictions = await model.predict(sourceElement);
  renderPredictions(predictions);
}

async function handleImageUpload(event) {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  try {
    await loadModel();

    const imageUrl = URL.createObjectURL(file);
    previewImage.src = imageUrl;
    previewImage.hidden = false;
    previewPlaceholder.hidden = true;

    await new Promise((resolve, reject) => {
      previewImage.onload = resolve;
      previewImage.onerror = reject;
    });

    await predictFromSource(previewImage);
    setStatus("업로드한 사진 분석이 완료되었습니다.");
  } catch (error) {
    console.error(error);
    setStatus("사진 분석에 실패했습니다. 모델 파일과 이미지 형식을 확인하세요.");
  }
}

imageUpload.addEventListener("change", handleImageUpload);

loadModel().catch((error) => {
  console.error(error);
  setStatus("모델을 자동으로 불러오지 못했습니다. my_model/model.json 과 metadata.json 파일이 있는지 확인하세요.");
});
