// Requires legacy decorators enabled in Babel or TypeScript

function logMethod(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`[LOG] Calling method: '${propertyKey}' with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[LOG] Finished executing '${propertyKey}'`);
    return result;
  };

  return descriptor;
}

class User {
  constructor(name) {
    this.name = name;
  }

  @logMethod
  save() {
    console.log(`Saving ${this.name} to database...`);
  }

  @logMethod
  updateEmail(newEmail) {
    this.email = newEmail;
    console.log(`Updated email to ${this.email}`);
    return true;
  }
}

// ==========================================
// Examples of Usage
// ==========================================

const user = new User("Ahmad");

// Example 1: Basic execution without arguments
console.log("--- Example 1 ---");
user.save();

// Example 2: Execution with arguments and return values
console.log("\n--- Example 2 ---");
const isUpdated = user.updateEmail("ahmad@example.com");
console.log("Return value:", isUpdated);
