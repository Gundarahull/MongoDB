🧪 Exercises — Filtering
=====-------------------========--------------------============--------------==============
Ultra-Simple Memory Trick

No $ = Field name

$field = Field value

$operator = Do some action
====--------------------=========----------------====================

Answer with pipelines only. Keep them short.

F1. Paid orders in the last 30 days
Collection: orders(status, createdAt) → return _id only.

>> db.orders.aggregate([
  {
    $match:{
      			status:"PAID"
    		}
  },
  {
    $project:{
      daysDiffernce:{
        $dateDiff:{
          startDate:"$createdAt",
          endDate:"$$NOW",
          unit:"day"
        }
      }
    }
  },{
    $match:{daysDiffernce:{$lte:30}}
  },{
    $project:{
      _id:1
    }
  }
])

F2. Users overspending
Find users where spent > budget. (Use $expr.)
db.collection.find({
  $expr: { $gt: ["$fieldA", "$fieldB"] } // Finds documents where fieldA's value is greater than fieldB's value
})


F3. Mixed logic
From products, get docs where (category = "Phone" OR category = "Tablet") AND active = true AND price < 50000.
    >>db.products.aggregate(
    [
        {
        $match:{
            $or:[{category:"Phone"},{category:"Tablet"}],
            active:true,
            price:{$lt:50000}
        }
        }
    ]
)
F4. Date window per user
From sessions, find sessions for user U that start in October 2025.
>> db.sessions.aggregate(
  [
    {
      $match:{
        $expr:{
          $eq:[{$month:"$createdAt"},10]
        }
      }
    }
  ]
)
F5. (Trick) Avoid $where
You need users where the length of name is > 10.
Write a solution without $where using $expr + $strLenCP.
>> db.users.aggregate(
  [
    {
      $project:{
        trimmes:{$trim:{input:"$name"}},
        name:1
      }
    },
    {
        $project:{
          stringLength:{
            $strLenCP: "$trimmes" 
          },
          trimmedLength:{
            $strLenCP: {$trim:{input:"$name"} }
          }
        }
    }
  ]
)

=====-------------------=====-----------------=====-----------------=====------------------=====-------------=====---------------------=====------------------=====--------------------=====-------------------=====------------------=====--------------=====----------------=====-----------------------------=====-------------------------------


✅ Q1 — $project

From users, return:

name
email
isActive  (rename of active)


Hide _id.

✅ Use ONLY $project.

>> db.users.aggregate(
  [
    {
      $project:{
        name:1,
        email:1,
    		active:1
      }
    },
    {
      $set:{
        	isActive:"$active"
       }
    },
    {
      $project:{
       	name:1,
        email:1,
        isActive:1,
        _id:0
      }
    }
  ]
)

✅ Q2 — $addFields

From orders, add a computed field inside items[]:

lineTotal = unitPrice * quantity


✅ Do NOT unwind
✅ Keep original fields

✅ Q3 — $unset

From users, remove fields:

password

phone

addresses

✅ Use $unset only
✅ One stage
>> db.users.aggregate(
  [
    {
      $unset:["password","phone","addresses"]
    }
  ]
)
✅ Q4 — $replaceRoot

From reviews, reshape each document to:

{
  rating,
  comment,
  user: userId
}


✅ Use $replaceRoot or $replaceWith
✅ No $project

db.reviews.aggregate(
    [
      {
        $replaceWith: { // The value for $replaceWith is a single document/expression
            $mergeObjects: [ // Correct operator name: $mergeObjects
                "$$ROOT", // Use $$ROOT to keep all other existing fields
                {
                    userId: "$user" // The field you want to add/rename
                }
            ]
        }
      }
    ]
)

✅ Q5 — Combined Reshaping

From products, output:

title
shortTitle      // first 10 characters of title
priceWithGST    // price * 1.18
categoryUpper   // category in UPPERCASE


✅ Use $project + $addFields
✅ Use $substr (or $substrCP)

