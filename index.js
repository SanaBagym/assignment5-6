document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCartCounter();
});

// Display Products
function displayProducts() {
    const productContainer = document.querySelector(".product-container");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}₽</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === productId);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

// Update Cart Counter
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}
