// Example 5: Class Decorator (Stage 1)
// enable strict mode to see how the catch error will appear in the output
"use strict";
function sealClass(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealClass
class BankAccount {
  balance = 100;

  deposit(amount) {
    this.balance += amount;
  }
}

// ==========================================
// Examples of Usage
// ==========================================

const account = new BankAccount();

// ------------------------------------------
// 1. Normal usage (Allowed)
// ------------------------------------------
// Existing instance properties and methods work normally.
account.deposit(50);
console.log("Current balance:", account.balance); // Output: 150

// ------------------------------------------
// 2. Adding a new method to the prototype (Blocked)
// ------------------------------------------
try {
  // Attempt to dynamically add a new method to the class prototype
  BankAccount.prototype.withdraw = function (amount) {
    this.balance -= amount;
  };
} catch (error) {
  console.log("Error adding prototype method:", error.message);
  // Output: Cannot add property withdraw, object is not extensible
}

// ------------------------------------------
// 3. Adding a new static property to the Class (Blocked)
// ------------------------------------------
try {
  // Attempt to add a new static property directly on the class
  BankAccount.bankName = "Global Bank";
} catch (error) {
  console.log("Error adding static property:", error.message);
  // Output: Cannot add property bankName, object is not extensible
}

// ------------------------------------------
// 4. Deleting an existing method from the prototype (Blocked)
// ------------------------------------------
try {
  // Attempt to remove a method from the prototype
  delete BankAccount.prototype.deposit;
} catch (error) {
  console.log("Error deleting method:", error.message);
  // Output: Cannot delete property 'deposit' of [object Object]
}
