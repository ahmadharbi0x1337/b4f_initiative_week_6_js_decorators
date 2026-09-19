import "reflect-metadata";
import {
  plainToInstance,
  Expose,
  Exclude,
  Type,
  Transform,
} from "class-transformer";

class Address {
  street!: string;
  city!: string;
}

class UserProfile {
  @Exclude()
  id!: number;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  // 1. Combine properties into a computed getter
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // 2. Hide sensitive or unwanted data from output
  @Exclude()
  passwordHash!: string;

  // 3. Format/transform raw values (e.g., sanitize email)
  @Expose()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  // 4. Automatically convert nested objects into class instances
  @Expose()
  @Type(() => Address)
  address!: Address;
}

// Simulated raw API payload (plain JSON object)
const rawJsonPayload = {
  id: 42,
  firstName: "Ahmad",
  lastName: "Khaled",
  passwordHash: "secret_hash_12345",
  email: "  AHMAD@EXAMPLE.COM  ",
  address: {
    street: "123 Main St",
    city: "Damascus",
  },
};

// Transform the plain object into a UserProfile instance, after transformation
// id, and passwordHash will not be available and they will render as undefined
const user = plainToInstance(UserProfile, rawJsonPayload, {
  excludeExtraneousValues: false, // if changed to true, it will Only keep properties explicitly marked with @Expose, meaning any property which is not marked with Exposed will render as undefined, and also nested objects such as Address will render as undefined if the parent type properties is not marked with Expose also
});

console.log("Transformed User Instance:\n", user);
console.log("\nFull Name (Computed):", user.fullName);
console.log(
  "Is address an instance of Address class?:",
  user.address instanceof Address,
);
console.log("Password included?:", (user as any).passwordHash ?? "Excluded");
