// Example 2 : Method Decorator via Prototype Mutation

function timeMethod(targetClass, methodName) {
  const originalMethod = targetClass.prototype[methodName];
  // you have to modify the method on the protoType?!
  targetClass.prototype[methodName] = function (...args) {
    console.time(methodName);
    const result = originalMethod.apply(this, args);
    console.timeEnd(methodName);
    return result;
  };
}

class DataProcessor {
  process() {
    for (let i = 0; i < 1e6; i++) {} // Work simulation
  }
}

// Applying decorator manually
timeMethod(DataProcessor, "process");

const processor = new DataProcessor();
processor.process(); // Logs execution time
