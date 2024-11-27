# Admin Dashboard with User and Role Management

This project is a simple **Admin Dashboard** built using **React** and **React Bootstrap**. It includes **User Management** and **Role Management** functionality. The app allows an admin to add, update, delete users and manage user roles. 

## Features
- **User Management:** Allows adding, editing, and deleting users with different roles (Admin, Editor, Viewer).
- **Role Management:** Manage different roles for users.
- **Sidebar Navigation:** A sidebar to navigate between user and role management sections.
- **Modal Forms:** Used for adding and updating users.
- **React Bootstrap:** Provides styling and responsive layout.

## Installation Instructions

### Prerequisites
- Make sure you have **Node.js** and **npm** installed on your machine. If not, you can download them from [Node.js website](https://nodejs.org/).

### Steps
1. Clone this repository to your local machine:
   ```bash
   git clone <repository_url>
   cd <repository_name>
Install the project dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000 to view the app.

Folder Structure
The project structure is as follows:

bash
Copy code
/src
  /components
    Sidebar.jsx          # Sidebar navigation component
  /pages
    UserManagement.jsx   # User Management page component
    RoleManagement.jsx   # Role Management page component
  /services
    api.js               # API functions for interacting with backend
  App.jsx                # Main app component
  index.js               # Entry point for React
API Integration
This project uses an API for user management functionality. The following functions are defined in src/services/api.js:

getUsers: Fetches the list of users.
addUser: Adds a new user.
updateUser: Updates an existing user.
deleteUser: Deletes a user.
Styling
The project uses React Bootstrap for styling. All UI components (like buttons, forms, and modals) are styled using React Bootstrap components. Custom styling has been applied for the layout, sidebar, and form components.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

