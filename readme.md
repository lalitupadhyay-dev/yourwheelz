# Backend API Documentation

<!-- -------------------------REGISTER API------------------------- -->
## `/users/register` Endpoint

### Description

It registers a new user with a user account into the database with the provided information by the user.

### HTTP Method

`POST`

### Request Body

The body of the request contains the following data in the JSON format.

- `fullname` (object):
    - `firstname` (string, required): This field takes the first name of the user as string.
    - `lastname` (string, optional): This field takes the last name of the user as a string, and it is optional field so user can also skip it.
- `email` (string, required): This field takes the email of the user as a string.
- `password` (string, required): This field takes the password of the user account as a string.

### How it is working

- Created a `User Model` in `/models/user.model.js` that has the schema of the user. Along with the user schema, there are 3 functions: 2 of them are `methods: { userSchema.methods.generateAuthToken, userSchema.methods.comparePassword}` and 1 is `static: { userSchema.statics.hashPassword }`.

- As the user will hit `Register Button` of the `Register Form` the endpoint `/users/register` will be hit with a `POST Method`.

- The request will follow this hierarchy `/server.js --> /app.js --> /routes/user.routes.js`.

- In `/routes/user.routes.js` the data coming from front-end in `request object` is passed for validation to `express-validator`, then it is passed to a controller, named as `registerUser` defined in `/controllers/user.controller.js`.

- In `/controllers/user.controller.js`, if the `express-validator` found incorrect format of data then it throws error otherwise, it creates the user with the help of `createUser()` defined in `/services/user.services.js`.

### Example Response

- `user` (object):
    - `fullname` (object):
        - `firstname` (string):
        - `lastname` (string):
    - `email` (string):
    - `password` (string):

- `token` (JSON WEB TOKEN):

<!-- -------------------------LOGIN API------------------------- -->
## `/users/login` Endpoint

### Description

It is used to login an existing user with the credentials such as: `{ email, password }`.

### HTTP Method

`POST`

### Request Body

The body of the request contains the following data in the JSON format.

- `email` (string, required): This field takes the email of the user as a string.
- `password` (string, required): This field takes the password of the user account as a string.

### How it is working

- Created a `User Model` in `/models/user.model.js` that has the schema of the user. Along with the user schema, there are 3 functions: 2 of them are `methods: { userSchema.methods.generateAuthToken, userSchema.methods.comparePassword}` and 1 is `static: { userSchema.statics.hashPassword }`.

- As the user will hit `Login Button` of the `Login Form` the endpoint `/users/login` will be hit with a `POST Method`.

- The request will follow this hierarchy `/server.js --> /app.js --> /routes/user.routes.js`.

- In `/routes/user.routes.js` the data coming from front-end in `request object` is passed for validation to `express-validator`, then it is passed to a controller, named as `loginUser` defined in `/controllers/user.controller.js`.

- In `/controllers/user.controller.js`, if the `express-validator` found incorrect format of data then it throws error otherwise, it sends a JSON `{ token, user}` in the response.

### Example Response

- `user` (object):
    - `fullname` (object):
        - `firstname` (string):
        - `lastname` (string):
    - `email` (string):
    - `password` (string):

- `token` (JSON WEB TOKEN):

<!-- -------------------------PROFILE API------------------------- -->
## `/users/profile` Endpoint

### Description

It shows the details of the user.

### HTTP Method

`GET`

### Authentication

Requires a valid `JWT Token` in the Authorization header or cookies.

### Example Response

- `user` (object):
    - `fullname` (object):
        - `firstname` (string):
        - `lastname` (string):
    - `email` (string):

<!-- -------------------------LOGOUT API------------------------- -->
## `/users/logout` Endpoint

### Description

It logs out the user from the application and blacklist the token provided in the cookies or headers.

### HTTP Method

`GET`

### Authentication

Requires a valid `JWT Token` in the Authorization header or cookies.

