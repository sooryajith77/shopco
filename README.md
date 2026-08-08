# ShopCo – E-commerce Platform

## Overview

ShopCo is a full-stack e-commerce platform designed to provide users with an online shopping experience and administrators with tools to manage the application.

The project includes a customer-facing application and an admin panel for managing e-commerce operations.

## Technology Stack

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Authentication

- JWT (JSON Web Token)

## Features

### Customer Features

- User registration and login
- JWT-based authentication
- Browse products
- View product details
- Add products to the shopping cart
- Manage cart items
- Place orders
- View order information

### Admin Features

- Admin authentication
- Admin dashboard
- Add new products
- Update product information
- Delete products
- Manage products
- Manage orders

## Project Structure

```text
ShopCo/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── server.js
│
└── README.md
```

## Installation

### Prerequisites

Before running ShopCo locally, make sure the following are installed:

- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd ShopCo
```

### 3. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

> Replace the example values with your actual configuration. Do not upload your `.env` file or secret credentials to GitHub.

### 5. Start the Backend

Run the backend development server:

```bash
npm run dev
```

### 6. Install Frontend Dependencies

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

### 7. Start the Frontend

Run the frontend development server:

```bash
npm run dev
```

The terminal will display the local URL where the ShopCo application is running.

## Authentication

ShopCo uses **JSON Web Token (JWT)** authentication to secure user accounts and protected resources.

### Authentication Flow

1. The user registers or logs in.
2. The server validates the user's credentials.
3. After successful authentication, the server generates a JWT.
4. The token is returned to the client.
5. The client sends the token when accessing protected resources.
6. The server verifies the token before processing the request.

### JWT Authentication Flow

```text
User
  │
  │ Login credentials
  ▼
Backend
  │
  │ Validate credentials
  ▼
JWT Token
  │
  │ Return token
  ▼
Frontend
  │
  │ Send token with protected requests
  ▼
Backend
  │
  │ Verify token
  ▼
Protected Resource
```

### Protected Resources

JWT authentication is used to restrict access to resources that require an authenticated user.

Unauthorized requests are rejected by the backend.

## API Documentation

ShopCo uses REST APIs to allow the frontend application to communicate with the backend server.

### HTTP Methods

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Update existing data |
| DELETE | Delete data |

### API Request Structure

A typical API request contains:

- HTTP method
- API endpoint
- Request headers
- Request body, when required
- Authentication token for protected endpoints

### Example API Request

```http
GET /api/products
```

This request retrieves product information from the backend.

### Protected API Requests

Protected endpoints require a valid JWT token.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

### API Testing

API endpoints can be tested using **Postman**.

Testing should include:

- Successful requests
- Invalid requests
- Authentication
- Unauthorized requests
- CRUD operations
- Error responses

## Admin Panel

The ShopCo admin panel provides administrators with tools to manage the e-commerce platform.

### Admin Features

Administrators can:

- Log in through the admin interface
- Access the admin dashboard
- Add new products
- Update existing products
- Delete products
- View and manage products
- View and manage orders

### Product Management

The product management section allows administrators to maintain the product catalog.

Administrators can:

1. Add a product.
2. Enter the required product information.
3. Save the product.
4. Update product information when required.
5. Delete products that are no longer available.

### Order Management

The order management section allows administrators to view and manage customer orders.

Administrators can review order information and perform the available order-management operations.

### Admin Authentication

Access to the admin panel is restricted to authorized administrators.

Authentication is handled using JWT-based authentication.

## Environment Variables

ShopCo uses environment variables to store configuration values and sensitive information.

Create a `.env` file in the backend directory and add the required environment variables.

### Example Configuration

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Variable Description

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connection string used to connect to the PostgreSQL database |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |
| `PORT` | Port on which the backend server runs |

> Do not commit the `.env` file to GitHub. Keep database credentials and secret keys private.

## Error Handling

ShopCo uses HTTP status codes to indicate the result of API requests.

| Status Code | Description |
|---|---|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Bad request |
| 401 | Unauthorized request |
| 404 | Resource not found |
| 500 | Internal server error |

## Troubleshooting

### Backend Does Not Start

If the backend server does not start:

1. Make sure Node.js is installed.
2. Run `npm install` in the backend directory.
3. Check that the `.env` file is configured correctly.
4. Verify that the required port is available.

### Database Connection Error

If the application cannot connect to PostgreSQL:

1. Make sure PostgreSQL is running.
2. Check the `DATABASE_URL` value.
3. Verify the database credentials.
4. Restart the backend server.

### Authentication Error

If authentication fails:

1. Verify that the login credentials are correct.
2. Check that `JWT_SECRET` is configured.
3. Make sure the JWT token is being sent with protected requests.
4. Check whether the token is valid or expired.

## Development

To run ShopCo locally, start both the backend and frontend development servers.

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend and backend will run as separate development services.

## API Testing

Postman can be used to test the ShopCo REST APIs.

Recommended testing areas include:

- User registration
- User login
- JWT authentication
- Product operations
- Admin operations
- Order operations
- Invalid requests
- Unauthorized requests
- Server error responses

## Security

The application uses JWT-based authentication to protect restricted resources.

Sensitive configuration values such as database credentials and JWT secrets should be stored in environment variables.

The `.env` file should not be committed to the repository.

## Future Improvements

Possible future improvements include:

- Payment gateway integration
- Product search
- Product filtering
- Product reviews and ratings
- Order tracking
- Improved admin analytics

## Author

**Sooryajith**

## License

This project is intended for learning and portfolio purposes.
