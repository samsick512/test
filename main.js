const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Here you would typically send the login data to a server for authentication
    alert(`Hello, ${username}!`);
});
