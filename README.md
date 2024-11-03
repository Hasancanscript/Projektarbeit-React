# Projektarbeit-React

This project, titled "Projektarbeit-React", was developed for academic purposes. It showcases a comprehensive web application built with React, Docker, and a backend API, featuring category management, product listing, supplier management, and a shopping cart, along with interactive components like a cheese products gallery and a contact form.

## W3Schools Database in Docker

Forked from https://github.com/AndrejPHP/w3schools-database for academic purposes.

This repository provides:

- a docker compose which sets up the DB on port 3309 (non-default, no clashes)
- initializes the database data from w3schools (provided by @AndrejPHP) 
- Visual Studio Code config

## Fork to your github account
Go to github.com, create a new account or login.
Fork my repo (https://github.com/yveseinfeldt/w3schools-database)

Now you have a repository w3schools-database in your github account.
Clone that with
```
git clone https://github.com/YOURUSERNAME/w3schools-database
cd w3schools-database
code .
```

Run the database and rest-api
```
sudo docker-compose up
```

Start the react app like this
```
cd my-app
npm start
```

## How to reset?

Execute:

```bash
docker compose down
rm -rf data
docker compose up -d
```

## Tables

When the docker container starts, it creates database named __w3schools__ with the following tables

    categories
    customers
    employees
    orders
    order_details
    products
    shippers
    suppliers
    
and inserts the respective data. 

## Features

# Käserei Hasan - Web-Application

## Overview
The Käserei Hasan web application offers a variety of interactive features, including the management of categories, products, suppliers, and a shopping cart. Additionally, it includes special pages like a cheese products gallery, a contact form with a time limit, a team page, and a location display with Google Maps.

## Features

### 1. Navigation
This project, titled "Projektarbeit-React", was developed for academic purposes and showcases a comprehensive web application built with React, Docker, and a backend API. The application includes a variety of features:

- Home: Welcome page and overview.
- Categories: Manage and view product categories.
- Products: List of products with search and edit functionality.
- Suppliers: Manage suppliers.
- Cheese Products: Special gallery for cheese products.
- Team: Information about the team.
- Contact Form: Contact form with a time limit.
- Contact: Location display using Google Maps.
- About Me: Personal information about the founder.
- Login: Modal login form.
- Cart: Overview of added products and total price calculation.

## Steps to Download and Run

To experience the full functionality of the Käserei Hasan web application, follow these steps to clone the repository and set up the environment on your local machine.

1. Clone the Repository  
   Open a terminal and run the following commands:
   ```bash
   git clone https://github.com/Hasancanscript/Projektarbeit-React.git
   cd Projektarbeit-React

### 2. Category Management
- Create: Add new categories.
- Edit: Update existing categories.
- Delete: Remove categories.

### 3. Product Management
- Search: Filter products by name.
- Create: Add new products.
- Edit: Update products.
- Delete: Remove products.

### 4. Supplier Management
- Create: Add new suppliers.
- Edit: Update supplier information.
- Delete: Remove suppliers.

### 5. Cart
- Add Products: Users can add products to the cart.
- Total Price: Calculate the total price based on cart items.

### 6. Contact Form
- Timed Form: Users have 10 minutes to complete the form
- Validation: Users are notified when time runs out.
- Salutation and Contact Information: Users can input personal data and inquiries.

### 7. Cheese Products Gallery
- Display of various cheeses with prices and an "Add to Cart" functionality.

## Journal

### Project Start
- Date: 14.09.2024
- Activities:
  - Planned project structure.
  - Created repository on GitHub.
  - Set up the basic structure of the React app.

### Development of Core Features
- Date: 15.09.2024 - 30.09.2024
- Activities:
  - Implemented category management (add, edit, delete).
  - Developed product list with search and filter functionalities.
  - Created supplier management.
  - Built the cheese products gallery.

### Enhancements and Styling
- Date: 01.10.2024 - 07.10.2024
- Activities:
  - Applied styling using Tailwind CSS.
  - Implemented the shopping cart with quantity adjustment and price calculation.
  - Added animations and hover effects.

### Contact Form and Additional Pages
- Date: 08.10.2024 - 15.10.2024
- Activities:
  - Developed the contact form with a time limit.
  - Created the Team and About Me pages.
  - Integrated Google Maps on the contact page.

### Final Tasks
- Date: 16.10.2024 - 03.11.2024
- Activities:
  - Conducted final tests and bug fixes.
  - Refined the user interface.
  - Created and finalized documentation.
  - Prepared the app for presentation and GitHub release.

## Prerequisites

Before you begin, make sure the following software is installed on your system:

1. Visual Studio Code: Download and install [Visual Studio Code](https://code.visualstudio.com/).
2. Node.js: Download and install [Node.js](https://nodejs.org/).
3. Docker: Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop).
4. GitHub Account: Register at [GitHub](https://github.com/) if you don’t already have an account.