>> db.products.aggregate(
  [
    {
      $project: {
          "title": 1,
          "shortitle": { $substrCP: [ "$title", 0, 10 ] },
        	"priceWithGST":{$multiply:["$price",1.18]},
        	"categoryUpper":{$toUpper:"$category"}
      }
    }
  ]
)
✅ Q6 — Bonus (Hard)

From orders, produce:

{
  orderId: _id,
  userId,
  totalItems,       // number of items (size of array)
  totalQuantity,    // sum of all item quantities
  totalValue        // orderTotal
}


✅ No $unwind
✅ Use $size
✅ Use $reduce
>> db.orders.aggregate(
  [
    {
      $project:{
        _id:0,
        orderId:"$_id",
        userId:1,
        totalItems:{$size:"$items"},
        totalQuantity:{$sum:"$items.quantity"},
        totalValue:"$orderTotal"
      }
    }
  ]
)


=====================================================================================================

🧪 JOINS EXAM
✅ Q1 — Basic Lookup

From users, join their orders.

Return the shape:

{
  name,
  email,
  orders: [
    { _id, orderTotal }
  ]
}


✅ Use $lookup with localField / foreignField
✅ Use $project to return only _id and orderTotal inside orders[]
✅ No pipeline lookup

>> db.users.aggregate(
  [
    {
      $lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"userId",
        as:"orders"
      }
    },
    {
      $project:{
        name:1,
        email:1,
        orders: {
        _id: "$orders._id",
        orderTotal: "$orders.orderTotal"
      }
      }
    }
  ]
)

✅ Q2 — Filtered Lookup (Pipeline)

From users, join only PAID orders from the last 30 days as recentOrders.

Each element of recentOrders[] should contain:

{ _id, orderTotal, createdAt }


✅ Must use $lookup with pipeline + let + $expr
✅ Must filter by date inside lookup
✅ No extra fields in the joined docs
>> db.users.aggregate(
  [
    {
      $lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"userId",
        as:"recentOrders"
      }
    },
   {
    $match: {
      "recentOrders.status": "PAID",
      "recentOrders.createdAt": {
        $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30) // 30 days in milliseconds
      }
    }
	},
  {
    $project:{
      _id:1,
     	recentOrders:{
        _id:"$recentOrders._id",
        createdAt:"$recentOrders.createdAt"
      }
    } 
  }
]
)
✅ Q3 — Anti-Join

From products, return only products with zero reviews.

Output shape:

{
  title,
  category
}



✅ Use $lookup
✅ Use $match to detect empty review arrays
✅ Do NOT use $unwind
>> db.products.aggregate(
  [
    {
      $lookup:{
        from :"reviews",
        foreignField:"productId",
        localField:"_id",
        as:"review"
      }
    },
    {
    	$match:{
        "review.rating":{
          $eq:0
        }
      }  
    },
    {
    	$project:{
        title:1,
        category:1
      }  
    }
  ]
)


✅ Q4 — Many-to-Many Join

Assume you have:

students → enrollments → courses


Collections:

students: { _id, name }

enrollments: { studentId, courseId }

courses: { _id, title }

Return:

{
  studentName,
  enrolledCourses: [ "Course Title 1", "Course Title 2", ... ]
}


✅ Use 2 lookups
✅ First: students → enrollments
✅ Second: enrollments → courses
✅ Must use $unwind in between
✅ Must return only course titles
>> db.students.aggregate(
  [
    {
      $lookup:{
        from:"enrollments",
        foreignField:"studentId",
        localField:"_id",
        as:"studentEnroll"
      }
    },
    {
      $lookup:{
        from:"courses",
        foreignField:"_id",
        localField:"studentEnroll.courseId",
        as:"enrolledCourses"
      }
    },
    {
      $project:{
        _id:0,
        studentName:"$name",
        enrolledCourses:"$enrolledCourses.title"
      }
    }
  ]
)

✅ Q5 — Recursive Join (Hard)

Given:

categories:
{ _id, name, parentId }


