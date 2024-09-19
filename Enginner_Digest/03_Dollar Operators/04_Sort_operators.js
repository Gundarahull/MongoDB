// sort.()
db.collection.find().sort({"age":-1}) //for big to small
// 1 means small to big

//we cant use the Sort method in the array of objecst

//if we have same age then we will sort with name
db.collection.find().sort({"age":1,"name":1}) 



//projecions