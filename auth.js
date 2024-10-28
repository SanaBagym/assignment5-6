// Initialize Users if not already in localStorage
const initializeUsers = () => {
    const users = [
        { 
            username: "admin", password: "admin123", role: "admin", 
            firstName: "Admin", lastName: "User", email: "admin@example.com", 
            phone: "+1234567890" 
        },
        { 
            username: "user1", password: "user123", role: "user", 
            firstName: "Regular", lastName: "User", email: "user1@example.com", 
            phone: "+9876543210" 
        }
    ];
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }
};

// Register Function
const registerUser = (username, password, firstName, lastName, email, phone) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }
    users.push({ username, password, role: "user", firstName, lastName, email, phone });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
};

// Login Function
const loginUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = user.role === "admin" ? "admin.html" : "index.html";
    } else {
        alert("Invalid username or password!");
    }
};

// Initialize users on load
initializeUsers();
