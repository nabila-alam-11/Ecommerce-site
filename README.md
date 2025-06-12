# AIRA - An eCommerce Application

A full-stack clothing e-commerce application featuring product filtering, sorting, cart and wishlist management, address handling, browsing and search functionality.

Built with a React frontend, Express/Node.js backend, MongoDB database, Boostrap for styling.

---

## Demo Link

[Live Demo](https://ecommerce-site-mocha-gamma.vercel.app/)

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

---

## Demo Video

Watch a walkthrough (7 minutes) of all the major features of this app:
[Loom Video]()

---

## Features

**Home**

- Display all categories - Kids, Women and Men
- Clicking on a category navigates to the respective product listing page
- Search for products by name

**Product Listing Page**

- Displays all products within the selected category
- Each product shows the brand name, product name, rating, original price, discounted price and discounted percentage.
- Clicking on the wishlist icon adds or removes the product from the wishlist
- Clicking on the **Add to Cart** button adds the product to the cart
- Filter products by brand, rating, and price range
- Sort products by price (low to high or high to low)

**Product Details Page**

- View complete product information: product name, brand, rating, discounted price, original price, discount percentage, description, quantity, and size
- The **Add to Wishlist** button functions as a toggle:
  - If the product is not in the wishlist, it shows **Add to Wishlist**
  - If the product is already in the wishlist, it shows **Remove from Wishlist**
- Clicking the **Add to Bag** button adds the product to the shopping cart
