// Admin Login
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';
  } else {
    loginMessage.textContent = 'Invalid credentials. Try again.';
    loginMessage.style.color = 'red';
  }
});

// Case Search
const searchForm = document.getElementById('searchForm');
const searchResult = document.getElementById('searchResult');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const caseId = document.getElementById('caseId').value;

  if (caseId) {
    searchResult.textContent = `Case ${caseId} found! (Fictional Data)`;
    searchResult.style.color = 'green';
  } else {
    searchResult.textContent = 'Please enter a case ID.';
    searchResult.style.color = 'red';
  }
});
