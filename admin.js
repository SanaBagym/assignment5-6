document.addEventListener("DOMContentLoaded", () => {
    if (!isAdmin()) {
        alert("Access Denied");
        window.location.href = "index.html";
        return;
    }
    displayUserTable();
});

// Check if User is Admin
function isAdmin() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser && loggedInUser.role === "admin";
}

// Display User Table
function displayUserTable() {
    const adminContainer = document.getElementById("admin-container");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userTable = document.createElement("table");
    userTable.innerHTML = `
        <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
    `;

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.username}</td>
            <td contenteditable="true" data-field="firstName">${user.firstName}</td>
            <td contenteditable="true" data-field="lastName">${user.lastName}</td>
            <td contenteditable="true" data-field="email">${user.email}</td>
            <td contenteditable="true" data-field="phone">${user.phone}</td>
            <td>
                <button onclick="saveUser('${user.username}')">💾</button>
                <button onclick="deleteUser('${user.username}')">🗑️</button>
            </td>
        `;
        userTable.appendChild(row);
    });

    adminContainer.innerHTML = ""; // Clear container
    adminContainer.appendChild(userTable);
}

// Save Updated User Data
function saveUser(username) {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(u => u.username === username);

    const row = document.querySelector(`tr:has(td:contains(${username}))`);
    user.firstName = row.querySelector('[data-field="firstName"]').textContent;
    user.lastName = row.querySelector('[data-field="lastName"]').textContent;
    user.email = row.querySelector('[data-field="email"]').textContent;
    user.phone = row.querySelector('[data-field="phone"]').textContent;

    localStorage.setItem("users", JSON.stringify(users));
    alert("User updated successfully!");
}

// Delete User
function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(user => user.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
    displayUserTable(); // Refresh table
}
