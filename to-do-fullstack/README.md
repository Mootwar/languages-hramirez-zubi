### `README.md`

### 3. Running the Application

You have two options to run the application: using **Docker** or running it locally.

### Option 1: Running with Docker
1. **Build and Run the Containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**:
   - Navigate to `http://localhost:3000` in your browser.
   - The application should now be running with a PostgreSQL database in the background.

### Option 2: Running Locally
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the PostgreSQL Database**:
   - Install PostgreSQL locally or use a PostgreSQL server.
   - Create a database named `hangman_db`.
   - Run the SQL commands in `db/init.sql` to set up the database schema.

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Navigate to `http://localhost:3000` in your browser.

### 4. Development with Dev Containers (Optional)
If you're using Visual Studio Code and have Docker installed, you can use the dev container setup provided:

1. Open the project in VS Code.
2. Click on the green icon in the bottom-left corner and select **"Reopen in Container"**.
3. VS Code will build and open the dev container with the Node.js environment.

## Endpoints

### User Endpoints
- **POST /register**: Register a new user.
  - Request Body: `{ "username": "your_username" }`
  - Response: `{ "id": 1, "username": "your_username" }`

- **POST /login**: Login an existing user.
  - Request Body: `{ "username": "your_username" }`
  - Response: `{ "id": 1, "username": "your_username" }`

### Game Endpoints
- **POST /start**: Start a new game for a user.
  - Request Body: `{ "userId": 1 }`
  - Response: `{ "gameId": 1, "wordLength": 8 }`

- **POST /guess**: Submit a letter guess for the current game.
  - Request Body: `{ "gameId": 1, "letter": "a" }`
  - Response: `{ "status": "active", "remainingAttempts": 5 }`

- **GET /state**: Get the current state of a game.
  - Request Query: `?gameId=1`
  - Response: `{ "wordState": "_ _ a _ _ _ _ _", "guessedLetters": ["a"], "remainingAttempts": 5, "status": "active" }`

### Admin Endpoints
- **GET /admin/words**: Retrieve all words in the database.
  - Response: `["javascript", "nodejs", "docker", "postgresql"]`

- **POST /admin/words**: Update the word list in the database.
  - Request Body: `{ "words": ["newword1", "newword2", "newword3"] }`
  - Response: `{ "message": "Words updated successfully" }`

## Screenshots
![Hangman Game Screenshot](public/hangman_screenshot.png)

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding style and add appropriate tests for any new features.

## Acknowledgments
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Bootstrap](https://getbootstrap.com/)
- SVG graphics created manually for hangman game states.
```

### How to Use:
1. Place this file in the root of your project directory.
2. Update any missing details, such as your GitHub repository URL or additional instructions.
3. Commit the `README.md` file to your Git repository:

   ```bash
   git add README.md
   git commit -m "Add project documentation"
   git push origin main
   ```


https://chatgpt.com/share/67106cb7-1a4c-8011-9c97-7845b7342c06