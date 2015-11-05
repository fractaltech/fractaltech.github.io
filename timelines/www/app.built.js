'use strict';

(function () {

  var app = window.app = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var module = args[0];
    var definition = args[1];

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

  app.run = function () {
    // simply run the main module
    app.module('main')();
  };

  app.resolving = [];

  app.module = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var module = args[0];
    var definition = args[1];

    if (args.length === 1) {
      // a module is being required
      if (!!app.modules[module]) {
        // if module is already resolved
        return app.modules[module];
      } else {
        // resolve module
        if (app.resolving.indexOf(module) === -1) {
          // first check if the definition is a valid function
          if (typeof app.definitions[module] !== 'function') {
            throw 'invalid module definition: ' + module;
          }

          // if the module is not already being resolved
          app.resolving.push(module);
          app.modules[module] = app.definitions[module]();
          app.resolving.pop();

          return app.module(module);
        } else {
          throw 'circular dependency resolution ' + JSON.stringify(app.resolving);
        }
      }
    } else if (args.length === 2) {
      // register module definition
      app.definitions[module] = definition;
      return app;
    }
  };
})();
'use strict';

app('main', function () {
  app('data.describeProjects')();

  var Container = app('dom.Container');

  return function () {
    ReactDOM.render(React.createElement(Container, null), document.querySelector('main'));
  };
});

document.addEventListener('DOMContentLoaded', function (ev) {
  app();
});
'use strict';

