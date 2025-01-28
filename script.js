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

// Initial fetch of users
fetchUsers();
