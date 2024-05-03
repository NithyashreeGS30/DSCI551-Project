# DSCI551-Project

Welcome to the DSCI551 Project GitHub repository! This project aims to develop an Artwork Management System to manage artwork information and product reviews efficiently.

## Setup

To set up the project environment, follow these steps:

### MongoDB Setup

1. Install MongoDB on your local machine. If you haven't installed MongoDB yet, follow the instructions provided in the [official MongoDB documentation](https://docs.mongodb.com/manual/installation/).

2. Once MongoDB is installed, open a terminal and execute the following commands:

```bash
#!/bin/bash

# Access MongoDB shell
mongosh

# Create databases and users
echo "Creating databases and users..."
echo "Creating database 'database_0'..."
db = db.getSiblingDB('database_0')
db.createUser({
  user: 'Nithya',
  pwd: '1999',
  roles: [{ role: 'root', db: 'admin' }]
})
echo "Creating database 'database_1'..."
db = db.getSiblingDB('database_1')
db.createUser({
  user: 'Shivani',
  pwd: '1999',
  roles: [{ role: 'root', db: 'admin' }]
})
echo "Creating database 'orders'..."
db = db.getSiblingDB('orders')
db.createUser({
  user: 'Users',
  pwd: '1999',
  roles: [{ role: 'root', db: 'admin' }]
})

# Load dataset
echo "Loading dataset into databases..."
# Add instructions to load dataset into MongoDB databases

# Set up backend
echo "Setting up backend..."
# Add instructions to clone backend repository, install dependencies, and start backend server

# Set up frontend
echo "Setting up frontend..."
# Add instructions to clone frontend repository, install dependencies, and start frontend server
