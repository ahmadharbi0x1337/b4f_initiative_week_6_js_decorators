// Creation Example
function trackChange<This, Value>(
  target: ClassAccessorDecoratorTarget<This, Value>,
  context: ClassAccessorDecoratorContext<This, Value>,
): ClassAccessorDecoratorResult<This, Value> {
  const { get, set } = target;

  return {
    get(this: This): Value {
      return get.call(this);
    },
    set(this: This, val: Value): void {
      console.log(`Property ${String(context.name)} changing to: ${val}`);
      set.call(this, val);
    },
  };
}

class Settings {
  @trackChange
  accessor theme: string = "light";
}

// Usage Example
const s = new Settings();
s.theme = "dark"; // Output: Property theme changing to: dark
