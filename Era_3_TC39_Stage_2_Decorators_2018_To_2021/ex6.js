// A Very Failed Stage, Introduced Higher Complexity, and consensus was not achieved

// Stage 2 Syntax (Used in older Babel proposal versions)
function loggedElement(elementDescriptor) {
  // elementDescriptor = {
  //   kind: "method",
  //   key: "add",
  //   placement: "prototype",
  //   descriptor: { ... }
  // }

  const originalMethod = elementDescriptor.descriptor.value;

  elementDescriptor.descriptor.value = function (...args) {
    console.log(`[Stage 2] Called ${String(elementDescriptor.key)}`);
    return originalMethod.apply(this, args);
  };

  return elementDescriptor;
}
