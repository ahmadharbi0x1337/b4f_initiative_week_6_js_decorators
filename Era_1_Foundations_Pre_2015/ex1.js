// Example 1 : Function Decorator (using HOF "Higher-Order-Functions")

// Decorator creation
function withLogging(originalFn, fnName = originalFn.name) {
  // The Closure, withLogging Returns the anon function (...args)
  return function (...args) {
    //  Pre-Behavior Before Function Execution
    console.log(`[LOG] Executing ${fnName} with arguments:`, args);
    //  Original Function Execution
    const result = originalFn.apply(this, args);
    // Post-Behavior After Function Execution
    console.log(`[LOG] ${fnName} returned:`, result);
    return result;
  };
}
// NOTE: Closures Remember/Keeps a Memory of the Outer Scope Variables, Which in this case
// is the originalFn or the callBack to be more accurate.

// Target function
function multiply(a, b) {
  return a * b;
}

// Decorator application/Usage
// you call the decorator with the target function as callback and store the function in a var
const multiplyWithLog = withLogging(multiply);
// you call the var which now holds the anonymous function and pass the arguments
multiplyWithLog(4, 5);
// Output:
// [LOG] Executing multiply with arguments: [ 4, 5 ]
// [LOG] multiply returned: 20

// what is the apply() and call() methods exactly ?
// and why we are passing the this keyword ?
