type ClassConstructor<T = {}> = new (...args: any[]) => T;

// Creation Example
function customElement(tagName: string) {
  return function <T extends ClassConstructor>(
    targetClass: T,
    context: ClassDecoratorContext<T>,
  ) {
    if (context.kind !== "class") return;

    return class extends targetClass {
      constructor(...args: any[]) {
        super(...args);
        console.log(`Registered web component: <${tagName}>`);
      }
    };
  };
}

@customElement("user-profile")
class UserProfileWidget {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}

// Usage Example
const widget = new UserProfileWidget(42);
// Output: Registered web component: <user-profile>
