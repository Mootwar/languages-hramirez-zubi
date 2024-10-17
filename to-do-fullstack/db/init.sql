
-- Collaborative To-Do List Database Initialization Script

-- Create 'users' table to store user information.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'tasks' table to store tasks.
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT false,
    deadline TIMESTAMP,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'shared_tasks' table to handle task sharing between users.
CREATE TABLE shared_tasks (
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id, user_id)
);

-- Insert a sample user (for testing purposes).
INSERT INTO users (username, password_hash) VALUES ('admin', 'hashed_password');

-- Insert sample tasks (for testing purposes).
-- INSERT INTO tasks (title, description, owner_id) VALUES
-- ('Buy groceries', 'Buy milk, eggs, and bread', 1),
-- ('Finish project', 'Complete the collaborative to-do list app', 1);

-- Share a sample task with another user (assuming another user is added).
-- INSERT INTO shared_tasks (task_id, user_id) VALUES (1, 2);
