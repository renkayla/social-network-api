## NoSQL Challenge: Social Network API

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

The NoSQL Challenge: Social Network API is a backend application built using Express.js, MongoDB, and Mongoose. This API serves as the foundation for a social network web application where users can share their thoughts, react to friends' thoughts, and manage their friend list. It leverages the power of MongoDB, a popular NoSQL database, to handle large amounts of unstructured data efficiently. The Mongoose ODM is used to model and interact with the MongoDB database.

The objective of this challenge is to demonstrate proficiency in building and structuring an API using NoSQL technologies commonly employed by social networking platforms. By completing this challenge, you will gain a deeper understanding of how to handle data and create robust APIs for social network applications.

To showcase the functionality and meet the acceptance criteria, a walkthrough video has been created. The video demonstrates the API's features, including the retrieval and manipulation of users, thoughts, reactions, and friend relationships. Please refer to the video linked below for a detailed demonstration:

[API Walkthrough Video](<insert-link-to-your-video-here>)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [License](#license)
- [Questions](#questions)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in the terminal.
3. Run `npm install` to install the required dependencies.

## Usage

1. Ensure you have a MongoDB database available.
2. Configure the database connection settings in the `.env` file.
3. Run `npm start` to start the server and sync the Mongoose models with the MongoDB database.
4. Use an API development tool such as Insomnia or Postman to interact with the API endpoints.

## API Routes

The API provides the following routes and corresponding functionality:

### `/api/users`

- GET `/api/users`: Retrieves all users.
- GET `/api/users/:userId`: Retrieves a single user by ID and populates thought and friend data.
- POST `/api/users`: Creates a new user.
- PUT `/api/users/:userId`: Updates an existing user.
- DELETE `/api/users/:userId`: Deletes a user and their associated thoughts.

### `/api/users/:userId/friends/:friendId`

- POST `/api/users/:userId/friends/:friendId`: Adds a new friend to a user's friend list.
- DELETE `/api/users/:userId/friends/:friendId`: Removes a friend from a user's friend list.

### `/api/thoughts`

- GET `/api/thoughts`: Retrieves all thoughts.
- GET `/api/thoughts/:thoughtId`: Retrieves a single thought by ID.
- POST `/api/thoughts`: Creates a new thought and associates it with a user.
- PUT `/api/thoughts/:thoughtId`: Updates an existing thought.
- DELETE `/api/thoughts/:thoughtId`: Deletes a thought.

### `/api/thoughts/:thoughtId/reactions`

- POST `/api/thoughts/:thoughtId/reactions`: Creates a new reaction for a thought.
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`: Deletes a reaction from a thought.

## Models

### User

- `username`: String, unique, required, trimmed.
- `email`: String, required, unique, validated as a valid email address.
- `thoughts`: Array of `_id` values referencing the Thought model.
- `friends`: Array of `_id` values referencing the User model (self-reference).

### Thought

- `thoughtText`: String, required, between 1 and 280 characters.
- `createdAt`: Date, default value is the current timestamp, formatted on query.
- `username`: String, required.
- `reactions`: Array of nested documents created with the Reaction schema.

### Reaction (Schema Only)

- `reactionId`: Mongoose's ObjectId data type, default value is a new ObjectId.
- `reactionBody`: String, required, maximum of 280 characters.
- `username`: String, required.
- `createdAt`: Date, default value is the current timestamp, formatted on query.

## License

This project is licensed under the terms of the MIT license. For more details, please refer to the [LICENSE](LICENSE) file.

## Questions

If you have any questions or need further assistance, please feel free to contact me:

GitHub: [renkayla](https://github.com/renkayla)
Email: [renkayla@gmail.com](mailto:renkayla@gmail.com)
