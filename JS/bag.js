/*
Name: Jessica Hussain
Last Updated: 11/01/2026
Project: Briar & Bone
Purpose: Display saved shopping bag items and their subtotal.
*/

function displayBag() {
    const cart = getCart();

    const bagItems = document.getElementById("bag-items");
    const emptyMessage = document.getElementById("empty-bag-message");
    const bagSummary = document.getElementById("bag-summary");
    const subtotalDisplay = document.getElementById("bag-subtotal");

    // Clear previous content before displaying the current cart.
    bagItems.replaceChildren();

    // Show either the empty message or the order summary.
    const isEmpty = cart.length === 0;

    emptyMessage.hidden = !isEmpty;
    bagSummary.hidden = isEmpty;

    // Update the subtotal using the shared cart function.
    subtotalDisplay.textContent = getCartSubtotal().toFixed(2);

    // Create a display card for each saved item.
    cart.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "bag-item";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "Price each: $" + item.price.toFixed(2);

        // Creates the quantity controls.
        const quantityControls = document.createElement("div");
        quantityControls.className = "bag-quantity-controls";

        const quantityLabel = document.createElement("label");
        quantityLabel.htmlFor = "quantity-" + item.id;
        quantityLabel.textContent = "Quantity:";

        // Finds item inventory in the shared product data.
        const product = products.find(function (catalogProduct) {
            return catalogProduct.id === item.id;
        });

        const maximumQuantity = product ? product.stock : 0; 

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.id = "quantity-" + item.id;
        quantityInput.className = "bag-quantity-input";
        quantityInput.min = "1";
        quantityInput.max = String(maximumQuantity);
        quantityInput.step = "1";
        quantityInput.required = true;
        quantityInput.value = item.quantity;
        quantityInput.setAttribute(
            "aria-label",
            "Quantity for " + item.name
        );

        const updateButton = document.createElement("button");
        updateButton.type = "button";
        updateButton.className = "bag-update-button";
        updateButton.textContent = "Update";
        updateButton.setAttribute(
            "aria-label",
            "Update quantity for " + item.name
        );

        const quantityMessage = document.createElement("p");
        quantityMessage.className = "bag-quantity-message";
        quantityMessage.setAttribute("role", "status");

        updateButton.addEventListener("click", function () {
            quantityMessage.textContent = "";

            // Check the current product record before saving.
            const currentProduct = products.find(function (catalogProduct) {
                return catalogProduct.id === item.id;
            });

            if (!currentProduct) {
                quantityMessage.textContent =
                    "This product is no longer available. Please remove it from your bag.";
                return;
            }

            const newQuantity = quantityInput.valueAsNumber;

            if (!Number.isSafeInteger(newQuantity) || newQuantity < 1) {
                quantityMessage.textContent =
                    "Enter a whole number of 1 or more.";
                quantityInput.focus();
                return;
            }

            if (newQuantity > currentProduct.stock) {
                quantityMessage.textContent =
                    "Only " + currentProduct.stock +
                    " units are available in total. Enter a quantity no higher than " +
                    currentProduct.stock + ".";
                quantityInput.focus();
                return;
            }

            // Check the input's remaining browser validation rules.
            if (!quantityInput.reportValidity()) {
                return;
            }

            // Read the latest saved cart before updating it.
            const updatedCart = getCart();

            const cartItem = updatedCart.find(function (savedItem) {
                return savedItem.id === item.id;
            });

            if (!cartItem) {
                displayBag();
                return;
            }

            cartItem.quantity = newQuantity;

            if (!saveCart(updatedCart)) {
                quantityMessage.textContent =
                    "The quantity could not be saved. Please try again.";
                return;
            }

            // Refresh the displayed quantities and totals.
            displayBag();

            // Return keyboard focus to this item's Update button.
            const updatedInput = document.getElementById(
                "quantity-" + item.id
            );

            const updatedControls = updatedInput.parentElement;
            updatedControls.querySelector("button").focus();

            updatedControls.nextElementSibling.textContent =
                "Quantity updated to " + newQuantity + ".";
        });

        quantityControls.append(
            quantityLabel,
            quantityInput,
            updateButton
        );

        // Calculate the line total in cents.
        const lineTotalCents =
            Math.round(item.price * 100) * item.quantity;

        const lineTotal = document.createElement("p");
        lineTotal.className = "bag-line-total";
        lineTotal.textContent =
            "Item total: $" + (lineTotalCents / 100).toFixed(2);

            // Creates a button that removes this product from the bag.
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "bag-remove-button";
        removeButton.textContent = "Remove";
        removeButton.setAttribute(
            "aria-label",
            "Remove " + item.name + " from bag"
        );

        removeButton.addEventListener("click", function () {
            const updatedCart = getCart().filter(function (savedItem) {
                return savedItem.id !== item.id;
            });

            if (!saveCart(updatedCart)) {
                quantityMessage.textContent =
                    "The item could not be removed. Please try again.";
                return;
            }

            // Refresh the items, subtotal, and empty-bag message.
            displayBag();
        });

        card.append(
            name,
            price,
            quantityControls,
            quantityMessage,
            lineTotal,
            removeButton
        );

        bagItems.appendChild(card);
    });
}

// Connects the Clear Bag button.
const clearBagButton = document.getElementById("clear-bag-button");
const bagActionMessage = document.getElementById("bag-action-message");

clearBagButton.addEventListener("click", function () {
    // Ask before removing every item.
    const confirmed = window.confirm(
        "Remove all items from your shopping bag?"
    );

    if (!confirmed) {
        return;
    }

    // Save an empty cart using the existing shared function.
    if (!saveCart([])) {
        bagActionMessage.textContent =
            "Your bag could not be cleared. Please try again.";
        return;
    }

    bagActionMessage.textContent = "";

    // Refresh the page content to show the empty bag.
    displayBag();

    // Move focus to the shopping link now that the button is hidden.
    const shopLink = document.querySelector("#empty-bag-message a");
    shopLink.focus();
});

// Display the saved bag when this page loads.
displayBag();