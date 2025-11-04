Absolutely 🔥 — here’s a **complete, long-term memory–friendly** note set for **MongoDB Beginner (Parts 1–3)**.
It’s written in **Markdown format** — perfect for GitHub README, Obsidian, or Notion.
Everything is neatly structured, with **concept ➜ syntax ➜ example**.

---

# 🧠 MongoDB Notes — Beginner (Parts 1–3)

---

## 📘 **Part 1 — Getting Started with MongoDB**

### 🧩 1. What is MongoDB?

* MongoDB is a **NoSQL, document-oriented database**.
* Stores data in **BSON (Binary JSON)** format.
* Flexible schema → no fixed columns like SQL.
* Organized as:

  ```
  Database → Collections → Documents
  ```

---

### 🗂️ 2. Basic Mongo Shell Commands

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `show dbs`          | Lists all databases                 |
| `use <dbName>`      | Switch to / create a database       |
| `db`                | Displays current database           |
| `show collections`  | Lists all collections in current DB |
| `db.dropDatabase()` | Deletes current database            |

---

### 🏗️ 3. Creating Database & Collection

#### ➤ Create / Switch Database

```js
use schoolDB
```

> MongoDB automatically creates the database when you insert the first document.

#### ➤ Create a Collection

```js
db.createCollection("students")
```

#### ➤ Show All Collections

```js
show collections
```

---

### 📄 4. Inserting Documents

#### ➤ Insert One Document

```js
db.students.insertOne({ name: "Anita", age: 22, course: "Computer Science" })
```

#### ➤ Insert Multiple Documents

```js
db.students.insertMany([
  { name: "Ravi", age: 23, course: "IT" },
  { name: "Priya", age: 20, course: "CS" },
  { name: "Arjun", age: 22, course: "ECE" }
])
```

#### ➤ View All Documents

```js
db.students.find()
```

---

## 📘 **Part 2 — CRUD Operations**

### 🔹 C — Create

| Command        | Usage                     |
| -------------- | ------------------------- |
| `insertOne()`  | Insert a single document  |
| `insertMany()` | Insert multiple documents |

Example:

```js
db.employees.insertOne({ name: "Rahul", department: "HR", age: 29, salary: 45000 })
```

---

### 🔹 R — Read

| Method      | Description                     |
| ----------- | ------------------------------- |
| `find()`    | Returns multiple documents      |
| `findOne()` | Returns first matching document |

#### Example:

```js
db.employees.find({ department: "IT" })
```

#### Projection (show only specific fields):

```js
db.employees.find({}, { name: 1, department: 1, _id: 0 })
```

---

### 🔹 U — Update

| Command                      | Description                         |
| ---------------------------- | ----------------------------------- |
| `updateOne(filter, update)`  | Updates the first matching document |
| `updateMany(filter, update)` | Updates all matching documents      |
| `$set`                       | Change or add a field               |
| `$inc`                       | Increment numeric field             |
| `$rename`                    | Rename a field                      |

| Operator  | Description         | Example                               |
| --------- | ------------------- | ------------------------------------- |
| `$set`    | Set a new value     | `{ $set: { age: 30 } }`               |
| `$inc`    | Increment/decrement | `{ $inc: { salary: 5000 } }`          |
| `$unset`  | Remove a field      | `{ $unset: { tempField: "" } }`       |
| `$rename` | Rename a field      | `{ $rename: { dept: "department" } }` |
| `$mul`    | Multiply field      | `{ $mul: { salary: 1.1 } }`           |


#### Examples:

```js
// Change salary
db.employees.updateOne({ name: "Rahul" }, { $set: { salary: 50000 } })

// Increment salary by 5000
db.employees.updateOne({ name: "Rahul" }, { $inc: { salary: 5000 } })

// Rename "salary" → "pay"
db.employees.updateMany({}, { $rename: { salary: "pay" } })
```

---

### 🔹 D — Delete

| Command        | Description         |
| -------------- | ------------------- |
| `deleteOne()`  | Deletes first match |
| `deleteMany()` | Deletes all matches |

#### Example:

```js
db.employees.deleteMany({ age: { $gt: 60 } })
```

---

## 📘 **Part 3 — Querying, Filtering & Projection**

### 🔹 Comparison Operators

