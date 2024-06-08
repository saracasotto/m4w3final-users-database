document.addEventListener("DOMContentLoaded", () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';
    const userTable = document.getElementById('userTable');
    const filter = document.getElementById('filter');
    const filterInput = document.getElementById('filterInput');

    let users = [];

    //Function to fetch user data from the API
    const fetchUsers = async () => {
        try {
            const response = await fetch(apiURL);
            users = await response.json();
            renderTable(users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //Function to render the table with user data
    const renderTable = (users) => {
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                </tr>
            `;
            userTable.insertAdjacentHTML('beforeend', row);
        });
    };

    //Function to filter user data based on input and selected filter
    const filterUsers = () => {
        const filterValue = filter.value;
        const filterText = filterInput.value.toLowerCase();
        const filteredUsers = users.filter(user => user[filterValue].toLowerCase().includes(filterText));
        renderTable(filteredUsers);
    };

    //Event listener for the text input to trigger filtering
    filterInput.addEventListener('input', filterUsers);
    //Event listener for the dropdown to trigger filtering
    filter.addEventListener('change', filterUsers);

    // Initial fetch of user data
    fetchUsers();
});
