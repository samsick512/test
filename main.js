const loginForm = document.getElementById('login-form');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateToggleButtonText(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButtonText(newTheme);
});

function updateToggleButtonText(theme) {
    themeToggle.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Here you would typically send the login data to a server for authentication
    alert(`Hello, ${username}!`);
});
