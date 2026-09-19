// Requires "experimentalDecorators": true in tsconfig.json

function sealClass(constructor: Function): void {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealClass
class BankAccount {
  balance: number = 100;

  deposit(amount: number): void {
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
  (BankAccount.prototype as any).withdraw = function (amount: number) {
    this.balance -= amount;
  };
} catch (error) {
  console.log("Error adding prototype method:", (error as Error).message);
  // Output: Cannot add property withdraw, object is not extensible
}

// ------------------------------------------
// 3. Adding a new static property to the Class (Blocked)
// ------------------------------------------
try {
  // Attempt to add a new static property directly on the class
  (BankAccount as any).bankName = "Global Bank";
} catch (error) {
  console.log("Error adding static property:", (error as Error).message);
  // Output: Cannot add property bankName, object is not extensible
}

// ------------------------------------------
// 4. Deleting an existing method from the prototype (Blocked)
// ------------------------------------------
try {
  // Attempt to remove a method from the prototype
  delete (BankAccount.prototype as any).deposit;
} catch (error) {
  console.log("Error deleting method:", (error as Error).message);
  // Output: Cannot delete property 'deposit' of [object Object]
}
