"use strict";

((w) => {
  /** Class representing the overall DI framework */
  class SimpleInject {
    constructor() {
      // Initializes the IOC container
      this.dictionary = {};

      // Error definitions
      this.ERROR_CONSTRUCTOR =
        "Feature Limit: Only constructors are currently supported.";
      this.ERROR_REGISTRATION = "Registration Error: Service not registered.";
    }

    /**
     * Returns the previously registered service based on the supplied label. If the service was not registered, throws an error.
     *
     * @param {string} label - the identifier for the service to be registered (does not have to match the constructor's name)
     * @return {function} - the previously registered service
     */
    get = (label) => {
      const labelIsRegistered = this.dictionary[label];

      if (labelIsRegistered) {
        return labelIsRegistered();
      }

      // if the service was not previously registered, throws error
      throw this.ERROR_REGISTRATION;
    };

    /**
     * Instantiates a constructor and injects dependencies according to the registration signature
     *
     * @param {function} constructor - the constructor to instantiate
     * @param {function[]} dependencies - the list of dependencies to inject as arguments to the constructor
     */
    invoke = (constructor, dependencies) => {
      const args = [];

      // If the list of dependencies is not an array, make it an array
      if (!!dependencies && !Array.isArray(dependencies))
        dependencies = [dependencies];

      // Loops through the list of dependencies, grabs registration signature, and pushes into list of arguments
      for (let dependency of dependencies) {
        args.push(this.get(dependency));
      }

      return new constructor(...args);
    };

    /**
     * Helper method to determine whether or not a given object is a class
     * Reference: https://stackoverflow.com/a/43197340/13771937
     *
     * @param {Object} obj - the object to determine if it is a class
     * @return {Boolean} - True/false, depending on what the object is
     */
    isClass = (obj) => {
      const isCtorClass =
        obj.constructor &&
        obj.constructor.toString().substring(0, 5) === "class";
      if (obj.prototype === undefined) {
        return isCtorClass;
      }
      const isPrototypeCtorClass =
        obj.prototype.constructor &&
        obj.prototype.constructor.toString &&
        obj.prototype.constructor.toString().substring(0, 5) === "class";
      return isCtorClass || isPrototypeCtorClass;
    };

    /**
     * Registers the specified service under the supplied label along with any required dependencies
     *
     * @param {*} label - the identifier to use as the lookup key for the registered component
     * @param {*} signature - the service to register along with the list of dependencies.
     *                        Dependencies (if applicable), must be listed first in the order that they are required by the service.
     * @returns the registered instance of the service, the service is not instantiated until it is needed (via the get call)
     */
    register = (label, signature) => {
      const signatureLength = signature.length;
      const _this = this;

      // if the service is not a constructor, throws error
      if (!_this.isClass(signature[signatureLength - 1])) {
        throw this.ERROR_CONSTRUCTOR;
      }

      // addes the signature to the IOC container
      this.dictionary[label] = () => {
        const signatureLength = signature.length;
        const Constructor = signature[signatureLength - 1];
        const dependencies =
          signatureLength > 1 ? signature.slice(0, signatureLength - 1) : [];
        let newInstance, injected, result;

        newInstance = new Constructor();

        // loops through the dependency chain
        injected = _this.invoke(Constructor, dependencies, newInstance);
        result = injected || newInstance;
        _this.dictionary[label] = () => result;
        return result;
      };
    };
  }

  /** Wrapper class to attach framework to global object */
  class Wrapper {
    constructor() {
      const ioc = new SimpleInject();
      const _that = this;
      this.get = ioc.get.bind(ioc);
      this.register = ioc.register.bind(ioc);
      ioc.dictionary["SimpleInject"] = () => {
        return _that;
      };
    }
  }

  w.SimpleInject = Wrapper;
})(window);