app('data.describeProjects', function () {
  var months = app('util.months');

  var _app = app('data.store');

  var project = _app.project;
  var founder = _app.founder;
  var developer = _app.developer;
  var designer = _app.designer;
  var developers = _app.developers;
  var designers = _app.designers;

  return function () {
    project('Forms App', 'forms-app', 3).addResource(founder('kapil'), months(1), 'dev-api').addResource(founder('kapil'), months(2), 'dev-ui').addResource(founder('vivek'), months(1, 2), 'design-product').addResource(founder('kapil'), months(1, 2), 'manage-product').addResource(founder('vivek'), months(2, 6), 'manage-product').addResource(designer(1), months(1, 2), 'design-product').addResource(developer(1), months(1, 2), 'dev-api').addResource(developer(2), months(1, 2), 'dev-ui').addResource(developers(1, 2), months(3), 'dev-product').addResource(developers(1, 2), months(3), 'support-product').addResource(designer(1), months(3), 'support-product').addResource(developers(3, 4), months(4, 6), 'support-product').addResource(designer(2), months(4, 6), 'support-product');

    project('App Builder Platform', 'app-builder-platform', 9).addResource(founder('kapil'), months(3), 'dev-api').addResource(founder('kapil'), months(1, 12), 'manage-product').addResource(founder('vivek'), months(1, 6), 'design-ui').addResource(designer(2), months(1, 6), 'design-ui').addResource(designer(1), months(3, 6), 'design-ui').addResource(designer(3), months(3, 8), 'design-ui').addResource(founder('kapil'), months(4, 5), 'dev-ui').addResource(developers(1, 2), months(4, 6), 'dev-api').addResource(developers(1, 2), months(4, 6), 'dev-ui').addResource(developers(3, 4), months(6, 8), 'dev-api').addResource(developers(3, 4), months(6, 8), 'dev-ui').addResource(developers(1, 2), months(4, 6), 'dev-product').addResource(founder('kapil'), months(6, 8), 'dev-product').addResource(developers(1, 2, 3, 4), months(9, 12), 'support-product').addResource(designers(1, 2, 3), months(9, 12), 'support-product');

    project('App Builder Themes', 'app-builder-themes', 12).addResource(founder('vivek'), months(1, 15), 'manage-product').addResource(founder('vivek'), months(5, 8), 'design-ui').addResource(designer(1, 2), months(5, 8), 'design-ui').addResource(designer(3, 12), months(9, 12), 'design-ui').addResource(designer(4), months(10, 12), 'design-ui').addResource(developer(1, 2, 3, 4), months(9, 12), 'dev-product');

    project('App Builder Docs', 'app-builder-docs', 12).addResource(founder('kapil'), months(1, 15), 'manage-product').addResource(founder('kapil'), months(9, 12), 'dev-product').addResource(designer(4), months(9, 10), 'design-ui');
  };
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

app('data.models', function () {
  var range = app('util.range');

  var Project = (function () {
    function Project(name, slug, cutoffMonth) {
      _classCallCheck(this, Project);

      this.name = name;
      this.slug = slug;
      this.cutoffMonth = cutoffMonth;

      this.resources = new Set();
      this.responsibilities = new Map();
    }

    _createClass(Project, [{
      key: 'addResource',
      value: function addResource(resource, months, involvement) {
        var _this = this;

        if (Array.isArray(resource)) {
          resource.forEach(function (r) {
            _this.addResource(r, months, involvement);
          });

          return this;
        }

        var responsibility = new Responsibility(this, resource, involvement, months);

        this.resources.add(resource, resource);

        if (!this.responsibilities.has(resource)) {
          this.responsibilities.set(resource, []);
        }

        this.responsibilities.get(resource).push(responsibility);

        resource.projects.add(this);
        resource.addOnProject(this, responsibility);

        return this;
      }

      // delResource(resource) {
      //   this.resources.delete(resource);
      //   this.responsibilities.delete(resource);
      // }

    }]);

    return Project;
  })();

  var Resource = (function () {
    function Resource(type, id) {
      _classCallCheck(this, Resource);

      this.type = type;
      this.id = id;

      this.projects = new Set();
      this.responsibilities = new Map();
    }

    _createClass(Resource, [{
      key: 'addOnProject',
      value: function addOnProject(project, responsibility) {
        if (!this.responsibilities.has(project)) {
          this.responsibilities.set(project, []);
        }

        this.responsibilities.get(project).push(responsibility);
        return this;
      }
    }, {
      key: 'responsibilitiesFor',
      value: function responsibilitiesFor(project) {
        if (this.responsibilities.has(project)) {
          return this.responsibilities.get(project);
        } else {
          return [];
        }
      }
    }, {
      key: 'name',
      get: function get() {
        return this.type + '-' + this.id;
      }
    }]);

    return Resource;
  })();

  var Responsibility = (function () {
    function Responsibility(project, resource, involvement, months) {
      _classCallCheck(this, Responsibility);

      this.project = project;
      this.resource = resource;
      this.involvement = involvement;
      this.months = months;
    }

    _createClass(Responsibility, [{
      key: 'bgStyle',
      value: function bgStyle() {
        return { backgroundColor: '#dff0d8' };
      }
    }, {
      key: 'coversMonth',
      value: function coversMonth(month) {
        return this.months.indexOf(month) > -1;
      }
    }]);

    return Responsibility;
  })();

  return { Project: Project, Resource: Resource, Responsibility: Responsibility };
});
'use strict';

app('data.store', function () {
  var _app = app('data.models');

  var Project = _app.Project;
  var Resource = _app.Resource;

  var projects = new Set();
  var resources = new Set();

  function project(name, slug, cutoffMonth) {
    if (slug === undefined) {
      slug = name;

      return Array.from(projects).filter(function (p) {
        return p.slug === slug;
      })[0];
    } else {
      var p = new Project(name, slug, cutoffMonth);
      projects.add(p);
      return p;
    }
  }

  function resource(type, id) {
    var res = Array.from(resources).filter(function (r) {
      return r.type === type && r.id === id;
    })[0];

    if (res) {
      return res;
    } else {
      resources.add(new Resource(type, id));
      return resource(type, id);
    }
  }

  function founder(id) {
    return resource('founder', id);
  }

  function developer(id) {
    return resource('developer', id);
  }

  function designer(id) {
    return resource('designer', id);
  }

  function developers() {
    for (var _len = arguments.length, ids = Array(_len), _key = 0; _key < _len; _key++) {
      ids[_key] = arguments[_key];
    }

    return ids.map(function (id) {
      return developer(id);
    });
  }

  function designers() {
    for (var _len2 = arguments.length, ids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      ids[_key2] = arguments[_key2];
    }

    return ids.map(function (id) {
      return designer(id);
    });
  }

  return {
    projects: projects,
    resources: resources,
    project: project,
    resource: resource,
    founder: founder,
    developer: developer,
    designer: designer,
    developers: developers,
    designers: designers
  };
});
'use strict';

app('data.team', function () {
  var range = app('util.range');

  var _founders = [{ slug: 'kapil', name: 'Kapil' }, { slug: 'vivek', name: 'Vivek' }];

  var developers = [];
  var designers = [];

  return {
    founder: function founder(slug) {
      return _founders.filter(function (f) {
        return slug === f.slug;
      })[0];
    },
    founders: function founders() {
      return _founders;
    },
    developer: function developer(num) {
      return { name: 'Developer ' + num, slug: 'dev-' + num };
    },
    designer: function designer(num) {
      return { name: 'Designer ' + num, slug: 'des-' + num };
    },
    developers: function developers(num) {
      var _this = this;

      return range(1, num + 1).map(function (i) {
        return _this.developer(i);
      });
    },
    designers: function designers(num) {
      var _this2 = this;

      return range(1, num + 1).map(function (i) {
        return _this2.designer(i);
      });
    }
  };
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.Container', function () {
  var _app = app('data.store');

  var projects = _app.projects;
  var project = _app.project;

  var Project = app('dom.Project');
  var Timeline = app('dom.Timeline');

  var Container = (function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
      _classCallCheck(this, Container);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, props));

      _this.state = {};

      _this._initTabs();
      return _this;
    }

    _createClass(Container, [{
      key: '_initTabs',
      value: function _initTabs() {
        this.state.tabs = [{ slug: 'all', name: 'All Timelines' }].concat(Array.from(projects).map(function (p) {
          return { slug: p.slug, name: p.name };
        }));

        this.state.activeTab = this.state.tabs[0];
      }
    }, {
      key: 'activateTab',
      value: function activateTab(tab) {
        this.setState({ activeTab: tab });
      }
    }, {
      key: 'onTabActivated',
      value: function onTabActivated(tab, ev) {
        ev.preventDefault();
        this.activateTab(tab);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          'div',
          { className: 'container-fluid' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-12' },
              React.createElement(
                'h1',
                null,
                'Actions and Timelines'
              ),
              React.createElement(
                'ul',
                { className: 'nav nav-tabs' },
                (function () {
                  return _this2.state.tabs.map(function (tab) {
                    return React.createElement(
                      'li',
                      { className: tab === _this2.state.activeTab ? 'active' : '' },
                      React.createElement(
                        'a',
                        { href: '#', onClick: _this2.onTabActivated.bind(_this2, tab) },
                        tab.name
                      )
                    );
                  });
                })()
              ),
              (function () {
                switch (_this2.state.activeTab.slug) {
                  case 'all':
                    return React.createElement(Timeline, null);
                  default:
                    return React.createElement(Project, { project: project(_this2.state.activeTab.slug) });
                }
              })()
            )
          )
        );
      }
    }]);

    return Container;
  })(React.Component);

  return Container;
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.Project', function () {

  var months = app('util.months');

  var Project = (function (_React$Component) {
    _inherits(Project, _React$Component);

    function Project(props) {
      _classCallCheck(this, Project);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Project).call(this, props));
    }

    _createClass(Project, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
              'table',
              { className: 'table table-bordered' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    null,
                    React.createElement(
                      'small',
                      null,
                      'Resource/Role'
                    )
                  ),
                  (function () {
                    return months(1, 18).map(function (i) {
                      return React.createElement(
                        'th',
                        null,
                        React.createElement(
                          'small',
                          null,
                          'Month ',
                          i
                        )
                      );
                    });
                  })()
                )
              ),
              React.createElement(
                'tbody',
                null,
                (function () {
                  return Array.from(_this2.props.project.resources).map(function (resource) {
                    var responsibilities = resource.responsibilitiesFor(_this2.props.project);

                    return [React.createElement(
                      'tr',
                      null,
                      React.createElement(
                        'th',
                        { className: 'bg-warning' },
                        React.createElement(
                          'small',
                          null,
                          resource.name
                        )
                      ),
                      (function () {
                        return months(1, 18).map(function (m) {
                          return React.createElement('td', { className: 'bg-warning' });
                        });
                      })()
                    )].concat(responsibilities.map(function (responsibility) {
                      return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                          'td',
                          null,
                          React.createElement(
                            'small',
                            null,
                            React.createElement(
                              'small',
                              null,
                              responsibility.involvement
                            )
                          )
                        ),
                        (function () {
                          return months(1, 18).map(function (m) {
                            if (responsibility.coversMonth(m)) {
                              return React.createElement('td', { style: responsibility.bgStyle() });
                            } else {
                              return React.createElement('td', null);
                            }
                          });
                        })()
                      );
                    }));
                  });
                })()
              )
            )
          )
        );
      }
    }]);

    return Project;
  })(React.Component);

  return Project;
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.Timeline', function () {
  var _app = app('data.store');

  var projects = _app.projects;
  var resources = _app.resources;

  var months = app('util.months');

  var Timeline = (function (_React$Component) {
    _inherits(Timeline, _React$Component);

    function Timeline(props) {
      _classCallCheck(this, Timeline);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Timeline).call(this, props));
    }

    _createClass(Timeline, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
              'table',
              { className: 'table table-bordered' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    null,
                    React.createElement(
                      'small',
                      null,
                      'Resource/Role'
                    )
                  ),
                  (function () {
                    return months(1, 18).map(function (i) {
                      return React.createElement(
                        'th',
                        null,
                        React.createElement(
                          'small',
                          null,
                          React.createElement(
                            'small',
                            null,
                            'Month ',
                            i
                          )
                        )
                      );
                    });
                  })()
                )
              ),
              React.createElement(
                'tbody',
                null,
                (function () {
                  return Array.from(resources).map(function (resource) {
                    return [React.createElement(
                      'tr',
                      null,
                      React.createElement(
                        'th',
                        { className: 'bg-warning' },
                        React.createElement(
                          'small',
                          null,
                          resource.name
                        )
                      ),
                      (function () {
                        return months(1, 18).map(function (m) {
                          return React.createElement('td', { className: 'bg-warning' });
                        });
                      })()
                    )].concat(Array.from(resource.projects).map(function (project) {
                      return resource.responsibilitiesFor(project).map(function (responsibility) {
                        return React.createElement(
                          'tr',
                          null,
                          React.createElement(
                            'td',
                            null,
                            React.createElement(
                              'small',
                              null,
                              React.createElement(
                                'small',
                                null,
                                React.createElement(
                                  'strong',
                                  null,
                                  project.name
                                ),
                                '-',
                                responsibility.involvement
                              )
                            )
                          ),
                          (function () {
                            return months(1, 18).map(function (m) {
                              if (responsibility.coversMonth(m)) {
                                return React.createElement('td', { style: responsibility.bgStyle() });
                              } else {
                                return React.createElement('td', null);
                              }
                            });
                          })()
                        );
                      });
                    }).reduce(function (nodes, childNodes) {
                      console.log(childNodes);
                      return nodes.concat(childNodes);
                    }, []));
                  });
                })()
              )
            )
          )
        );
      }
    }]);

    return Timeline;
  })(React.Component);

  return Timeline;
});
'use strict';

