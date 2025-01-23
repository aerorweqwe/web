document.addEventListener('DOMContentLoaded', () => {
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const loginForm = document.querySelector('#logInForm');
  const loginInput = document.querySelector('#login');
  const passwordInput = document.querySelector('#password');
  const buttonAuth = document.querySelector('.button-auth');
  const buttonOut = document.querySelector('.button-out');
  const userName = document.querySelector('.user-name');

  if (buttonAuth) {
    buttonAuth.addEventListener('click', () => {
        console.log('Auth button clicked');
    });
}
  const openModalAuth = () => {
    modalAuth.style.display = 'flex';
  };

  const closeModalAuth = () => {
    modalAuth.style.display = 'none';
  };

 const login = (user) => {
  if (userName) {
    userName.textContent = user;
    userName.style.display = 'block';
  }
  if (buttonAuth) buttonAuth.style.display = 'none';
  if (buttonOut) buttonOut.style.display = 'block';
  closeModalAuth();
};

  const logout = () => {
    userName.textContent = '';
    buttonAuth.style.display = 'block';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    localStorage.removeItem('user');
  };

  buttonAuth.addEventListener('click', openModalAuth);
  closeAuth.addEventListener('click', closeModalAuth);

  buttonOut.addEventListener('click', () => {
    logout();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (loginValue && passwordValue) {
      localStorage.setItem('user', loginValue); // Зберігаємо ім'я користувача в localStorage
      login(loginValue);
    } else {
      alert('Будь ласка, заповніть всі поля!');
    }
  });

  // Автоматичне відображення користувача, якщо він уже авторизований
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    login(savedUser);
  }
});
