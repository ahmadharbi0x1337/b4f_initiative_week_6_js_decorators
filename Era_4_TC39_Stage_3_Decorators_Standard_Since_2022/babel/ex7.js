// Example 7: Stage 3 Method Decorator
// Creation Example
function log(originalMethod, context) {
  const methodName = String(context.name);

  // Validate that it's being applied to a method
  if (context.kind !== "method") {
    throw new Error("This decorator can only be used on methods!");
  }

  return function (...args) {
    console.log(`[Stage 3] Entering ${methodName}`);
    const result = originalMethod.apply(this, args);
    console.log(`[Stage 3] Exiting ${methodName}`);
    return result;
  };
}

class PaymentService {
  @log
  processPayment(amount) {
    console.log(`Processing $${amount}`);
  }
}
// Usage Example
const service = new PaymentService();
service.processPayment(50);

/*
* Details/Notes
Deep Dive Mechanics (context object):
The context object contains engine-provided structural details:

kind: String ("method", "field", "getter", "setter", "class", or "accessor").

name: Name of the property or symbol.

static: Boolean indicating static vs instance.

private: Boolean indicating if it's a private #field or #method.

addInitializer(fn): Allows running initialization logic when an instance is constructed.
*/
