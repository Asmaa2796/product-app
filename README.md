# Product Store Task

## Live Demo

https://task-product-app.vercel.app/

## GitHub Repository

https://github.com/Asmaa2796/product-app

---

# Project Overview

This project is a simple product store application built using React.
It allows users to register, login, browse products, search products, and filter by category.

The project consumes product data from the DummyJSON API.

---

# Features

* User Registration (LocalStorage)
* User Login Authentication
* Protected Product Details Page
* Product Listing
* Product Details Page
* Search by Product Title
* Filter by Category
* Loading Indicators
* Responsive Design
* Logout functionality

---

# Tech Stack

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Bootstrap
* React Toastify
* DummyJSON API

---

# Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/Asmaa2796/product-app.git
```

2. Navigate to the project folder

```bash
cd product-app
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm start
```

The application will run on:

```
http://localhost:3000
```

---

# Deployment

The project is deployed using Vercel.

Live Demo:
https://task-product-app.vercel.app/

---

# Folder Structure

```
src
 ┣ features
 ┃ ┣ auth
 ┃ ┃ ┣ Login
 ┃ ┃ ┃ ┗ Login.jsx
 ┃ ┃ ┗ Register
 ┃ ┃ ┃ ┗ Register.jsx
 ┃ ┗ components
 ┃ ┃ ┣ Banner
 ┃ ┃ ┃ ┗ Banner.jsx
 ┃ ┃ ┣ Footer
 ┃ ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┃ ┗ footer.module.css
 ┃ ┃ ┣ Home
 ┃ ┃ ┃ ┗ Home.jsx
 ┃ ┃ ┣ Navbar
 ┃ ┃ ┃ ┗ Navbar.jsx
 ┃ ┃ ┣ Products
 ┃ ┃ ┃ ┣ Loading.jsx
 ┃ ┃ ┃ ┣ ProductCard.jsx
 ┃ ┃ ┃ ┣ ProductDetails.jsx
 ┃ ┃ ┃ ┣ Products.jsx
 ┃ ┃ ┃ ┗ Products.module.css
 ┃ ┃ ┗ ProtectedRoute
 ┃ ┃ ┃ ┗ ProtectedRoute.jsx
 ┣ shared
 ┃ ┗ redux
 ┃ ┃ ┣ Slices
 ┃ ┃ ┃ ┗ ProductsSlice.js
 ┃ ┃ ┗ store.js
 ┣ App.css
 ┣ App.jsx
 ┣ index.js
 ┣ logo.svg
 ┣ Outfit-VariableFont_wght.ttf
 ┣ reportWebVitals.js
 ┗ setupTests.js
```

---

# Future Improvements

* Unit Testing
* Infinite Scroll
* Server Side Rendering
* Advanced Product Filters

---

# Author

Asmaa