| Operator | Description                | Example                           |
| -------- | -------------------------- | --------------------------------- |
| `$eq`    | Equal to                   | `{ age: { $eq: 25 } }`            |
| `$ne`    | Not equal to               | `{ age: { $ne: 25 } }`            |
| `$gt`    | Greater than               | `{ age: { $gt: 20 } }`            |
| `$lt`    | Less than                  | `{ age: { $lt: 30 } }`            |
| `$gte`   | Greater than or equal      | `{ marks: { $gte: 80 } }`         |
| `$lte`   | Less than or equal         | `{ marks: { $lte: 90 } }`         |
| `$in`    | Matches any value in array | `{ dept: { $in: ["HR", "IT"] } }` |
| `$nin`   | Not in array               | `{ dept: { $nin: ["Finance"] } }` |

#### Example:

```js
db.students.find({ age: { $gt: 20, $lte: 23 } })
```

---

### 🔹 Logical Operators

| Operator | Description                 | Example                                           |
| -------- | --------------------------- | ------------------------------------------------- |
| `$and`   | Match all conditions        | `{ $and: [{age: {$gt:20}}, {age: {$lt:30}}] }`    |
| `$or`    | Match any condition         | `{ $or: [{city:"Bangalore"}, {city:"Chennai"}] }` |
| `$not`   | Negate condition            | `{ age: { $not: { $gt: 25 } } }`                  |
| `$nor`   | None of the conditions true | `{ $nor: [{dept:"HR"}, {dept:"IT"}] }`            |

#### Example:

```js
db.students.find({
  $and: [
    { course: { $in: ["IT", "ECE"] } },
    { age: { $gt: 20, $lte: 23 } }
  ]
})
```

---

### 🔹 Regex Queries (Pattern Matching)

| Pattern      | Description      |
| ------------ | ---------------- |
| `^A`         | Starts with "A"  |
| `a$`         | Ends with "a"    |
| `/pattern/i` | Case-insensitive |

#### Example:

```js
db.students.find({ name: { $regex: "^A" } }) // names starting with A
```

---

### 🔹 Projection (Selecting Fields)

```js
// Show only name & course
db.students.find({}, { name: 1, course: 1, _id: 0 })
```

---

### 🔹 Sorting

| Syntax          | Description |
| --------------- | ----------- |
| `{ field: 1 }`  | Ascending   |
| `{ field: -1 }` | Descending  |

#### Example:

```js
// Sort by marks descending
db.students.find().sort({ marks: -1 })

// Sort by name ascending, then age descending
db.students.find().sort({ name: 1, age: -1 })
```

---

### 🔹 Limit & Skip

| Command     | Description             |
| ----------- | ----------------------- |
| `.limit(n)` | Limit number of results |
| `.skip(n)`  | Skip first n results    |

#### Example:

```js
db.students.find().skip(5).limit(5)
```

---

### 🔹 Combined Example (Master Query)

Find all students who:

* are in course `"IT"` or `"CS"`
* have marks > 75
* age < 23
* not from `"Pune"`
* sorted by marks descending
* show only name, course, marks, and city

```js
db.students.find(
  {
    $or: [{ course: "IT" }, { course: "CS" }],
    marks: { $gt: 75 },
    age: { $lt: 23 },
    city: { $ne: "Pune" }
  },
  { name: 1, course: 1, marks: 1, city: 1, _id: 0 }
).sort({ marks: -1 })
```

---

## 🧩 Quick Summary Table

| Concept           | Key Command                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| Create DB         | `use dbName`                                                                 |
| Create Collection | `db.createCollection("name")`                                                |
| Insert One        | `db.collection.insertOne({...})`                                             |
| Insert Many       | `db.collection.insertMany([...])`                                            |
| Read              | `db.collection.find(filter, projection)`                                     |
| Update            | `updateOne()`, `updateMany()`                                                |
| Delete            | `deleteOne()`, `deleteMany()`                                                |
| Operators         | `$gt`, `$lt`, `$and`, `$or`, `$in`, `$nin`, `$ne`, `$set`, `$inc`, `$rename` |
| Sorting           | `.sort({ field: 1 or -1 })`                                                  |
| Limit/Skip        | `.limit(n)`, `.skip(n)`                                                      |
| Projection        | `{ field: 1, _id: 0 }`                                                       |

---

## 🏁 **End of Beginner Level (Parts 1–3)**

You’ve now mastered:

* Database and Collection creation
* CRUD operations
* All basic query and logical operators
* Sorting, limiting, and projections


