document.addEventListener('DOMContentLoaded', () => {
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const loginForm = document.querySelector('#logInForm');
  const loginInput = document.querySelector('#login');
  const passwordInput = document.querySelector('#password');
  const buttonAuth = document.querySelector('.button-auth');
  const buttonOut = document.querySelector('.button-out');
  const userName = document.querySelector('.user-name');

  const openModalAuth = () => {
    modalAuth.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
   
  };

  const closeModalAuth = () => {
    modalAuth.style.display = 'none';
    document.body.style.overflow = ''; 
  };

  const login = (user) => {
    userName.textContent = user;
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';
    userName.style.display = 'block';
    closeModalAuth();
  };

  const logout = () => {
    userName.textContent = '';
    buttonAuth.style.display = 'block';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    localStorage.removeItem('user');
  };

  const validateFields = () => {
    let isValid = true;

    if (!loginInput.value.trim()) {
      loginInput.style.borderColor = 'red';
      isValid = false;
    } else {
      loginInput.style.borderColor = 'black';
    }

    if (!passwordInput.value.trim()) {
      passwordInput.style.borderColor = 'red';
      isValid = false;
    } else {
      passwordInput.style.borderColor = 'black';
    }

    return isValid;
  };

  buttonAuth.addEventListener('click', openModalAuth);

  closeAuth.addEventListener('click', closeModalAuth);

  modalAuth.addEventListener('click', (event) => {
    if (event.target === modalAuth) {
      closeModalAuth();
    }
  });

  buttonOut.addEventListener('click', () => {
    logout();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateFields()) {
      const loginValue = loginInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      localStorage.setItem('user', loginValue);
      login(loginValue);
    } else {
      alert('Будь ласка, заповніть всі поля!');
    }
  });

  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    login(savedUser);
  }
});
