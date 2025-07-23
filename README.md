# AIRA - An eCommerce Application

A full-stack clothing e-commerce application featuring product filtering, sorting, cart and wishlist management, address handling, browsing and search functionality.<br>
Built with a React frontend, Express/Node.js backend, MongoDB database, Boostrap for styling.

---

## Demo Link

[Live Demo](https://ecommerce-site-mocha-gamma.vercel.app?tab=readme-ov-file)

---

## Quick Start

```
git clone https://github.com/nabila-alam-11/Ecommerce-site.git
cd <Ecommerce-site>
npm install
npm run dev

```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB
- Bootstrap

---

## Demo Video

Watch a walkthrough (7 minutes) of all the major features of this app:
[Video](https://drive.google.com/file/d/12ePVuU2IvZyyOdTezNUw5d6JiN_sFt8v/view?usp=sharing)

---

## Features

**Home**

- Display all categories - Kids, Women and Men
- Clicking on a category navigates to the respective product listing page
- Search for products by name

**Product Listing Page**

- Displays all products within the selected category
- Each product shows the product image, brand name, product name, rating, original price, discounted price and discounted percentage.
- Clicking on the wishlist icon adds or removes the product from the wishlist
- Clicking on the **Add to Cart** button adds the product to the cart
- Filter products by brand, rating, and price range
- Sort products by price (low to high or high to low)

**Product Details Page**

- View complete product information: product image, product name, brand, rating, discounted price, original price, discount percentage, description, available quantity, and size
- The **Add to Wishlist** button functions as a toggle:
  - If the product is not in the wishlist, it shows **Add to Wishlist**
  - If the product is already in the wishlist, it shows **Remove from Wishlist**
- Clicking the **Add to Bag** button adds the product to the shopping cart
- Displays a **More items you may like** section featuring related or recommended products:
  - Each item shows image, rating, name, price, discount, a wishlist icon and an **Add to Cart** button

**Wishlist Page**

- Displays all products that have been added to the wishlist
- Each product shows image, rating, brand, product name, original price, discounted price, and discounted percentage.
- Includes a **Move to Cart** button to add the item directly to the shopping cart.
- An **X icon** is provided on each product to remove the item from the wishlist.

**Cart Page**

- Displays all the products that have been added to the shopping cart.
- Each product shows the image, rating, brand, product name, original price, discounted price, and discounted percentage.
- Quantity can be increased and decreased
- Includes a **Move to Wishlist** button to add the item directly to the wishlist
- An **X icon** is provided on each product card to remove the item from the cart.
- **Price Details** section displays:
  - Price of all items in the cart, discount, and delivery charges(if any) and the total amount.
  - Includes a **PLACE ORDER** button that navigates to the **Checkout Page**

**Checkout Page**

- Allows adding multiple delivery addresses using the **+ Add New Address** button
- A new address form collects:
  - Full Name
  - Phone Number
  - Email
  - Street
  - Landmark
  - City
  - State
  - Pin Code
- Each saved address can be:
  - **Edited** using the **Edit** button
  - **Deleted** using the **Remove** button
- Displays a **Price Details** section showing the item total, discount, delivery charges, and final amount
- Includes a **Confirm Order** button to place the order with the selected delivery address

**Profile Page**

- Contains three main sections:
  - **Address**: View, add, edit, or remove saved delivery addresses
  - **Order History**: View all previously placed orders with their details
  - **Wishlist**: View and manage all wishlisted products
- Each section is navigable via clickable tabs

---

## API Reference

### **GET /api/products**<br>

List all products<br>
Sample Response:<br>

```
[{_id, name, price, category, brand, size, rating, description, discount, isReturnable, isNewArrival, securePayment, img}, ....]
```

### **GET /api/categories**<br>

List all categories<br>
Sample Response:<br>

```
[{_id, name,img}, ....]
```

### **GET /api/categories/:id**<br>

Details of a single category by its ID<br>
Sample Response:<br>

```
{_id, name,img}
```

### **GET /api/products/:productId**<br>

Details of a single product by its ID<br>
Sample Response:<br>

```
{_id, name, price,img, size, rating, description, category, discount, isReturnable, returnPeriod, isNewArrival, brand,securePayment, img}
```

### **GET /api/products/category/:categoryName**<br>

Fetches all products that belong to a specifice category<br>

**Parameters**

- **categoryName** : The name of the category(e.g., Kids, Men, Women)<br>
  Sample Response:<br>

```
[{_id, name, price,img, size, rating, description, category, discount, isReturnable, returnPeriod, isNewArrival, brand,securePayment, img}....]
```

### **GET /api/address**<br>

Retrieves all saved addresses<br>
Sample Response:<br>

```
[{_id, fullName, email, phoneNumber, street, landmark, city, state, pinCode, isDefault, createdAt, updatedAt}....]
```

### **GET /api/orders**<br>

Fetches all orders<br>
Sample Response:<br>

```
[{_id, address, items, totalPrice, status, createdAt, updatedAt},....]
```

### **POST /api/categories**<br>

Creates a new product category.<br>
Sample Response:<br>

```
{name, img}
```

### **POST /api/products**<br>

Creates a new product<br>
Sample Request:<br>

```
{name, price, category, brand, size, rating, description, discount, isReturnable, isNewArrival, securePayment, img}
```

### **POST /api/address**<br>

Creates a new address<br>
Sample Request:<br>

```
{fullName, email, phoneNumber, street, landmark, city, state, pinCode, isDefault}
```

### **POST /api/orders**<br>

Creates a new order<br>
Sample Request:<br>

```
{_id, address, items, totalPrice, status}
```

### **POST /api/categories/:id**<br>

Updates a category with the specified id<br>
Sample Request: <br>

```
{name, img}
```

### **PUT /address/:addressId**<br>

Updates a address with the specified id<br>
Sample Request: <br>

```
{fullname, phoneNumber, email, street, landmark, city, state, pinCode, isDefault}
```

### **DELETE /api/categories/:id**<br>

Deletes a category with the specified id

### **DELETE /api/products/:id**<br>

Deletes a product with the specified id

### **DELETE /api/address/:addressId**<br>

Deletes an address with the specified id

### **DELETE /api/orders/:orderId**<br>

Deletes an order with the specified id

### **DELETE /api/orders**<br>

Deletes all orders

---

## Contact

For bugs or feature request, please reach out to nabilazaheer1198@gmail.com
