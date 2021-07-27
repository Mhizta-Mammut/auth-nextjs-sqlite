-- UP
-- Create a new table called 'Person' in schema 'SchemaName'

-- Create the table in the specified schema
CREATE TABLE Person
(
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- primary key column
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT
    -- specify more columns here
);

-- Create the table in the specified schema
CREATE TABLE Vehicle
(
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- primary key column
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    ownerId INTEGER REFERENCES Person(id)
    -- specify more columns here
);

-- DOWN
-- Drop the table 'Person' in schema 'SchemaName'
DROP TABLE Person;
DROP TABLE Vehicle;