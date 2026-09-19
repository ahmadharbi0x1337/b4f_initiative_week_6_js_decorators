// Creation Example
function autobind<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  if (context.kind !== "method") return;

  context.addInitializer(function (this: This) {
    // 'this' inside addInitializer points to the created class instance
    (this as any)[context.name] = (this as any)[context.name].bind(this);
  });
}

class Component {
  name: string = "Header";

  @autobind
  render(): void {
    console.log(`Rendering component: ${this.name}`);
  }
}

// Usage Example
const comp = new Component();
const detachedRender = comp.render;

detachedRender(); // Output: Rendering component: Header
