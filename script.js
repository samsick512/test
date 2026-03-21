const numbersContainer = document.getElementById("numbers");
const bonusContainer = document.getElementById("bonus");
const drawButton = document.getElementById("drawButton");

function pickUniqueNumbers(count, max) {
  const pool = Array.from({ length: max }, (_, index) => index + 1);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, count);
}

function getBallClass(number) {
  if (number <= 10) {
    return "ball-yellow";
  }
  if (number <= 20) {
    return "ball-blue";
  }
  if (number <= 30) {
    return "ball-red";
  }
  if (number <= 40) {
    return "ball-gray";
  }
  return "ball-green";
}

function createBall(number, delay) {
  const ball = document.createElement("div");
  ball.className = `ball ${getBallClass(number)}`;
  ball.textContent = number;
  ball.style.animationDelay = `${delay}s`;
  return ball;
}

function drawLottoNumbers() {
  const picks = pickUniqueNumbers(7, 45);
  const mainNumbers = picks.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = picks[6];

  numbersContainer.innerHTML = "";
  bonusContainer.textContent = "?";

  mainNumbers.forEach((number, index) => {
    numbersContainer.appendChild(createBall(number, index * 0.08));
  });

  bonusContainer.className = `bonus-number ${getBallClass(bonusNumber)}`;
  bonusContainer.textContent = bonusNumber;
  bonusContainer.style.animation = "none";
  void bonusContainer.offsetWidth;
  bonusContainer.style.animation = "rise-in 0.45s ease forwards";
  bonusContainer.style.animationDelay = "0.5s";
}

drawButton.addEventListener("click", drawLottoNumbers);
drawLottoNumbers();
