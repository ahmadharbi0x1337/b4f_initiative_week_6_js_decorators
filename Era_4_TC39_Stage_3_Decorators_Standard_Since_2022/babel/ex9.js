// Example 9: Stage 3 Class Decorator
// Purpose: Replacing or extending whole class definitions.

// Creation Example
function customElement(tagName) {
  return function (targetClass, context) {
    if (context.kind !== "class") return;

    return class extends targetClass {
      constructor(...args) {
        super(...args);
        console.log(`Registered web component: <${tagName}>`);
      }
    };
  };
}

@customElement("user-profile")
class UserProfileWidget {
  constructor(userId) {
    this.userId = userId;
  }
}

// Usage Example
const widget = new UserProfileWidget(42);
// Output: Registered web component: <user-profile>

/*
 * How it works: A Stage 3 class decorator receives (targetClass, context).
 * If it returns a new class/constructor, that new constructor replaces the original class definition.
 */
