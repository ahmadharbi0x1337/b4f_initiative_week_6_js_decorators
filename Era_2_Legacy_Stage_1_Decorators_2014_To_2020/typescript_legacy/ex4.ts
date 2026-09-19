// Requires "experimentalDecorators": true in tsconfig.json

function logMethod(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (this: unknown, ...args: unknown[]) {
    console.log(`[LOG] Calling method: '${propertyKey}' with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[LOG] Finished executing '${propertyKey}'`);
    return result;
  };

  return descriptor;
}

class User {
  name: string;
  email?: string;

  constructor(name: string) {
    this.name = name;
  }

  @logMethod
  save(): void {
    console.log(`Saving ${this.name} to database...`);
  }

  @logMethod
  updateEmail(newEmail: string): boolean {
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
const isUpdated: boolean = user.updateEmail("ahmad@example.com");
console.log("Return value:", isUpdated);
