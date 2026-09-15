const usersContainer = document.getElementById('users');
const userForm = document.getElementById('userForm');
const submitBtn = document.getElementById('submitBtn');

let users = [];

// Keep the "Add User" button disabled until all required fields are filled
function updateSubmitState() {
  submitBtn.disabled = !userForm.checkValidity();
}

userForm.addEventListener('input', updateSubmitState);
updateSubmitState();

// Load users from users.json
async function loadUsers() {
try {
const response = await fetch('/data');

if (!response.ok) {
  throw new Error('Failed to load users');
}

users = await response.json();

renderUsers();

} catch (error) {
console.error(error);

usersContainer.innerHTML = '<p class="empty">Failed to load users.</p>';

}
}

// Render users
function renderUsers() {
if (users.length === 0) {
usersContainer.innerHTML = '<p class="empty">No users found.</p>';
return;
}

usersContainer.innerHTML = '';

users.forEach((user) => {
const card = document.createElement('div');

card.className = 'user-card';

card.innerHTML = `
<div>
    <h3>${user.name}</h3>
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone || '-'}</p>
    <p><strong>Website:</strong> ${user.website || '-'}</p>
  </div>
`;

usersContainer.appendChild(card);

});
}

// Handle form submission
userForm.addEventListener('submit', async (event) => {
event.preventDefault();

const formData = new FormData(userForm);

const newUser = {
id: users.length + 1,
name: formData.get('name'),
username: formData.get('username'),
email: formData.get('email'),
phone: formData.get('phone'),
website: formData.get('website')
};

try {
const response = await fetch('/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newUser)
});

if (!response.ok) {
  throw new Error('Failed to save user');
}

users.push(newUser);

renderUsers();

userForm.reset();
updateSubmitState();
} catch (error) {
console.error(error);
}
});

// Load users when the page starts
loadUsers();
