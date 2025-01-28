let users = [];
let currentPage = 1;
const usersPerPage = 5;
let totalUsers = 10;  //  we'll use this for pagination logic.
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
