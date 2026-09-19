import "reflect-metadata";
import { IsEmail, IsNotEmpty, Min, validate } from "class-validator";

class CreateUserDto {
  @IsNotEmpty({ message: "Name must not be empty" })
  name!: string;

  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @Min(18, { message: "User must be at least 18 years old" })
  age!: number;
}

async function handleRequest(rawData: any) {
  // Create an instance and populate it with data
  const user = new CreateUserDto();
  user.name = rawData.name;
  user.email = rawData.email;
  user.age = rawData.age;

  // Validate the instance against the decorator rules
  const errors = await validate(user);

  if (errors.length > 0) {
    console.log("Validation failed!");
    errors.forEach((err) => {
      console.log(
        `- Property '${err.property}':`,
        Object.values(err.constraints || {}),
      );
    });
  } else {
    console.log("Validation passed! User saved:", user);
  }
}

// ❌ Invalid payload
console.log("--- Testing Invalid Data ---");
await handleRequest({ name: "", email: "not-an-email", age: 15 });

// ✅ Valid payload

console.log("\n--- Testing Valid Data ---");
await handleRequest({ name: "Ahmad", email: "ahmad@example.com", age: 22 });
