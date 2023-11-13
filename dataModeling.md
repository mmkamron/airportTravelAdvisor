# Data Modeling

## Entity Relationship Diagram

![data-modeling](erd.png)

## Table of Contents

- [Tables](#tables)
  - [1. Airport](#1-airport)
  - [2. Ticket](#2-ticket)
  - [3. User](#3-user)
- [Relationships](#relationships)
    - [1. User to Ticket](#1-user-to-ticket)
    - [2. Ticket to Airport (from_airport)](#2-ticket-to-airport-from_airport)
    - [3. Ticket to Airport (to_airport)](#3-ticket-to-airport-to_airport)

-----

## Tables

### 1. Airport

| Key | Column Name      | Data Type | Description                  |
|-----|------------------|-----------|------------------------------|
| PK  | id               | int       | Primary key for Airport     |
|     | name             | varchar   | Name of the airport          |
|     | city             | varchar   | Name of the city             |

### 2. Ticket

| Key | Column Name     | Data Type | Description                                                 |
|-----|-----------------|-----------|-------------------------------------------------------------|
| PK  | id              | int       | Primary key for Ticket                                      |
| FK  | user_id         | int       | Foreign key to User (nullable, ticket can be not purchased) |
| FK  | from_airport_id | int       | Foreign key to Airport (from)                               |
| FK  | to_airport_id   | int       | Foreign key to Airport (to)                                 |
|     | seat_number     | int       | Seat number of the ticket                                   |
|     | price           | int       | Price of the ticket                                         |
|     | departure_time  | timestamp | Departure time of the ticket                                |
|     | arrival_time    | timestamp | Arrival time of the ticket                                  |

### 3. User

| Key | Column Name | Data Type | Description                               |
|-----|-------------|-----------|-------------------------------------------|
| PK  | id          | int       | Primary key for User                      |
|     | email       | varchar   | Email of the user                         |
|     | username    | varchar   | Username of the user                      |
|     | password    | varchar   | Password of the user                      |
|     | role        | user_role | Role of the user (enum('admin','client')) |

## Relationships

All relationships are one to many

### 1. User to Ticket

- One user can have many tickets.
- One ticket can belong to only one user.

### 2. Ticket to Airport (from_airport)

- One ticket is associated with one departure airport.
- One departure airport can be associated with many tickets.

### 3. Ticket to Airport (to_airport)

- One ticket is associated with one destination airport.
- One destination airport can be associated with many tickets.
