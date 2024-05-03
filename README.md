# Artwork Management System

Welcome to the Artwork Management System GitHub repository! This system is designed to manage artwork information and product reviews efficiently. Below are the instructions for setting up the project environment.

## MongoDB Setup

1. **Install MongoDB**: Install MongoDB on your local machine. You can download MongoDB from the [official website](https://www.mongodb.com/try/download/community).

2. **Access MongoDB Shell**: Open the terminal and type the following command to access the MongoDB shell:

    ```bash
    mongosh
    ```

3. **Create Databases and Users**: Execute the following commands in the MongoDB shell to create databases and users:

    ```javascript
    // Create database_0
    db = db.getSiblingDB('database_0')
    db.createUser({
      user: 'Nithya',
      pwd: '1999',
      roles: [{ role: 'root', db: 'admin' }]
    })

    // Create database_1
    db = db.getSiblingDB('database_1')
    db.createUser({
      user: 'Shivani',
      pwd: '1999',
      roles: [{ role: 'root', db: 'admin' }]
    })

    // Create orders database
    db = db.getSiblingDB('orders')
    db.createUser({
      user: 'Users',
      pwd: '1999',
      roles: [{ role: 'root', db: 'admin' }]
    })
    ```

4. **Load Dataset**: Load the provided dataset into the databases based on the hash values.

    - The dataset is available in the link [ArtDataset.json](https://drive.google.com/file/d/1s4_rJFnQjtLRoyrohJ55hu4YC8e3qH_C/view?usp=sharing).

## Backend Setup

1. **Clone Backend Repository**: Clone the backend repository:

    ```bash
    git clone https://github.com/NithyashreeGS30/DSCI551-Project.git
    ```

2. **Install Dependencies**: Navigate to the backend directory and install the required dependencies using pip. For example:

    ```bash
    cd backend-repo
    pip install pyMongo
    ```

3. **Run Backend Server**: Once the installation of all the packages is completed, run the following command to start the backend server:

    ```bash
    uvicorn artisan:app --reload
    ```

## Frontend Setup

1. **Clone Frontend Repository**: Clone the frontend repository:

    ```bash
    git clone https://github.com/NithyashreeGS30/DSCI551-Project.git
    ```

2. **Install Dependencies**: Navigate to the frontend directory and install all the required packages using npm:

    ```bash
    cd frontend-repo
    npm install
    ```

3. **Run Frontend Project**: After installing the packages, run the following command to start the frontend project:

    ```bash
    npm run
    ```
