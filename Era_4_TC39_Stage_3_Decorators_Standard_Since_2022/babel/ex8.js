// Example 8: Stage 3 @autobind via context.addInitializer

// Using addInitializer to automatically bind instance methods to this, solving common event handler issues.

// Creation Example
function autobind(originalMethod, context) {
  if (context.kind !== "method") return;

  context.addInitializer(function () {
    // 'this' inside the initializer function points to the created class instance
    this[context.name] = this[context.name].bind(this);
  });
}

class Component {
  name = "Header";

  @autobind
  render() {
    console.log(`Rendering component: ${this.name}`);
  }
}

// Usage Example
const comp = new Component();
const detachedRender = comp.render;

// Without @autobind, this would log: "Rendering component: undefined"
detachedRender(); // Output: Rendering component: Header

/*
* How addInitializer works under the hood:
The JS engine collects all addInitializer callbacks during class definition and runs them inside the constructor during instance creation, before user code inside the constructor body executes.
*/
