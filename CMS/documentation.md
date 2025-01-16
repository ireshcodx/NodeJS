# CMS Project Documentation

## Overview
The CMS (Courier Management System) project is designed to manage and serve content through a RESTful API. It utilizes Express.js for the server framework and Sequelize for database interactions.

## Folder Structure
```
CMS/
├── .env                     # Environment variables for configuration
├── .env.keys                # Keys for environment variables
├── app.js                   # Main application file
├── combined.log             # Combined log file for application logs
├── error.log                # Log file for error messages
├── index.html               # Frontend HTML file
├── index.js                 # Entry point for the frontend
├── info.log                 # Log file for informational messages
├── package-lock.json        # Lock file for npm dependencies
├── package.json             # Project metadata and dependencies
├── README.md                # Project overview and instructions
├── seed.js                  # Script for seeding the database
├── config/                  # Configuration files
│   └── database.js          # Database connection configuration
├── controllers/             # Controllers for handling requests
│   ├── courierController.js  # Controller for courier-related operations
│   ├── customerController.js # Controller for customer-related operations
│   ├── logInController.js    # Controller for user login operations
│   └── packageController.js   # Controller for package-related operations
├── logs/                    # Log files for application
│   └── logger.js            # Logger configuration
├── middleware/              # Middleware functions for request handling
│   ├── authrise.js          # Middleware for authorization
│   ├── verifyToken.js       # Middleware for token verification
│   └── validations/         # Validation middleware
├── models/                  # Database models
│   ├── courier.js           # Model for courier data
│   ├── customer.js          # Model for customer data
│   ├── index.js             # Index file for models
│   ├── package.js           # Model for package data
│   └── Users.js             # Model for user data
├── routes/                  # API route definitions
│   ├── courierRoutes.js     # Routes for courier-related endpoints
│   ├── customerRoutes.js    # Routes for customer-related endpoints
│   ├── indexRoute.js        # Main route file
│   ├── LogInRoutes.js       # Routes for login-related endpoints
│   └── packageRoutes.js     # Routes for package-related endpoints
└── services/                # Service layer for business logic
    ├── courierService.js    # Service for courier operations
    ├── customerService.js    # Service for customer operations
    ├── logInService.js       # Service for login operations
    ├── packageService.js      # Service for package operations
    └── pdfGenerator.js       # Service for generating PDFs
```

## Key Components
- **Controllers**: Handle incoming requests and return responses. Each controller corresponds to a specific resource (e.g., courier, customer).
- **Models**: Define the structure of the data and interact with the database.
- **Routes**: Define the API endpoints and map them to the appropriate controller functions.
- **Middleware**: Functions that process requests before they reach the route handlers, such as authentication and validation.
- **Services**: Contain business logic and interact with controllers and models.

## API Endpoints
### Courier API Endpoints
- **GET /api/courier/getAll**: Retrieves all couriers (requires token verification).
- **GET /api/courier/getCourierById/:id**: Retrieves a specific courier by ID (requires token verification).
- **POST /api/courier/createCourier**: Creates a new courier (requires token verification and user role check).
- **PUT /api/courier/updateCourier/:id**: Updates an existing courier by ID (requires token verification and user role check).
- **DELETE /api/courier/deleteCourier/:id**: Deletes a courier by ID (requires token verification and user role check).
- **GET /api/courier/getCourierByIdWithCustomer/:id**: Retrieves a courier by ID along with customer details (requires token verification).
- **GET /api/courier/getAllCouriersWithCustomers**: Retrieves all couriers along with their customer details.

### Customer API Endpoints
- **GET /api/customer/getAll**: Retrieves all customers (requires token verification).
- **GET /api/customer/getCustomerById/:id**: Retrieves a specific customer by ID (requires token verification).
- **POST /api/customer/createCustomer**: Creates a new customer (no token verification required).
- **PUT /api/customer/updateCustomer/:id**: Updates an existing customer by ID (requires token verification and user role check).
- **DELETE /api/customer/deleteCustomer/:id**: Deletes a customer by ID (requires token verification and user role check).

### Login API Endpoint
- **POST /api/logIn**: Authenticates a user and initiates a session.

### Package API Endpoints
- **GET /api/package/getAll**: Retrieves all packages (requires token verification).
- **GET /api/package/getPackageById/:id**: Retrieves a specific package by ID (requires token verification).
- **POST /api/package/createPackage**: Creates a new package (requires token verification and user role check).
- **PUT /api/package/updatePackage/:id**: Updates an existing package by ID (requires token verification and user role check).
- **DELETE /api/package/deletePackage/:id**: Deletes a package by ID (requires token verification and user role check).

## Database Connection
The database connection is established using Sequelize in the `config/database.js` file. It retrieves connection details from environment variables and connects to a MySQL database.

## Logger Configuration
Logging is handled using the Winston library in the `logs/logger.js` file. It logs messages to different files based on their severity (info, error, combined).

## JWT Authentication
The project uses JSON Web Tokens (JWT) for authentication and authorization. Tokens are issued upon successful login and are required for accessing protected routes. The `verifyToken` middleware checks the validity of the token for each request.

## Used Libraries
- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for MySQL database interactions.
- **Winston**: Logging library for Node.js.
- **dotenvx**: Library for managing environment variables.
- **jsonwebtoken**: Library for creating and verifying JWT tokens.

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with the necessary environment variables.
4. Run the application using `node app.js`.

## Conclusion
This documentation provides an overview of the CMS project, its folder structure, key components, API endpoints, database connection, logger configuration, JWT authentication, and used libraries. For further details, refer to the individual files and their comments.
