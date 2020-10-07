"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Builder = _interopRequireDefault(require("./Builder"));

var _StaticModel2 = _interopRequireDefault(require("./StaticModel"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Model = /*#__PURE__*/function (_StaticModel) {
  (0, _inherits2["default"])(Model, _StaticModel);

  var _super = _createSuper(Model);

  function Model() {
    var _this;

    (0, _classCallCheck2["default"])(this, Model);
    _this = _super.call(this);

    for (var _len = arguments.length, attributes = new Array(_len), _key = 0; _key < _len; _key++) {
      attributes[_key] = arguments[_key];
    }

    if (attributes.length === 0) {
      _this._builder = new _Builder["default"]((0, _assertThisInitialized2["default"])(_this));
    } else {
      Object.assign.apply(Object, [(0, _assertThisInitialized2["default"])(_this)].concat(attributes));
    }

    if (_this.baseURL === undefined) {
      throw new Error('You must declare baseURL() method.');
    }

    if (_this.request === undefined) {
      throw new Error('You must declare request() method.');
    }

    if (_this.$http === undefined) {
      throw new Error('You must set $http property');
    }

    return _this;
  }
  /**
   *  Setup
   */


  (0, _createClass2["default"])(Model, [{
    key: "resource",
    value: function resource() {
      return "".concat(this.constructor.name.toLowerCase(), "s");
    }
  }, {
    key: "primaryKey",
    value: function primaryKey() {
      return 'id';
    }
  }, {
    key: "getPrimaryKey",
    value: function getPrimaryKey() {
      return this[this.primaryKey()];
    }
  }, {
    key: "custom",
    value: function custom() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) {
        throw new Error('The custom() method takes a minimum of one argument.');
      } // It would be unintuitive for users to manage where the '/' has to be for
      // multiple arguments. We don't need it for the first argument if it's
      // a string, but subsequent string arguments need the '/' at the beginning.
      // We handle this implementation detail here to simplify the readme.


      var slash = '';
      var resource = '';
      args.forEach(function (value) {
        switch (true) {
          case typeof value === 'string':
            resource += slash + value.replace(/^\/+/, '');
            break;

          case value instanceof Model:
            resource += slash + value.resource();

            if (value.isValidId(value.getPrimaryKey())) {
              resource += '/' + value.getPrimaryKey();
            }

            break;

          default:
            throw new Error('Arguments to custom() must be strings or instances of Model.');
        }

        if (!slash.length) {
          slash = '/';
        }
      });
      this._customResource = resource;
      return this;
    }
  }, {
    key: "hasMany",
    value: function hasMany(model) {
      var instance = new model();
      var url = "".concat(this.baseURL(), "/").concat(this.resource(), "/").concat(this.getPrimaryKey(), "/").concat(instance.resource());

      instance._from(url);

      return instance;
    }
  }, {
    key: "_from",
    value: function _from(url) {
      Object.defineProperty(this, '_fromResource', {
        get: function get() {
          return url;
        }
      });
    }
  }, {
    key: "for",
    value: function _for() {
      var _this2 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) {
        throw new Error('The for() method takes a minimum of one argument.');
      }

      var url = "".concat(this.baseURL());
      args.forEach(function (object) {
        if (object instanceof Model === false) {
          throw new Error('The object referenced on for() method is not a valid Model.');
        }

        if (!_this2.isValidId(object.getPrimaryKey())) {
          throw new Error('The object referenced on for() method has a invalid id.');
        }

        url += "/".concat(object.resource(), "/").concat(object.getPrimaryKey());
      });
      url += "/".concat(this.resource());

      this._from(url);

      return this;
    }
  }, {
    key: "relations",
    value: function relations() {
      return {};
    }
    /**
     * Helpers
     */

  }, {
    key: "hasId",
    value: function hasId() {
      var id = this.getPrimaryKey();
      return this.isValidId(id);
    }
  }, {
    key: "isValidId",
    value: function isValidId(id) {
      return id !== undefined && id !== 0 && id !== '';
    }
  }, {
    key: "endpoint",
    value: function endpoint() {
      if (this._fromResource) {
        if (this.hasId()) {
          return "".concat(this._fromResource, "/").concat(this.getPrimaryKey());
        } else {
          return this._fromResource;
        }
      }

      if (this.hasId()) {
        return "".concat(this.baseURL(), "/").concat(this.resource(), "/").concat(this.getPrimaryKey());
      } else {
        return "".concat(this.baseURL(), "/").concat(this.resource());
      }
    }
  }, {
    key: "parameterNames",
    value: function parameterNames() {
      return {
        include: 'include',
        filter: 'filter',
        sort: 'sort',
        fields: 'fields',
        append: 'append',
        page: 'page',
        limit: 'limit'
      };
    }
    /**
     *  Query
     */

  }, {
    key: "include",
    value: function include() {
      var _this$_builder;

      (_this$_builder = this._builder).include.apply(_this$_builder, arguments);

      return this;
    }
  }, {
    key: "append",
    value: function append() {
      var _this$_builder2;

      (_this$_builder2 = this._builder).append.apply(_this$_builder2, arguments);

      return this;
    }
  }, {
    key: "select",
    value: function select() {
      var _this$_builder3;

      (_this$_builder3 = this._builder).select.apply(_this$_builder3, arguments);

      return this;
    }
  }, {
    key: "where",
    value: function where(field, value) {
      this._builder.where(field, value);

      return this;
    }
  }, {
    key: "whereIn",
    value: function whereIn(field, array) {
      this._builder.whereIn(field, array);

      return this;
    }
  }, {
    key: "orderBy",
    value: function orderBy() {
      var _this$_builder4;

      (_this$_builder4 = this._builder).orderBy.apply(_this$_builder4, arguments);

      return this;
    }
  }, {
    key: "page",
    value: function page(value) {
      this._builder.page(value);

      return this;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      this._builder.limit(value);

      return this;
    }
  }, {
    key: "params",
    value: function params(payload) {
      this._builder.params(payload);

      return this;
    }
    /**
     * Result
     */

  }, {
    key: "_applyInstance",
    value: function _applyInstance(data) {
      var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor;
      var item = new model(data);

      if (this._fromResource) {
        item._from(this._fromResource);
      }

      this._applyRelations(item);

      return item;
    }
  }, {
    key: "_applyInstanceCollection",
    value: function _applyInstanceCollection(data) {
      var _this3 = this;

      var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor;
      var collection = data.data || data;
      collection = Array.isArray(collection) ? collection : [collection];
      collection = collection.map(function (c) {
        return _this3._applyInstance(c, model);
      });
      return collection;
    }
  }, {
    key: "_applyRelations",
    value: function _applyRelations(model) {
      var relations = model.relations();

      for (var _i = 0, _Object$keys = Object.keys(relations); _i < _Object$keys.length; _i++) {
        var relation = _Object$keys[_i];

        if (!model[relation]) {
          return;
        }

        if (Array.isArray(model[relation].data) || Array.isArray(model[relation])) {
          var collection = this._applyInstanceCollection(model[relation], relations[relation]);

          if (model[relation].data !== undefined) {
            model[relation].data = collection;
          } else {
            model[relation] = collection;
          }
        } else {
          model[relation] = this._applyInstance(model[relation], relations[relation]);
        }
      }
    }
  }, {
    key: "first",
    value: function first() {
      return this.get().then(function (response) {
        var item;

        if (response.data) {
          item = response.data[0];
        } else {
          item = response[0];
        }

        return item || {};
      });
    }
  }, {
    key: "$first",
    value: function $first() {
      return this.first().then(function (response) {
        return response.data || response;
      });
    }
  }, {
    key: "find",
    value: function find(identifier) {
      var _this4 = this;

      if (identifier === undefined) {
        throw new Error('You must specify the param on find() method.');
      }

      var base = this._fromResource || "".concat(this.baseURL(), "/").concat(this.resource());
      var url = "".concat(base, "/").concat(identifier).concat(this._builder.query());
      return this.request({
        url: url,
        method: 'GET'
      }).then(function (response) {
        return _this4._applyInstance(response.data);
      });
    }
  }, {
    key: "$find",
    value: function $find(identifier) {
      var _this5 = this;

      if (identifier === undefined) {
        throw new Error('You must specify the param on $find() method.');
      }

      return this.find(identifier).then(function (response) {
        return _this5._applyInstance(response.data || response);
      });
    }
  }, {
    key: "get",
    value: function get() {
      var _this6 = this;

      var base = this._fromResource || "".concat(this.baseURL(), "/").concat(this.resource());
      base = this._customResource ? "".concat(this.baseURL(), "/").concat(this._customResource) : base;
      var url = "".concat(base).concat(this._builder.query());
      return this.request({
        url: url,
        method: 'GET'
      }).then(function (response) {
        var collection = _this6._applyInstanceCollection(response.data);

        if (response.data.data !== undefined) {
          response.data.data = collection;
        } else {
          response.data = collection;
        }

        return response.data;
      });
    }
  }, {
    key: "$get",
    value: function $get() {
      return this.get().then(function (response) {
        return response.data || response;
      });
    }
    /**
     * Common CRUD operations
     */

  }, {
    key: "delete",
    value: function _delete() {
      if (!this.hasId()) {
        throw new Error('This model has a empty ID.');
      }

      return this.request({
        url: this.endpoint(),
        method: 'DELETE'
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "save",
    value: function save() {
      return this.hasId() ? this._update() : this._create();
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this7 = this;

      return this.request({
        method: 'POST',
        url: this.endpoint(),
        data: this
      }).then(function (response) {
        return _this7._applyInstance(response.data);
      });
    }
  }, {
    key: "_update",
    value: function _update() {
      var _this8 = this;

      return this.request({
        method: 'PUT',
        url: this.endpoint(),
        data: this
      }).then(function (response) {
        return _this8._applyInstance(response.data);
      });
    }
    /**
     * Relationship operations
     */

  }, {
    key: "attach",
    value: function attach(params) {
      return this.request({
        method: 'POST',
        url: this.endpoint(),
        data: params
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "sync",
    value: function sync(params) {
      return this.request({
        method: 'PUT',
        url: this.endpoint(),
        data: params
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "$http",
    get: function get() {
      return Model.$http;
    }
  }]);
  return Model;
}(_StaticModel2["default"]);

exports["default"] = Model;