Write a pipeline that returns:

{
  name,
  children: [
    { name, level }
  ]
}


✅ Use $graphLookup
✅ Use connectFromField / connectToField
✅ Use depthField as level

>> db.categories.aggregate(
  [
    {
      $graphLookup:{
        from:"categories",
        startWith:"$parentId",
        connectFromField:"parentId",
        connectToField:"_id",
        depthField:"numConnections",
        as:"categoriesHier"
      }
    },
    {
      $project:{
        name:"$name",
        children:{
          name:"$categoriesHier.name",
          level:"$numConnections"
        }
      }
    }
	]
)

==============================================

🧪 ARRAYS EXAM
✅ Q1 — $unwind

Orders collection:

{
  orderId: 101,
  items: [
    { product: "Laptop", qty: 1 },
    { product: "Mouse", qty: 3 }
  ]
}


➡️ Unwind items[]

Output shape:

{
  orderId,
  product,
  qty
}


✅ Use ONLY $unwind + $project
✅ No $map, no $reduce

>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $project:{
        _id:0,
        orderId:1,
        product:"$items.product",
        qty:"$items.qty"
      }
    }
  ]
)


✅ Q2 — $map

Orders collection:

Add a computed field inside each element of items[]:

lineTotal = qty * price


➡️ Do NOT unwind
➡️ Keep original items
➡️ Use $map + $mergeObjects

✅ Q3 — $filter

From orders, keep only items where:

qty > 1


Output:

{
  orderId,
  filteredItems: [...]
}


✅ Use ONLY $filter

✅ Q4 — $reduce

Compute:

totalQty = sum of all items[].qty


✅ Use $reduce
✅ No unwind
✅ No $map

✅ Q5 — $size

Return:

{
  orderId,
  itemCount: items.length
}


✅ Use $size

>> db.aggregate.

✅ Q6 — $slice

Return only the last 2 items:

{
  orderId,
  lastTwo: [...]
}


✅ Use $slice with negative index

✅ Q7 — $arrayElemAt

Return the first item from items[]:

{
  orderId,
  firstItem: {...}
}


✅ Use $arrayElemAt

✅ Q8 — $concatArrays

Each user has:

skills: {
  primary: ["JS", "Mongo"],
  secondary: ["Docker", "AWS"]
}


Return:

allSkills: ["JS", "Mongo", "Docker", "AWS"]


✅ Use $concatArrays

✅ Q9 — $setUnion

Each product has:

tagsProduct: ["tech", "mobile"]
tagsCategory: ["electronics", "tech"]


Output:

uniqueTags: ["tech", "mobile", "electronics"]


✅ Use $setUnion
✅ Should remove duplicates

✅ Q10 — $reverseArray

Return:

{
  reviewHistoryReversed: reversed reviews[]
}


✅ Use $reverseArray


================================================================================

🔥 **CATEGORY 4 — GROUPING EXAM (THE BIG ONE)**
This exam is designed to make you **MASTER** every grouping concept:

✅ `$group` (simple → medium → complex)
✅ `$sum`, `$avg`, `$max`, `$min`, `$count`, `$push`, `$addToSet`, `$first`, `$last`
✅ `$bucket`
✅ `$bucketAuto`
✅ Real-world analytics challenges
✅ Math operators inside group: `$multiply`, `$divide`, `$subtract`, `$round`, `$cond`, `$toDecimal`, `$toInt`

You wanted **lots of questions**, so I’m giving you the **largest exam so far**.
You will be unstoppable after solving these.

As usual:
📌 Answer **with pipelines only**
📌 No explanation needed
📌 Keep pipelines clean

---

# 🧪 **GROUPING EXAM — PART 1 (Basic → Medium `$group`)**

### ✅ **Q1 — Count orders per user**

From `orders`, return:

```
{
  userId,
  orderCount
}
```

>> db.orders.aggregate(
  [
    {
      $group:{
        _id:"$userId",
        ordersCount:{
          $sum:1
        }
      }
    }
  ]
)

