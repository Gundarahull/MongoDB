await Room.create(
  { name: "rahul" },
  { writeConcern: { w: 0, j: false, wtimeout: 1000 } }
);

// Summary:
// w: 0: No acknowledgment required; the operation is "fire-and-forget."
// j: false: Don't wait for the write to be journaled.
// wtimeout: 1000: Wait up to 1 second for the write concern to be met.

// Yes, the writeConcern option can be used with update and delete operations in MongoDB. The writeConcern option works similarly across different types of write operations, including updateOne(), updateMany(), deleteOne(), and deleteMany()

// -------------------------------<><><><><><><><><><<><></></></></></></></></></></></>------------------------------------

//ATOMICITY ----chesthey motham chey lekapothe kumtha musukoni undu--------------------------
//Atomicity in Action:
// Scenario 1: All steps are completed successfully, and you receive your $100. The transaction is successful, and your account is debited accordingly.

// Scenario 2: Suppose after debiting $100 from your account (Step 4), the ATM encounters a technical issue and fails to dispense the cash (Step 5). In this case, atomicity ensures that the entire transaction is rolled back, meaning the $100 is not deducted from your account, and your balance remains unchanged.

// Why is Atomicity Important?