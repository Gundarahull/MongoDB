$exists:true //for the field present in the documnet or not
await Student.find({hasMacbook:{$exists:true}})


//type: what type of datafield is presnt in that for that we need to read MONGODB document to get the codes of the dataType.....

await Student.find({isSignedIn:{$type:"bool",$eq:true}})

//eq to true also gives correct value
