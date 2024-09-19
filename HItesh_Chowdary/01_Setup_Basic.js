//First Question
//HOw many users are active?

db.users.aggregate([{ $match: { isActive: true } }]);
[
  {
    $match: {
      isActive: true,
    },
  },
];
//i want to count how many users are active
db.users.aggregate([
  {
    $match: {
      isActive: true,
    },
  },
  { $count: "no_of_ActiveUSers" },
]);
