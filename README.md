# Assignment 1 - API testing and Source Control.

Name: Linan Chen
## Overview.

The application is designed for users to order their meal online. Customers can search the dishes and they also can add, delete or update their order after register and login.

## API endpoints.
 
 
 

 + GET /dishes - Get all dishes
 + GET /dishes/:id - Get one dish by id
 + POST /dishes - Add one dish
 + DELETE /dishes/:id - Delete one dish by id
 + PUT /dishes/:id - Update one dish information by id
 + GET /dish-search/name/keyword - Search dishes by dish name
 
 + GET /users - Get all users
 + GET /users/:id - Get one user by id
 + POST /users - Add one user
 + DELETE /users/:id - Delete one user by id
 + PUT /users/:id - Update one user information by id

 + GET /orders - Get all orders
 + GET /orders/:id - Get one order by id
 + POST /orders - Add one order
 + DELETE /orders/:id - Delete one order by id
 + PUT /orders/:id - Update one order information by id

 + POST /register - Create a new user
 + POST /login - Login if the user infomation exists in database and give a token

## Data storage.
dish schema
{
        name: { type: String, required: true },
        category: { type: String },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        createdAt: { type: Date, default: new Date() }
    }

user schema
 {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            index: true,
            unique: true,
            required: true
        },
    }   

order schema
{
        customer: {
            type: String, ref: 'User'
        },
        dishes: [{
            dish:{ type: String, ref: 'Dish' },
            quantity: { type: Number }
        }],
        created: {
            type: Date,
            default: Date.now
        }
    }

## Sample Test execution.


$ npm test

> mealordering-1.0@0.0.0 test /Users/apple/Desktop/Meal-Ordering-Test
> NODE_ENV=test mocha test/controller/dish-test.js



  Dish
    GET /dishes
DB is connected
      ✓ should return all dishes in an array
    GET /dishes/:id
      ✓ should return the dish by id
    POST /dishes
      when the posted dish is invalid
        ✓ should return error
      when the posted dish is valid
        ✓ should add one dish successfully
    DELETE /dishes/:id
      ✓ should return true and the dish deleted
    PUT /dishes/:id
      when id is invalid
        ✓ should return error
      when id is valid
(node:1142) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
        ✓ should update the dish successfully
    search
      ✓ should return the dishes when the have key words in dish name


  8 passing (427ms)
        

$ npm test

> mealordering-1.0@0.0.0 test /Users/apple/Desktop/Meal-Ordering-Test
> NODE_ENV=test mocha test/controller/user-test.js



  User
    GET /users
DB is connected
      ✓ should return all users in an array
    GET /users/:id
      ✓ should return the user by id
    POST /users
      when posted user is invalid
        ✓ should return error
      when posted user is valid
        ✓ should add one user successfully
    DELETE /users/:id
(node:1465) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
      ✓ should return true and the user deleted
    PUT /users/:id
      when id is invalid
        ✓ should return error
      when id is valid
(node:1465) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
        ✓ should update the user information successfully


  7 passing (422ms)

  
$ npm test

> mealordering-1.0@0.0.0 test /Users/apple/Desktop/Meal-Ordering
> NODE_ENV=test mocha test/controller/auth-test.js



  Authentication
    POST /register
DB is connected
      ✓ should return error (57ms)
      ✓ should register successfully and create a new user
    POST /login
      when user is valid
        ✓ should login successfully and give a token
      when user is invalid
        ✓ should login failed and return a message
        ✓ should return error


  5 passing (99ms)

  $ npm test

> mealordering-1.0@0.0.0 test /Users/apple/Desktop/Meal-Ordering
> NODE_ENV=test mocha test/controller/order-test.js



  Order
DB is connected
    when it has no permission
      ✓ should return a message
    when it has permission
      GET /orders
        ✓ should return all orders in an array
      POST/orders
        ✓ should add one order successfully
      DELETE/orders/:id
        ✓ should return true and the order deleted
      GET /orders/:id
        ✓ should return the order by id
      PUT /orders/:id
(node:2429) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
        ✓ should update the order information successfully


  6 passing (323ms)



## Extra features.
Fuzzy search : GET /dish-search/name/keyword - Search dishes by dish name
Authentication : All "orders" routes are protected, users must register and login, and then get a token to set authorization, otherwise, it will return "Token not provided".

I use local installation and use test isolation principal.