---

### ✅ **Q2 — Total revenue per order**

items[] contains `{ qty, price }`

Compute:

```
revenue = sum(qty * price) per order
```

Group by `_id`.

---
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$_id",
        revenuePerOrder:{
          $sum:{
            $multiply:["$items.qty","$items.unitPrice"]
          }
        }
      }
    }
  ]
)

### ✅ **Q3 — Total revenue per product**

Important:
You must `$unwind` items → group by `items.product`.

Output:

```
{
  product,
  totalQty,
  totalRevenue
}
```
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group: {
        _id: "$items.productId", 
        totalRevenue: {
          $sum: {
            $multiply: ["$items.qty", "$items.unitPrice"]
          }
        },
        totalQuantity: {
          $sum: "$items.qty"
        },
        productTitle: { $first: "$items.title" } 
      }
  	}
  ]
)

---

### ✅ **Q4 — Average rating per product**

From `reviews` collection, each product has:

```
productId,
reviews: [ { rating, ... } ]
```

Produce:

```
{
  productId,
  avgRating,
  reviewCount
}
```

✅ Use `$unwind`
✅ Use `$avg` + `$sum`
>> db.reviews.aggregate(
  [
    {
      $group:{
        _id:"$productId",
        avgRating:{
          $avg:"$rating"
        },
        reviewsCount:{
          $sum:1
        }
      }
    },
    {
      $project:{
        productId:"$_id",
        avgRating:1,
        reviewsCount:1,
        _id:0
      }
    }
  ]
)

---

### ✅ **Q5 — Number of users per skill**

From users:

```
skills.primary: ["JS", "Mongo"]
skills.secondary: ["Docker", "AWS"]
```

Step 1: `$concatArrays`
Step 2: `$unwind`
Step 3: `$group`

Output:

```
skill,
userCount
```

>> db.students.aggregate(
  [
    {
      $project:{
        courses:{
          $concatArrays:["$skills.primary","$skills.secondary"]
        }
      }
    },
    {
      $unwind:"$courses"
    },
    {
      $group:{
        _id:"$courses",
        userCount:{
        	$sum:1 
        }
      }
    },
    {
      $project:{
        skill:"$_id",
        userCount:1,
        _id:0
      }
    }
  ]
)

---

# 🧪 **GROUPING EXAM — PART 2 (Advanced `$group`)**

### ✅ **Q6 — Highest value order per user**

Return:

```
{
  userId,
  biggestOrderValue
}
```


You MUST sort first → then group using `$first`.

---
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$userId",
        highestOrder:{
          $sum:{
            $multiply:["$items.qty","$items.unitPrice"]
          }
        }
      }
    },
    {
      $sort:{
        highestOrder:-1
      }
    },
    {
      $project:{
        userId:"$_id",
        biggestOrderValue:"$highestOrder",
        _id:0
      }
    }
  ]
)

### ✅ **Q7 — Monthly revenue**

Group orders by month number (1 → 12):

Output:

```
month,
totalRevenue
```

✅ Use `$month` inside `_id`
>>
db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:{
          $month:"$createdAt"
        },
        monthRevenue:{
          $sum:{
            $multiply: ["$items.qty","$items.unitPrice"]
          }
        }
      }
    },
    {
      $project:{
        month:"$_id",
        totalRevenue:"$monthRevenue",
        _id:0
      }
    }
  ]
)

---

### ✅ **Q8 — Revenue by category**

items[] contains:

```
{ product, category, qty, price }
```

Return revenue per category:

```
{
  category,
  revenue
}
```
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$items.category",
        categoryRevenue:{
          $sum:{
            $multiply: ["$items.qty","$items.unitPrice"]
          }
        }
      }
    },
    {
      $project:{
        category:"$_id",
        revenue:"$categoryRevenue",
        _id:0
      }
    }
  ]
)

---

### ✅ **Q9 — Unique products purchased per user**

