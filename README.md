# Event Sourcing Management System

## About the Project

The Event Sourcing Management System is a backend-focused application built to manage financial transactions using the Event Sourcing approach.

Instead of directly updating account balances in the database, the system stores every transaction as a separate event. This makes it easier to track account activities, maintain transaction history, and understand how the account balance changes over time.

I built this project to understand how Event Sourcing works in a real-world application and how backend systems can maintain a reliable history of operations.

## Features

- **Account Management:** Create and manage user accounts.
- **Deposit:** Add money to an account and record the transaction as an event.
- **Withdrawal:** Withdraw money with proper balance validation.
- **Money Transfer:** Transfer money between accounts.
- **Event Store:** Maintain a history of all account-related transactions.
- **Event Replay:** Rebuild the current account state by replaying previously stored events.
- **Snapshots:** Save account state at specific versions to reduce the work required during event replay.
- **Transaction History:** Keep track of account activities.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Architecture:** Event Sourcing, Partial CQRS
- **Tools:** Git, GitHub, Postman

## How It Works

The main idea behind this project is simple: every important account operation is stored as an event rather than just changing the balance directly.

For example, when a user deposits money, the system records a deposit event. When the user withdraws money, a withdrawal event is recorded.

The account's current balance can then be calculated by processing these events in sequence.

Snapshots are also used to save the account's state at a particular point, making future event replay more efficient.

## Project Structure

The project is organized into separate modules for handling routes, controllers, services, database operations, and event processing. This keeps the code manageable and makes it easier to maintain and extend.

## What I Learned

While working on this project, I got practical experience with:

- Building REST APIs using Node.js and Express.js.
- Working with MongoDB and Mongoose.
- Understanding Event Sourcing and event replay.
- Implementing snapshot-based state recovery.
- Managing account transactions and validations.
- Organizing backend code into reusable modules.

## Future Improvements

- Add stronger authentication and authorization.
- Improve transaction consistency and error handling.
- Add automated unit and integration tests.
- Improve the frontend and dashboard.
- Add better monitoring and logging.

## Conclusion

This project helped me understand that managing data is not always about storing the latest value. Sometimes, maintaining the complete history of how that value was created is equally important.

It was a good learning experience in backend development, database management, and event-driven system design.
