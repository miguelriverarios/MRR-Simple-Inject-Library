require("../src/injection.js");

describe("Dependency Injection via Simple Inject", function () {
  const inject = new SimpleInject();

  beforeEach(() => {
    class EchoClass {
      constructor() {}

      echo = (str) => str;
    }

    inject.register("echoClass", [EchoClass]);
  });

  it("Returns self when self is requested", () => {
    var actual = inject.get("SimpleInject");
    expect(actual).toBe(inject);
  });

  describe("First-time registration", function () {
    it("Given class without dependency, registers successfully", () => {
      const expected = "1";

      class SampleClass {
        constructor() {}

        test = (str) => str;
      }

      inject.register("1", [SampleClass]);

      const actual = inject.get("1");
      expect(actual.test(expected)).toBe(expected);
    });

    it("Given class with dependency, registers successfully", () => {
      const expected = "2";

      class SampleClass {
        constructor(echoClass) {
          this.echoClass = echoClass;
        }

        test = (str) => this.echoClass.echo(str);
      }

      inject.register("2", ["echoClass", SampleClass]);

      const actual = inject.get("2");
      expect(actual.test(expected)).toBe(expected);
    });

    it("Given not a class, throws error", () => {
      const notClass = () => {};

      expect(() => {
        inject.register("3", [notClass]);
      }).toThrow();
    });

    it("Given service not registered, throws error", () => {
      expect(() => {
        inject.get("3");
      }).toThrow();
    });

    it("Superhero example from README.md", () => {
      class Superhero {
        constructor(superpower) {
          this.superpower = superpower;
        }
      }
      inject.register("superhero", ["superpower", Superhero]);

      class Superpower {
        constructor() {
          this.ability = "heat vision";
        }
      }
      inject.register("superpower", [Superpower]);

      const superhero = inject.get("superhero");

      expect(superhero.superpower.ability).toBe("heat vision");
    });
  });
});
