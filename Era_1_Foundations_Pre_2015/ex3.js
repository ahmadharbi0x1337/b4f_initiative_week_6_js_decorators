// will not throw an error, but prevent modifications.
// will throw an error if only in  STRICT MODE, try un-commenting "use strict" to see
// "use strict";

// Example 3: Property Descriptor Decorator
// Note: The Descriptor is an object of the following Shape
/*
*{
  value: 'string',
  writable: bool,
  enumerable: bool,
  configurable: bool
}
*/

// Decorator Creation
function makeReadOnly(targetObject, propertyName) {
  const descriptor = Object.getOwnPropertyDescriptor(
    targetObject,
    propertyName,
  );
  //   console.log(descriptor);
  //   console.log(targetObject); // the passed object
  //   console.log(propertyName); // the passed propertyName
  //   console.log(
  //     Object.defineProperty(targetObject, propertyName, {
  //       ...descriptor,
  //       writable: false,
  //       configurable: false,
  //     }),
  //   );
  // returns the object as it is but underneath modifies the permissions as we stated
  Object.defineProperty(targetObject, propertyName, {
    ...descriptor,
    writable: false,
    configurable: false,
  });
}

const config = {
  apiKey: "SECRET_KEY_123",
};

// Decorator Usage
makeReadOnly(config, "apiKey");

// Attempting to overwrite throws in strict mode
// config.apiKey = "NEW_KEY"; // TypeError: Cannot assign to read only property 'apiKey'
// console.log(config.apiKey);

// Historical Notes and Importance:
// This mechanism (PropertyDescriptor) became the foundational abstraction for the TC39
// Stage 1 Decorator specification.
