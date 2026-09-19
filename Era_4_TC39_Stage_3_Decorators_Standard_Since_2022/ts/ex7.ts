// Creation Example
function log<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  const methodName = String(context.name);

  if (context.kind !== "method") {
    throw new Error("This decorator can only be used on methods!");
  }

  return function (this: This, ...args: Args): Return {
    console.log(`[Stage 3] Entering ${methodName}`);
    const result = originalMethod.apply(this, args);
    console.log(`[Stage 3] Exiting ${methodName}`);
    return result;
  };
}

class PaymentService {
  @log
  processPayment(amount: number): void {
    console.log(`Processing $${amount}`);
  }
}

// Usage Example
const service = new PaymentService();
service.processPayment(50);
