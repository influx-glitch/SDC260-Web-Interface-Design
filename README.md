# SDC260-Web-Interface-Design
# Briar & Bone

##Website Purpose
Briar & Bone is a proposed online store selling fantasy mini figures, paints supplies, and kits. It will have a gothic woodland theme with accessible colors.

Customers will be able to browse products, view details, add items to cart, and checkout.

##Feature Roadmap
| Week	| Milestone |	Target | Date |	Plan |
| 1|	Project setup and planning |	Oct. 11 |	Set up GitHub, draw out the site map, and pick a color scheme. |
| 2	| Build homepage and navigation |	Oct. 18 |	Create the homepage structure and navigation, and add space for featured products. |
| 3	| Product catalog and details page |	Oct. 25 |	Add product data and images, build product cards, and plan the product-detail layout. |
| 4	| Shopping cart |	Nov. 1 |	Create the “add to cart” function, calculate the total, allow item updates and removal, and test cart functionality. |
| 5	| Checkout and final testing |	Nov. 8 |	Create the checkout form and input fields, create a confirmation page, and test navigation and keyboard accessibility. |


The project uses HTML, CSS, and JavaScript. No real products are sold,
payments are processed, or contact messages are delivered.

## Developer

- Name: Jessica Hussain
- Course: SDC260 Web Interface Design
- Project: Briar & Bone

## Website Pages and Features

### Home

- Introduces the store and its fantasy-miniature theme.
- Features the Briarwood Witch and Cryptkeeper Paint Kit.
- Links featured products to their corresponding Shop cards.
- Uses a responsive two-card layout that stacks on smaller screens.
- Includes woodland-inspired typography, botanical ornaments, and
  soft moss-toned backgrounds.

### Shop

- Displays products with images, names, categories, descriptions,
  prices, and available stock.
- Uses a responsive product grid.
- Allows customers to add products to their shopping bag.
- Provides immediate visual feedback when a product is added.
- Reduces displayed available stock as units are reserved in the bag.
- Prevents additional units from being added when no stock remains.
- Displays an "Out of Stock" button label and hover tooltip for
  unavailable products.

### Bag

- Displays saved items, individual prices, quantities, and line totals.
- Calculates the current bag subtotal.
- Allows quantities to be updated within available inventory limits.
- Allows individual products to be removed.
- Includes a confirmation prompt before clearing the entire bag.
- Displays an empty-bag message when no products remain.
- Provides navigation to Checkout when the bag contains items.
- Preserves cart contents after a browser refresh.

### Checkout

- Validates required shipping and demonstration payment fields.
- Checks ZIP code, phone number, card-number format, expiration date,
  and security-code format.
- Rejects checkout when the bag is empty or stock is insufficient.
- Displays the subtotal, discount, and final total.
- Accepts the case-insensitive coupon code SAVE10 for a 10% discount.
- Does not apply a discount for blank or invalid coupon codes.
- Removes the applied discount when the coupon field is edited.
- Displays a demo order confirmation with purchased items,
  quantities, line totals, subtotal, discount, and final total.
- Clears the bag after successful checkout.
- Saves reduced inventory so purchased units remain deducted after
  refreshing the website.
- Resets and hides the shipping and payment forms after completion.

Do not enter real payment information. Checkout performs client-side
validation and simulates order completion; it does not process payments
or transmit an order to a server.

### Contact

- Includes fields for a full name, email address, subject, and message.
- Requires a valid-format email address and a nonblank message.
- Displays validation feedback and a demo confirmation message.
- Resets the form after a successful demonstration submission.
- Does not send or save messages.

### Network Connection Test

- Displays the hostname from the current page URL.
- Displays the current communication port.
- Displays the current transmission protocol.
- Displays the previous recorded launch time for the Network Test page.
- Updates connection information each time the page loads.
- Saves the current launch timestamp for display on the next visit.
- Supports verification that the website is running through a
  local web server.

