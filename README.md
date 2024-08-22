```markdown
# Backend-Test

This project is a Node.js application using TypeORM for database management. Is provided a ormconfig.json and .env files with default configuration, feel free to change everything you need. Below, you'll find instructions on how to set up and run the project, as well as tasks that need to be completed.

Before you need installed:
mysql
redis
mongodb

## Table of Contents

- [Installation](#installation)
- [Generating Migrations](#generating-migrations)
- [Running the Project](#running-the-project)
- [Project Tasks](#project-tasks)

## Installation

To get started, you need to install the project's dependencies. We recommend using Yarn as the package manager for this project.

### Install Yarn

If you don't have Yarn installed, you can install it globally on your machine by running:

```bash
npm install -g yarn
```

### Install Dependencies

Once Yarn is installed, navigate to the project directory and run the following command to install all necessary dependencies:

```bash
yarn install
```

## Generating Migrations

If you need to generate new database migrations, you can find several commands in the `scripts` section of the `package.json` file. The specific command to generate all migrations is `typeormgenerateall`.

To generate a migration, use the following command:

```bash
yarn typeormgenerateall [NAME_OF_NEW]
```

Replace `[NAME_OF_NEW]` with the name you want to give your migration.

## Running the Project

To start the project, use the following command:

```bash
yarn api:server
```

This will start the server, and you can then interact with the API endpoints as required.

## Project Tasks

Here are the tasks that need to be implemented or reviewed in the project:

1. **Implement `ShowMessageByFromUser`**:
   - Create the necessary functions and routes to retrieve messages based on the `from_user_id`.

2. **Implement `ShowMessageByToUser`**:
   - Develop the functions and routes required to retrieve messages based on the `to_user_id`.

3. **Review and Correct SQL Requests**:
   - Analyze and correct any SQL queries that may be inefficient or incorrect. Consider if the queries could be optimized or structured differently.

4. **Evaluate `ShowMessagesByCustomers`**:
   - Assess whether the `ShowMessagesByCustomers` function is appropriately implemented and placed within the project structure. Could it have been implemented in a different way? If so, how?

5. **General Improvements**:
   - Consider any other areas of the project that could be improved or altered for better performance, readability, or functionality.
```
