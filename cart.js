document.addEventListener("DOMContentLoaded", () => {
    displayCartPopup();
});

function displayCartPopup() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p><strong>${item.name}</strong> - ${item.price}₽</p>
                <p>${item.description}</p>
                <hr>
            `;
            cartContainer.appendChild(itemDiv);
            total += item.price;
        });

        const totalDiv = document.createElement("div");
        totalDiv.className = "cart-total";
        totalDiv.innerHTML = `<p><strong>Total: ${total}₽</strong></p>`;
        cartContainer.appendChild(totalDiv);
    }
}
