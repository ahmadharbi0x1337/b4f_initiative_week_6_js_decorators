// CAUSES Export Error, You Should Import The Whole Lib Then Destruct
// #region
// import { readonly, deprecate, time } from "core-decorators";

// class APIClient {
//   // 1. Prevents this property from being modified
//   @readonly
//   apiVersion = "v2";

//   // 2. Logs a deprecation warning to the console when called
//   @deprecate("Use fetchUsersV2 instead", {
//     url: "https://api.example.com/docs",
//   })
//   fetchUsersV1() {
//     return ["User1", "User2"];
//   }

//   // 3. Automatically measures and logs execution time
//   @time("fetchUsersV2 Execution Time")
//   fetchUsersV2() {
//     let sum = 0;
//     for (let i = 0; i < 1e6; i++) {
//       sum += i;
//     }
//     return ["User1", "User2", "User3"];
//   }
// }

// const client = new APIClient();

// console.log("API Version:", client.apiVersion);

// // Attempting to overwrite a @readonly property will fail in strict mode
// // client.apiVersion = 'v3';

// console.log("\n--- Calling deprecated v1 method ---");
// client.fetchUsersV1();

// console.log("\n--- Calling v2 method with timing ---");
// client.fetchUsersV2();
// #endregion

import pkg from "core-decorators";
const { readonly, deprecate, time } = pkg;

class APIClient {
  // 1. Prevents this property from being modified
  @readonly
  apiVersion = "v2";

  // 2. Logs a deprecation warning (note: 'deprecate', not 'deprecated')
  @deprecate("Use fetchUsersV2 instead", {
    url: "https://api.example.com/docs",
  })
  fetchUsersV1() {
    return ["User1", "User2"];
  }

  // 3. Automatically measures and logs execution time
  @time("fetchUsersV2 Execution Time")
  fetchUsersV2() {
    let sum = 0;
    for (let i = 0; i < 1e6; i++) {
      sum += i;
    }
    return ["User1", "User2", "User3"];
  }
}

const client = new APIClient();

console.log("API Version:", client.apiVersion);

console.log("\n--- Calling deprecated v1 method ---");
client.fetchUsersV1(); // Output:
// DEPRECATION APIClient#fetchUsersV1: Use fetchUsersV2 instead
// See https://api.example.com/docs for more details.

console.log("\n--- Calling v2 method with timing ---");
client.fetchUsersV2(); // Output
// fetchUsersV2 Execution Time-0: 13.157ms