Use `$addToSet` on items.product.

```
{
  userId,
  uniqueProducts: [ ... ]
}
```

>>db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$userId",
        uniqueProducts:{
          $addToSet:"$items.title"
        }
    	 }
    },
    {
      $project:{
        userId:"$_id",
        uniqueProducts:1,
        _id:0
      }
    }
  ]
)

---

### ✅ **Q10 — User with max spending**

Compute:

```
spending = sum(qty * price) across all orders per user
```

Then return only the top 1 user using:

✅ `$sort`
✅ `$limit`
✅ `$group`
✅ correct math inside reduce/unwind

---
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$userId",
        highestOrder:{
          $sum:{
            $multiply:["$items.qty","$items.unitPrice"]
          }
        }
      }
    },
    {
      $sort:{
        highestOrder:-1
      }
    },
    {
      $limit:1
    },
    {
      $project:{
        userId:"$_id",
        spending:"$highestOrder",
        _id:0
      }
    }
  ]
)

# 🧪 **PART 3 — `$bucket` + `$bucketAuto`**

### ✅ **Q11 — Bucket users by age**

Boundaries:

```
[0, 18, 30, 50, 100]
```

Output for each bucket:

```
{
  bucketRange,
  userCount
}
```
>>db.users.aggregate(
  [
    {
      $bucket:{
        groupBy:"$age",
        boundaries:[0,18,30,50,100],
        output:{
          userCount:{
            $sum:1
          }
        }
      }
    }
  ]
)

---

### ✅ **Q12 — Auto-bucket products by price**

Group products into 4 automatic buckets:

```
{
  minPrice,
  maxPrice,
  count
}
```
>> db.products.aggregate(
  [
    {
      $bucketAuto:{
        groupBy:"$price",
        buckets: 4  
      }
    }
  ]
)

---

# 🧪 **PART 4 — REAL WORLD ANALYTICS QUESTIONS**

### ✅ **Q13 — Daily sales report**

Return:

```
{
  date,
  totalOrders,
  totalRevenue
}
```

✅ Use `$dateTrunc: { unit: "day" }`
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:{
          $dayOfMonth:"$createdAt"
        	},
      	totalOrders:{
          $sum:1
        },
        totalRevnue:{
          $sum:{
          	$multiply:["$items.qty","$items.unitPrice"]
          }
        }
      }
    },
    {
      $project:{
         date: {
           $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } 
         },
        totalOrders:1,
        totalRevnue:1,
        _id:0
      }
    }
  ]
)

---

### ✅ **Q14 — Product performance summary**

Output:

```
{
  product,
  unitsSold,
  avgPrice,
  totalRevenue
}
```
>> db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $group:{
        _id:"$items.productId",
        unitsSold:{
          $sum:1  
        },
        avgPrice:{
          $avg:"$items.unitPrice"
        },
        totalRevnue:{
          $sum:{
            $multiply:["$items.qty","$items.unitPrice"]
          }
        },
        product:{
          $first:"$items.title"
        }
      }
    },
    {
      $project:{
        product:1,
        unitsSold:1,
        avgPrice:1,
        totalRevnue:1,
        _id:0
      }
    }
  ]
)

✅ `$unwind`
✅ `$group`
✅ `$avg`
✅ `$sum`

---

### ✅ **Q15 — Order size analysis**

Using `$bucketAuto` with 5 buckets, group orders by **total quantity**.

Output example:

```
{
  minQty,
  maxQty,
  orderCount
}
```
db.orders.aggregate(
  [
    {
      $unwind:"$items"
    },
    {
      $bucketAuto:{
        groupBy:{
          $sum:"$items.qty"
        },
        buckets:4
      }
    }
  ]
)

---

# ✅ **Submit Format**

Copy & paste answers like this:

```
Q1:
db.orders.aggregate([ ... ])

Q2:
...

...

Q15:
...
```

You’ll get a **full score out of 100**, with detailed corrections like last time.

Ready when you are, Rahul!🔥
