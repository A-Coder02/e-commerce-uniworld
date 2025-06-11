# Online Store

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

This is the frontend web application for an **Online Store** that sells mobile phones.  
It is built using **React**, **Redux Toolkit**, **Tailwind CSS**, and **Vite**.

---
## Demo
[Myda Store](https://www.loom.com/share/a8ba652063a24fffb5ab18b50f33cab4?sid=d5b19ca5-b1d0-4277-bbb4-1f06c902e225)
---

## Project Overview

This project is part of a FullStack Developer Technical Task to design a web application for an online store that sells mobile phones and manages products. The app includes:

- User Sign Up (Email, Password, Role: Admin or Customer)
- User Login and Logout
- Role-based Home Pages:
  - Customers can view all products.
  - Admins can manage products they have created (Create, Read, Update, Delete).
  - Both Customer & Admin can create order
- Public product viewing without authentication.
- Admin-only product management functionality.
- Backend API integration with JWT-based authentication.
- Local database assumed PostgreSQL with RESTful API endpoints.

---

## Features

- User Authentication (Sign Up, Login, Logout) with role-based access
- Role-based UI for Customers and Admins
- Product listing with card layout and detailed view
- Admins can Create, Update, Delete their products
- Form validation with Formik and Yup
- Infinite scrolling on product list for performance
- Toast notifications for feedback
- JWT token management with role decoding
- Mobile-friendly web design (desktop-focused, no dedicated mobile app)
- Unit testing for components and API calls

---

## Tech Stack & Tools

### Frontend

- React 19
- Redux Toolkit + React-Redux
- React Router DOM for routing
- Tailwind CSS for styling
- Formik + Yup for forms and validation
- Axios for API communication
- JWT Decode for handling tokens
- Jest & React Testing Library for testing
- Vite for fast dev server and bundling

### Backend

- Node.js with Express framework
- PostgreSQL relational database for data storage
- JWT-based authentication and role-based authorization
- RESTful API design following best practices
- Swagger for API documentation and testing
- Nodemon for automatic server restarts during development
- Jest and Supertest for unit and integration testing
- Environment variable management with dotenv
- CORS middleware for cross-origin resource sharing
- Password hashing with bcryptjs

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Running backend API (see backend README for setup)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/A-Coder02/e-commerce-uniworld.git
   cd e-commerce-uniworld
   ```

---

_Frontend_

2. Install dependencies

```bash
cd frontend
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

**To make build**

```bash
npm run build
```

5. Open your browser at
   ```
   http://localhost:5173
   ```

---

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Starts the dev server (Vite)         |
| `npm run build`   | Builds the app for production        |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint on source files           |
| `npm run test`    | Run unit tests with Jest             |

---

## Testing

```bash
npm run test
```

## Project Structure

- src/
  - assets /
  - components /
  - hooks /
  - pages /
  - services /
  - stores /
  - tests /
  - utils /

---

_Backend_

2. Install dependencies

```bash
cd backend
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run start
# r
yarn start
```

**To generate Swagger docs**

```bash
   npm run swagger
   #or
   yarn swagger
```

5. Open your browser at

   **backend**

   ```
   http://localhost:8000/
   ```

   **To See Swagger docs**

```
   http://localhost:8000/docs
```

## Available Scripts (Backend)

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm start`       | Starts the backend server with nodemon   |
| `npm run swagger` | Generates Swagger API documentation      |
| `npm test`        | Runs tests with Jest in test environment |

## Testing

```bash
npm run test
```

## Project Structure

- backend/
  - controller /
  - middleware /
  - routes /
  - supabase /
  - tests /
  - utils /

## Notes

- The frontend communicates with a backend API for authentication and product management.
- Authentication state is managed using JWT tokens stored in `sessionStorage`.
- Only users with the role **"admin"** can create, update, or delete products.
- Customers can browse products without authentication.
- Toast notifications inform users of success and error messages.
- The UI adapts based on user roles (admin vs customer).
- Form validation and error handling are done with Formik and Yup.
- Infinite scroll improves product list performance and user experience.
- React Router DOM manages routing and navigation.
- Tailwind CSS is used for rapid styling and responsiveness.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## Contact

Created by **Arbaj Ansari** – feel free to reach out!

- Email: arbaj897ansari@gmail.com
- GitHub: [A-Coder02](https://github.com/A-Coder02)
- LinkedIn: [arbaj-dev](arbaj Ansari | LinkedIn)

---

