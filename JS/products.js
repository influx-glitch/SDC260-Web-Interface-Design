/*
Name: Jessica Hussain
Last Updated: 10/25/2026
Project: Briar & Bone
Purpose: Store product information and display the catalog.
*/

// Calculates stock remaining after units in the bag are reserved.
function getAvailableStock(product) {
    const cartItem = getCart().find(function (item) {
        return item.id === product.id;
    });

    const quantityInBag = cartItem ? cartItem.quantity : 0;

    return Math.max(0, product.stock - quantityInBag);
}


// Adds one unit of a product to the saved shopping bag.
function addToBag(product) {
    const feedback = document.getElementById("cart-feedback");

    // Stop before changing the cart if no units are available.
    if (getAvailableStock(product) <= 0) {
        feedback.textContent = product.name + " is Out of Stock.";
        return;
    }

    const cart = getCart();

    // Check whether this product is already in the bag.
    const existingItem = cart.find(function (item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Only show success if saving worked.
    if (!saveCart(cart)) {
        feedback.textContent =
            "Your item could not be saved. Please check your browser storage settings.";
        return;
    }

    const addedItem = cart.find(function (item) {
        return item.id === product.id;
    });

    feedback.textContent =
        product.name + " added to your bag! Quantity in bag: " +
        addedItem.quantity + ".";

        // Refresh this product's available-stock display.
    const availableStock = getAvailableStock(product);
    const stockDisplay = document.getElementById("stock-" + product.id);

    stockDisplay.textContent = "Available stock: " + availableStock;

    // Refresh the button when the final available unit is added.
    const addButton = document.getElementById("add-" + product.id);
    const isOutOfStock = availableStock <= 0;

    addButton.textContent = isOutOfStock ? "Out of Stock" : "Add to Bag";
    addButton.title = isOutOfStock ? "Out of Stock" : "";
    addButton.setAttribute("aria-disabled", String(isOutOfStock));
    addButton.setAttribute(
        "aria-label",
        isOutOfStock
            ? product.name + " — Out of Stock"
            : "Add " + product.name + " to bag"
    );
}

// Finds product container on the Shop page.
const productList = document.getElementById("product-list");

// Repeat these steps for every product in the array.
products.forEach(function (product) {
// Create a card for this product.
const card = document.createElement("article");
card.className = "catalog-card";
card.id = product.id;

// Creates the product image.
const image = document.createElement("img");
image.src = product.image;
image.alt = product.name;
image.className = "catalog-image";
image.loading = "lazy";

// Creates a container for the text.
const content = document.createElement("div");
content.className = "catalog-content";

// Creates the category label.
const category = document.createElement("p");
category.className = "catalog-category";
category.textContent = product.category;

// Creates the product heading.
const name = document.createElement("h3");
name.textContent = product.name;

// Creates the description.
const description = document.createElement("p");
description.className = "catalog-description";
description.textContent = product.description;

// Creates the price.
const price = document.createElement("p");
price.className = "catalog-price";
price.textContent = "$" + product.price.toFixed(2);

// Creates the available-stock display.
const stockDisplay = document.createElement("p");
stockDisplay.className = "catalog-stock";
stockDisplay.id = "stock-" + product.id;
stockDisplay.textContent =
    "Available stock: " + getAvailableStock(product);

// Creates the Add to Bag button.
const addButton = document.createElement("button");
addButton.type = "button";
addButton.id = "add-" + product.id;
addButton.className = "add-to-bag-button";

const isOutOfStock = getAvailableStock(product) <= 0;

addButton.textContent = isOutOfStock ? "Out of Stock" : "Add to Bag";
addButton.title = isOutOfStock ? "Out of Stock" : "";
addButton.setAttribute("aria-disabled", String(isOutOfStock));
addButton.setAttribute(
    "aria-label",
    isOutOfStock
        ? product.name + " — Out of Stock"
        : "Add " + product.name + " to bag"
);

// The addToBag function checks stock before making any changes.
addButton.addEventListener("click", function () {
    addToBag(product);
});

// Places the text and button inside the container.
content.append(category, name, description, price, stockDisplay, addButton);

// Places the image and text inside the card.
card.append(image, content);

// Adds the completed card to the page.
productList.appendChild(card);
});