app('util.months', function () {
  var range = app('util.range');

  return function (monthStart, monthEnd) {
    if (monthEnd === undefined) {
      monthEnd = monthStart;
    }

    return range(monthStart, monthEnd + 1);
  };
});
'use strict';

app('util.range', function () {
  return function (start, cutoff) {
    if (cutoff === undefined) {
      cutoff = start;
      start = 0;
    }

    var range = [];
    for (var i = start; i < cutoff; i++) {
      range.push(i);
    }

    return range;
  };
});
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.timelines.All', function () {
  var All = (function (_React$Component) {
    _inherits(All, _React$Component);

    function All(props) {
      _classCallCheck(this, All);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(All).call(this, props));
    }

    _createClass(All, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "h2",
              null,
              "All Timelines"
            )
          )
        );
      }
    }]);

    return All;
  })(React.Component);

  return All;
});
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.timelines.AppBuilderPaaS', function () {
  var AppBuilderPaaS = (function (_React$Component) {
    _inherits(AppBuilderPaaS, _React$Component);

    function AppBuilderPaaS(props) {
      _classCallCheck(this, AppBuilderPaaS);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AppBuilderPaaS).call(this, props));
    }

    _createClass(AppBuilderPaaS, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "h2",
              null,
              "App Builder PaaS Timelines"
            )
          )
        );
      }
    }]);

    return AppBuilderPaaS;
  })(React.Component);

  return AppBuilderPaaS;
});
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.timelines.AppBuilderPlatform', function () {
  var AppBuilderPlatform = (function (_React$Component) {
    _inherits(AppBuilderPlatform, _React$Component);

    function AppBuilderPlatform(props) {
      _classCallCheck(this, AppBuilderPlatform);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AppBuilderPlatform).call(this, props));
    }

    _createClass(AppBuilderPlatform, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "h2",
              null,
              "App Builder Platform Timelines"
            )
          )
        );
      }
    }]);

    return AppBuilderPlatform;
  })(React.Component);

  return AppBuilderPlatform;
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

app('dom.timelines.FormApp', function () {
  var team = app('data.team');
  var range = app('util.range');

  var FormApp = (function (_React$Component) {
    _inherits(FormApp, _React$Component);

    function FormApp(props) {
      _classCallCheck(this, FormApp);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormApp).call(this, props));
    }

    _createClass(FormApp, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
              'table',
              { className: 'table table-bordered' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    null,
                    'Resource'
                  ),
                  (function () {
                    return range(1, 19).map(function (i) {
                      return React.createElement(
                        'th',
                        null,
                        React.createElement(
                          'small',
                          null,
                          'Month ',
                          i
                        )
                      );
                    });
                  })()
                )
              ),
              React.createElement(
                'tbody',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    null,
                    team.founder('kapil').name
                  )
                ),
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    null,
                    team.founder('vivek').name
                  )
                ),
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    null,
                    team.developer(1).name
                  )
                ),
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    null,
                    team.developer(2).name
                  )
                ),
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    null,
                    team.designer(1).name
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return FormApp;
  })(React.Component);

  return FormApp;
});
//# sourceMappingURL=app.built.js.map
