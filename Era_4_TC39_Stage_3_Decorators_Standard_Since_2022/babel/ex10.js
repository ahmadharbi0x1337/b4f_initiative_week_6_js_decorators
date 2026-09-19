// Example 10: Stage 3 Auto-Accessors (accessor)
// Purpose: Stage 3 introduced a brand new class keyword: accessor.
// An accessor field automatically creates private backing storage with implicit getters and setters.

// Creation Example
function trackChange(target, context) {
  // target is an object with { get, set } functions for the accessor
  const { get, set } = target;

  return {
    get() {
      return get.call(this);
    },
    set(val) {
      console.log(`Property ${String(context.name)} changing to: ${val}`);
      set.call(this, val);
    },
  };
}

class Settings {
  @trackChange
  accessor theme = "light";
}

// Usage Example
const s = new Settings();
s.theme = "dark"; // Output: Property theme changing to: dark

/*
* Deep Dive Mechanics:
Writing accessor theme = "light"; tells the JS engine to generate:

A private storage slot #theme.

A public get theme() getter.

A public set theme(val) setter.

The decorator intercepts these getters and setters directly, providing a clean replacement for full property descriptor interception.
*/
