# Finance Data Processing and Access Control Backend

## Project Overview

This project is a backend system developed for a finance dashboard application. It demonstrates backend development concepts such as API design, data modeling, business logic implementation, and role-based access control.

The system allows multiple users to interact with financial records based on their assigned roles while ensuring secure and structured data handling.

---

## Objective Coverage

This implementation covers all the required aspects of the assignment:

- Backend architecture with a clean and modular structure
- RESTful API design
- Role-based access control
- Financial data management
- Aggregated dashboard analytics
- Input validation and error handling
- Data persistence using MongoDB

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Joi for validation
- Helmet and CORS for security
- Morgan for logging

---

## Project Structure

project/
controllers/
models/
routes/
middleware/
utils/
app.js
index.js
constants.js
.env

---

## 1. User and Role Management

### Features Implemented

- User registration and login
- Role assignment (Viewer, Analyst, Admin)
- User status management (active or inactive)
- Role-based access restriction

### Roles

Viewer: Can access only dashboard data
Analyst: Can view financial records and analytics
Admin: Has full access to manage users and financial records

### Access Control

Access control is implemented using middleware:

- Authentication middleware verifies JWT tokens
- Role middleware restricts access based on user roles

---

## 2. Financial Records Management

### Fields Included

- Amount
- Type (income or expense)
- Category
- Date
- Notes
- CreatedBy (reference to user)

### Functionalities

- Create financial records
- Retrieve records
- Update records
- Delete records
- Filter records based on type and category

### Security

- Only Admin users can create, update, or delete records
- Record owners are also allowed to update or delete their own records

---

## 3. Dashboard Summary APIs

### Implemented Features

- Total income calculation
- Total expense calculation
- Net balance calculation

### Implementation Approach

MongoDB aggregation pipelines are used for efficient data processing and summarization.

---

## 4. Access Control Logic

The system enforces role-based access at the backend level:

Viewer: Can only access dashboard data
Analyst: Can view records and analytics
Admin: Can perform all operations

---

## 5. Validation and Error Handling

### Validation

- Joi is used for validating request data
- Validation is applied to authentication and financial record APIs

### Error Handling

- Centralized error handling middleware
- Consistent API response structure
- Proper HTTP status codes

### Edge Cases Handled

- Invalid MongoDB IDs
- Unauthorized access
- Duplicate user registration
- Invalid login credentials
- Missing or incorrect input

---

## 6. Data Persistence

### Database

- MongoDB is used as the primary database
- Mongoose is used for schema modeling

### Design Decisions

- Flexible schema for financial records
- Unique email constraint for users
- Reference-based relationship between users and records

---

## Additional Enhancements

- JWT-based authentication
- Password hashing using bcrypt
- Modular and maintainable code structure
- Logging for request tracking
- Basic security practices implemented

---

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login

### Users

GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

### Finance

POST /api/finance
GET /api/finance
PUT /api/finance/:id
DELETE /api/finance/:id

### Dashboard

GET /api/dashboard

---

## Setup Instructions

1. Clone the repository
   git clone <your-repo-link>
   cd project

2. Install dependencies
   npm install

3. Configure environment variables

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. Run the application
   npm run dev

---

## API Testing

All APIs were tested using Postman.

Protected routes require a valid JWT token in the Authorization header:

Authorization: Bearer <token>

---

## Assumptions

- Only authenticated users can access the system
- Admin users have complete control over the system
- Analytics are basic and can be extended further

---

## Design Decisions

- Middleware-based access control for scalability
- Modular structure for better maintainability
- Aggregation queries used for performance optimization
- Validation handled at API level

---

## Future Improvements

- Pagination and search functionality
- Monthly and weekly analytics
- Refresh token mechanism
- API documentation using Swagger
- Unit and integration testing
- Rate limiting

---

## Submission

GitHub Repository: <your-repo-link>
API Base URL: <your-api-url>

---

## Conclusion

This project demonstrates a structured and practical approach to backend development, focusing on clean architecture, secure implementation, and maintainable code.

---

## Acknowledgment

Thank you for reviewing my submission.
I look forward to your feedback.

Dhananjay Nimbalkar