This page reports the current page's connection information. It does
not perform an external internet-connectivity or server-health test.

## Technologies Used

- HTML5 for page structure and forms
- CSS3 for layout, responsive styling, and decorative effects
- JavaScript for product rendering, validation, shopping interactions,
  inventory handling, and connection information
- Browser localStorage for cart contents, inventory, and launch history
- Inline SVG for decorative woodland sprigs

## Project Structure

The main website files are organized as follows:

    index.html
    shop.html
    bag.html
    checkout.html
    contact.html
    network.html

    CSS/
        stylesheet.css

    JS/
        product-data.js
        products.js
        cart.js
        bag.js
        network.js

    images/
        Product images

    README.md

### JavaScript Responsibilities

- product-data.js: Shared product catalog, starting stock, and saved
  inventory loading and saving.
- products.js: Shop product rendering, add-to-bag interactions, and
  available-stock displays.
- cart.js: Shared cart loading, saving, and subtotal calculation.
- bag.js: Bag rendering, quantity updates, item removal, and clearing.
- network.js: Connection information and previous-launch tracking.

Checkout and Contact logic is included in their respective HTML files.

## Running the Website Locally

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already available.
4. Right-click index.html and select "Open with Live Server."
5. Use the website navigation to browse the store.
6. Open Network Test to verify the hostname, port, protocol, and
   previous launch time.

Use a local web server rather than opening the HTML files directly
with a file:// address.

Keep the same hostname and port while testing saved data. Browser
storage is separate for different origins.

## Browser Storage and Inventory

The project stores demonstration data in the current browser:

- briarAndBoneCart: Saved bag contents
- briarAndBoneInventory: Inventory remaining after completed demo orders
- briarAndBoneLastNetworkLaunch: Most recent Network Test page launch

Products in the bag reserve units from the available inventory.
Removing items or reducing quantities makes those units available again.
Completing a demo purchase reduces the saved inventory and clears
the bag.

Storage is local to the browser and website origin. Inventory is not
shared between customers, devices, or separate browser profiles.
Clearing the site's browser storage removes its saved cart,
inventory, and launch history.

Shipping and payment-field values are not saved by the checkout code.

## Testing Checklist

### Navigation and Layout

- Open every page through the local server.
- Check navigation, footer links, and featured-product links.
- Confirm product images load.
- Check the homepage and product grid at different window widths.

### Shopping Bag and Inventory

- Add a product and check the immediate feedback.
- Refresh the bag and confirm items remain.
- Update a quantity and verify the subtotal.
- Attempt an invalid or above-stock quantity.
- Remove a product and verify available stock returns.
- Test the Clear Bag confirmation.
- Reserve all available units and verify out-of-stock behavior.

### Checkout

- Test empty and invalid required fields.
- Apply SAVE10 using different capitalization.
- Test an invalid coupon and edit an applied coupon.
- Complete a demo order using dummy information.
- Verify confirmation items and totals.
- Confirm the bag is empty after completion.
- Reload Shop and confirm purchased stock remains deducted.

### Contact

- Test a missing or invalid email address.
- Test a blank or whitespace-only message.
- Submit valid dummy information and verify the demo confirmation.

### Network Connection Test

- Compare the displayed hostname, port, and protocol with the
  browser address.
- Refresh and confirm that the previous launch timestamp updates.

## Limitations

- This is an educational demonstration, not a production storefront.
- Product listings and inventory are fictional.
- No backend, database, user accounts, or payment gateway is included.
- No real orders or contact messages are transmitted.
- Order confirmation is displayed on the checkout page; a persistent
  order-history feature is not included.
- Displayed checkout totals reflect item costs and applicable coupon
  discounts; shipping charges and taxes are not calculated.

## Project Status

Implemented features include the woodland-themed homepage, product
catalog, persistent shopping bag, inventory awareness, demonstration
checkout, order confirmation, contact-form validation, and Network
Connection Test page.

Final delivery includes local testing, repository organization, and
the accompanying project Progress Report.