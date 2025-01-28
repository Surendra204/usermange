let users = [];
let currentPage = 1;
const usersPerPage = 5;
let totalUsers = 10;  //  we'll use this for pagination logic.

// Render the user list on the page
function renderUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear the previous list

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

// Add a new user to the list
function addUser(user) {
    users.push(user);
    renderUserList();
}

// Reset the form to add a new user
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('form-title').innerText = 'Add User';
    document.getElementById('user-form').onsubmit = function (e) {
        e.preventDefault();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,  // Increment last ID or start at 1
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value
        };
        addUser(newUser);
        resetForm();
    };
}

// Update pagination display
function updatePagination() {
    document.getElementById('page-info').innerText = `Page ${currentPage}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === Math.ceil(totalUsers / usersPerPage);
}

// Fetch users from the API
function fetchUsers(page = 1) {
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`)
        .then(response => response.json())
        .then(data => {
            users = data;
            renderUserList();
            updatePagination();
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users from the API.');
        });
}

// Edit a user
function editUser(id) {
    const user = users.find(u => u.id === id);
    document.getElementById('name').value = user.name;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('form-title').innerText = 'Edit User';

    // Modify the form submission for editing
    const form = document.getElementById('user-form');
    form.onsubmit = function (e) {
        e.preventDefault();
        user.name = document.getElementById('name').value;
        user.username = document.getElementById('username').value;
        user.email = document.getElementById('email').value;
        renderUserList();
        resetForm();
    };
}

// Delete a user from the list
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUserList();
}

// Handle page change (next/previous)
function handlePageChange(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage);
    } else if (direction === 'next' && currentPage < Math.ceil(totalUsers / usersPerPage)) {
        currentPage++;
        fetchUsers(currentPage);
    }
}

// Add event listeners to pagination buttons
document.getElementById('prev-page').onclick = function () {
    handlePageChange('prev');
};
document.getElementById('next-page').onclick = function () {
    handlePageChange('next');
};

// Initial fetch of users
fetchUsers();
