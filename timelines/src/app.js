'use strict';

(() => {

  const app = window.app = (...args) => {
    const [module, definition] = args;

    if (args.length === 0) {
      // app is being run
      app.run();
      return app;
    } else if (args.length === 1) {
      // a module is being required
      return app.module(module);
    } else if (args.length === 2) {
      // a module definition is being registered
      app.module(module, definition);
      return app;
    }
  };

  app.modules = {};
  app.definitions = {};

  app.run = () => {
    // simply run the main module
    app.module('main')();
  };

  app.resolving = [];

  app.module = (...args) => {
    const [module, definition] = args;

    if (args.length === 1) {
      // a module is being required
      if (!! app.modules[module]) {
        // if module is already resolved
        return app.modules[module];
      } else {
        // resolve module
        if (app.resolving.indexOf(module) === -1) {
          // first check if the definition is a valid function
          if (typeof app.definitions[module] !== 'function') {
            throw `invalid module definition: ${module}`;
          }

          // if the module is not already being resolved
          app.resolving.push(module);
          app.modules[module] = app.definitions[module]();
          app.resolving.pop();

          return app.module(module);
        } else {
          throw `circular dependency resolution ${JSON.stringify(app.resolving)}`; 
        }
      }
    } else if (args.length === 2) {
      // register module definition
      app.definitions[module] = definition;
      return app;
    }
  };

})();