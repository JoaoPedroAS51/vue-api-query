import Builder from './Builder';
import StaticModel from './StaticModel';
import { getProp, hasProperty, setProp } from './utils';
export default class Model extends StaticModel {
    constructor(...attributes) {
        super();
        if (attributes.length === 0) {
            this._builder = new Builder(this);
        }
        else {
            Object.assign(this, ...attributes);
            this._applyRelations(this);
        }
        if (this.baseURL === undefined) {
            throw new Error('You must declare baseURL() method.');
        }
        if (this.request === undefined) {
            throw new Error('You must declare request() method.');
        }
        if (this.$http === undefined) {
            throw new Error('You must set $http property.');
        }
    }
    get $http() {
        return Model.$http;
    }
    resource() {
        return `${this.constructor.name.toLowerCase()}s`;
    }
    primaryKey() {
        return 'id';
    }
    getPrimaryKey() {
        const key = this.primaryKey();
        return hasProperty(this, key) ? this[key] : '';
    }
    custom(...args) {
        if (args.length === 0) {
            throw new Error('The custom() method takes a minimum of one argument.');
        }
        // It would be unintuitive for users to manage where the '/' has to be for
        // multiple arguments. We don't need it for the first argument if it's
        // a string, but subsequent string arguments need the '/' at the beginning.
        // We handle this implementation detail here to simplify the readme.
        let slash = '';
        let resource = '';
        args.forEach((value) => {
            if (typeof value === 'string') {
                resource += slash + value.replace(/^\/+/, '');
            }
            else if (value instanceof Model) {
                resource += slash + value.resource();
                if (value.isValidId(value.getPrimaryKey())) {
                    resource += '/' + value.getPrimaryKey();
                }
            }
            else {
                throw new Error('Arguments to custom() must be strings or instances of Model.');
            }
            if (!slash.length) {
                slash = '/';
            }
        });
        this._customResource = resource;
        return this;
    }
    hasMany(model) {
        const instance = new model();
        const url = `${this.baseURL()}/${this.resource()}/${this.getPrimaryKey()}/${instance.resource()}`;
        instance._from(url);
        return instance;
    }
    _from(url) {
        Object.defineProperty(this, '_fromResource', { get: () => url });
    }
    for(...args) {
        if (args.length === 0) {
            throw new Error('The for() method takes a minimum of one argument.');
        }
        let url = `${this.baseURL()}`;
        args.forEach((object) => {
            if (!(object instanceof Model)) {
                throw new Error('The object referenced on for() method is not a valid Model.');
            }
            if (!this.isValidId(object.getPrimaryKey())) {
                throw new Error('The object referenced on for() method has a invalid id.');
            }
            url += `/${object.resource()}/${object.getPrimaryKey()}`;
        });
        url += `/${this.resource()}`;
        this._from(url);
        return this;
    }
    // @ts-ignore
    relations() {
        return {};
    }
    /**
     * Helpers
     */
    hasId() {
        const id = this.getPrimaryKey();
        return this.isValidId(id);
    }
    isValidId(id) {
        return !!id;
    }
    endpoint() {
        if (this._fromResource) {
            if (this.hasId()) {
                return `${this._fromResource}/${this.getPrimaryKey()}`;
            }
            else {
                return this._fromResource;
            }
        }
        if (this.hasId()) {
            return `${this.baseURL()}/${this.resource()}/${this.getPrimaryKey()}`;
        }
        else {
            return `${this.baseURL()}/${this.resource()}`;
        }
    }
    parameterNames() {
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
    isWrappedModel(model) {
        return 'data' in model;
    }
    isWrappedCollection(collection) {
        return !Array.isArray(collection) && 'data' in collection;
    }
    /**
     *  Query
     */
    include(...args) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.include(...args);
        return this;
    }
    append(...args) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.append(...args);
        return this;
    }
    select(...fields) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.select(...fields);
        return this;
    }
    where(field, value) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.where(field, value);
        return this;
    }
    whereIn(field, array) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.whereIn(field, array);
        return this;
    }
    orderBy(...args) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.orderBy(...args);
        return this;
    }
    page(value) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.page(value);
        return this;
    }
    limit(value) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.limit(value);
        return this;
    }
    params(payload) {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        this._builder.params(payload);
        return this;
    }
    /**
     * Result
     */
    _applyInstance(data, model = this.constructor) {
        const item = new model(data);
        if (this._fromResource) {
            item._from(this._fromResource);
        }
        return item;
    }
    _applyInstanceCollection(data, model = this.constructor) {
        let collection = !Array.isArray(data) && 'data' in data ? data.data : data;
        collection = Array.isArray(collection) ? collection : [collection];
        return collection.map((c) => {
            if ('data' in c) {
                return { data: this._applyInstance(c.data, model) };
            }
            else {
                return this._applyInstance(c, model);
            }
        });
    }
    _applyRelations(model) {
        const relations = model.relations();
        for (const key of Object.keys(relations)) {
            const relation = getProp(model, key);
            if (!hasProperty(model, key) || !relation) {
                return;
            }
            if (Array.isArray(relation) ||
                ('data' in relation && Array.isArray(relation.data))) {
                const collection = this._applyInstanceCollection(relation, relations[key]);
                if ('data' in relation) {
                    setProp(model, key + '.data', collection);
                }
                else {
                    setProp(model, key, collection);
                }
            }
            else {
                setProp(model, key, this._applyInstance(relation, relations[key]));
            }
        }
    }
    first() {
        return this.get().then((response) => {
            const collection = response;
            let model;
            if (this.isWrappedCollection(collection)) {
                model = collection.data[0];
            }
            else {
                model = collection[0];
            }
            return (model || {});
        });
    }
    $first() {
        return this.first().then((response) => {
            let model = response;
            if (this.isWrappedModel(model)) {
                model = model.data;
            }
            return model;
        });
    }
    find(identifier) {
        if (identifier === undefined) {
            throw new Error('You must specify the param on find() method.');
        }
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        const base = this._fromResource || `${this.baseURL()}/${this.resource()}`;
        const url = `${base}/${identifier}${this._builder.query()}`;
        return this.request({
            url,
            method: 'GET'
        }).then((response) => {
            let model = response.data;
            if (this.isWrappedModel(model)) {
                model.data = this._applyInstance(model.data);
            }
            else {
                model = this._applyInstance(model);
            }
            return model;
        });
    }
    $find(identifier) {
        if (identifier === undefined) {
            throw new Error('You must specify the param on $find() method.');
        }
        return this.find(identifier).then((response) => {
            let model = response;
            if (this.isWrappedModel(model)) {
                model = model.data;
            }
            return model;
        });
    }
    get() {
        if (!this._builder) {
            throw new Error('Builder methods are not available after fetching data.');
        }
        let base = this._fromResource || `${this.baseURL()}/${this.resource()}`;
        base = this._customResource
            ? `${this.baseURL()}/${this._customResource}`
            : base;
        const url = `${base}${this._builder.query()}`;
        return this.request({
            url,
            method: 'GET'
        }).then((response) => {
            let collection = response.data;
            const instancedCollection = this._applyInstanceCollection(collection);
            if (this.isWrappedCollection(collection)) {
                collection.data = instancedCollection;
            }
            else {
                collection = instancedCollection;
            }
            return collection;
        });
    }
    $get() {
        return this.get().then((response) => {
            let collection = response;
            if (this.isWrappedCollection(collection)) {
                collection = collection.data;
            }
            return collection;
        });
    }
    /**
     * Common CRUD operations
     */
    delete() {
        if (!this.hasId()) {
            throw new Error('This model has a empty ID.');
        }
        return this.request({
            url: this.endpoint(),
            method: 'DELETE'
        }).then((response) => response);
    }
    save() {
        return this.hasId() ? this._update() : this._create();
    }
    _create() {
        return this.request({
            method: 'POST',
            url: this.endpoint(),
            data: this
        }).then((response) => {
            let model = response.data;
            if (this.isWrappedModel(model)) {
                model.data = this._applyInstance(model.data);
            }
            else {
                model = this._applyInstance(model);
            }
            return model;
        });
    }
    _update() {
        return this.request({
            method: 'PUT',
            url: this.endpoint(),
            data: this
        }).then((response) => {
            let model = response.data;
            if (this.isWrappedModel(model)) {
                model.data = this._applyInstance(model.data);
            }
            else {
                model = this._applyInstance(model);
            }
            return model;
        });
    }
    /**
     * Relationship operations
     */
    attach(params) {
        return this.request({
            method: 'POST',
            url: this.endpoint(),
            data: params
        }).then((response) => response);
    }
    sync(params) {
        return this.request({
            method: 'PUT',
            url: this.endpoint(),
            data: params
        }).then((response) => response);
    }
}
