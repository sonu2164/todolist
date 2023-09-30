### Installation

1. Clone the repository to your local machine :

```
git clone https://github.com/sonu2164/todolist

```
2. Change to the project directory:
```
cd todolist
```

3. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```


 Application should now be running locally. Open a web browser and navigate to http://localhost:3000 to access it.


## User Authentication Flow

This README provides an overview of the authentication flow in my React-based To-Do List application. It explains how user registration, login, and logout processes work within the app.

Registration
User Registration Form:

Users begin by filling in a registration form, which includes fields for creating a username and password.

Password Strength Check:

The application checks the password strength to ensure it meets the requirement of having a minimum length of 6 characters.

Registration Submission:

When the user submits the registration form:

1. If the form is currently loading or the password strength is weak, no action is taken.
2. The app checks if the chosen username is already in use by querying the existing users in local storage.
3. If the username is taken, an error message is displayed, and the registration process is halted.
4. If the username is available and the password strength is strong, a new user object is created. This object contains the provided username, password, and name.
5. The user object is stored in local storage under the 'users' key.
Additionally, the user object is stored in local storage under the 'user' key, marking the user as authenticated.
6. The setUser action from the authSlice is dispatched to update the user's authentication status.
7. A success toast notification is shown to indicate a successful registration.
Finally, the user is redirected to the login page (/login).
Login

User Login Form:

To log in, users enter their username and password into the login form.

Login Submission:

When the user submits the login form:

1. The app checks if the provided username exists in local storage.
2. If the username exists, it verifies if the provided password matches the stored password.
3. Successful authentication results in the user being considered authenticated.
4. The user object is stored in local storage under the 'user' key.
5. The setUser action from the authSlice is dispatched to update the user's authentication status.
6. A success toast notification is displayed.
7. The user is redirected to the to-do list page (/todo).
8. In case of authentication errors, such as an invalid username or password or if the user doesn't exist, an error message is shown.
Logout

Logging Out:

When the user clicks the "Sign out" button:

1. User data stored in local storage is removed, effectively logging the user out.
2. The user is redirected to the home page (/) for unauthenticated users.


This authentication flow is designed for simulation purposes. For production use, it is recommended to implement more secure and scalable authentication mechanisms, such as JSON Web Tokens (JWT), server-side validation, and database storage.

