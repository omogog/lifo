# Key-Value Store and Stack API

## Overview

This project is a **Node.js** application built using **Express** that implements two main features:

1. **In-memory Stack (LIFO)**: A stack where you can push and pop items.
2. **In-memory Key-Value Store with TTL**: A key-value store that supports optional time-to-live (TTL) for keys.

The application is structured following **Clean Architecture** principles to maintain separation of concerns, testability, and scalability.

### Key Concepts:

- **Entities**: Core business logic, such as Stack and Key-Value Store.
- **Use Cases**: Application-specific logic that interacts with the entities.
- **Interfaces/Controllers**: Handling HTTP requests and responses.
- **Framework/Infrastructure**: Express.js for managing routes and web server logic.

## Architecture

### Clean Architecture Layers:

1. **Entities**:
    - These are the core components of the system, such as the `Stack` and `KeyValueStore` classes.

2. **Use Cases**:
    - Encapsulates the application-specific business logic. Use cases coordinate between entities and controllers.

3. **Interfaces (Controllers and Routes)**:
    - The controllers define how the app interacts with external clients (HTTP requests).
    - The routes define HTTP endpoints and map them to controller actions.

4. **Framework (Express)**:
    - The web server and routing logic are handled by Express.js.

---

## Routes

### Stack Routes (LIFO)

1. **Add Item to Stack**
    - **URL**: `/stack/add`
    - **Method**: `POST`
    - **Description**: Adds an item to the stack.
    - **Body**:
      ```json
      {
        "item": "yourItem"
      }
      ```

    - **Example `curl` Request**:

      ```bash
      curl -X POST http://localhost:3000/stack/add -H "Content-Type: application/json" -d '{"item":"Hello"}'
      ```

    - **Response**:
      ```json
      {
        "message": "Item Hello added to stack"
      }
      ```

2. **Get Item from Stack**
    - **URL**: `/stack/get`
    - **Method**: `GET`
    - **Description**: Retrieves and removes the top item from the stack (LIFO).

    - **Example `curl` Request**:

      ```bash
      curl http://localhost:3000/stack/get
      ```

    - **Response (If Stack is Not Empty)**:
      ```json
      {
        "item": "Hello"
      }
      ```

    - **Response (If Stack is Empty)**:
      ```json
      {
        "message": "Stack is empty"
      }
      ```

---

### Key-Value Store Routes (with TTL)

1. **Add Key-Value Pair**
    - **URL**: `/kvstore/add`
    - **Method**: `POST`
    - **Description**: Adds a key-value pair to the store with an optional TTL (in seconds).
    - **Body**:
      ```json
      {
        "key": "yourKey",
        "value": "yourValue",
        "ttl": 30  // Optional
      }
      ```

    - **Example `curl` Request**:

      ```bash
      curl -X POST http://localhost:3000/kvstore/add -H "Content-Type: application/json" -d '{"key":"name", "value":"John", "ttl":30}'
      ```

    - **Response**:
      ```json
      {
        "message": "Key name added with value John"
      }
      ```

2. **Get Value by Key**
    - **URL**: `/kvstore/get/:key`
    - **Method**: `GET`
    - **Description**: Retrieves the value for the specified key, respecting TTL if provided.

    - **Example `curl` Request**:

      ```bash
      curl http://localhost:3000/kvstore/get/name
      ```

    - **Response (Key Found)**:
      ```json
      {
        "key": "name",
        "value": "John"
      }
      ```

    - **Response (Key Expired or Not Found)**:
      ```json
      {
        "message": "Key not found or expired"
      }
      ```

3. **Delete Key**
    - **URL**: `/kvstore/delete/:key`
    - **Method**: `DELETE`
    - **Description**: Deletes the specified key from the store.

    - **Example `curl` Request**:

      ```bash
      curl -X DELETE http://localhost:3000/kvstore/delete/name
      ```

    - **Response**:
      ```json
      {
        "message": "Key name deleted"
      }
      ```

---

## Running the Application

### Install Dependencies:

Before running the application, install the dependencies:

```bash
npm install
```

This runs the unit tests using Jest to validate both the Stack and Key-Value Store functionalities.

### Example Flow

1. **Add Items to Stack**:
    ```bash
    curl -X POST http://localhost:3000/stack/add -H "Content-Type: application/json" -d '{"item":"Hello"}'
    curl -X POST http://localhost:3000/stack/add -H "Content-Type: application/json" -d '{"item":"World"}'
    ```

2. **Get Items from Stack**:
    ```bash
    curl http://localhost:3000/stack/get  # Should return "World"
    curl http://localhost:3000/stack/get  # Should return "Hello"
    curl http://localhost:3000/stack/get  # Should return "Stack is empty"
    ```

3. **Add Key-Value Pair with TTL**:
    ```bash
    curl -X POST http://localhost:3000/kvstore/add -H "Content-Type: application/json" -d '{"key":"name", "value":"John", "ttl":10}'
    ```

4. **Retrieve Key Before TTL Expires**:
    ```bash
    curl http://localhost:3000/kvstore/get/name  # Should return "John"
    ```

5. **Retrieve Key After TTL Expires (after 10 seconds)**:
    ```bash
    curl http://localhost:3000/kvstore/get/name  # Should return "Key not found or expired"
    ```

6. **Delete a Key**:
    ```bash
    curl -X DELETE http://localhost:3000/kvstore/delete/name
    ```

### Future Enhancements

- **Persistent Storage**: Add persistent storage (like Redis or a database) for the Key-Value Store.
- **Authentication**: Add user authentication and API key support to secure the API.
- **Pagination/Filtering**: Implement pagination and filtering for large data sets in the Key-Value Store.

## Conclusion

This application demonstrates a clean and testable implementation of in-memory stack and key-value store functionality with optional TTL. It is designed for scalability and maintainability, following clean architecture principles.
