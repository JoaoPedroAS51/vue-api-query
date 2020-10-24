export default class StaticModel {
    static instance() {
        return new this();
    }
    static include(...args) {
        const self = this.instance();
        self.include(...args);
        return self;
    }
    static append(...args) {
        const self = this.instance();
        self.append(...args);
        return self;
    }
    static select(...fields) {
        const self = this.instance();
        self.select(...fields);
        return self;
    }
    static where(field, value) {
        const self = this.instance();
        self.where(field, value);
        return self;
    }
    static whereIn(field, array) {
        const self = this.instance();
        self.whereIn(field, array);
        return self;
    }
    static orderBy(...args) {
        const self = this.instance();
        self.orderBy(...args);
        return self;
    }
    static page(value) {
        const self = this.instance();
        self.page(value);
        return self;
    }
    static limit(value) {
        const self = this.instance();
        self.limit(value);
        return self;
    }
    static custom(...args) {
        const self = this.instance();
        self.custom(...args);
        return self;
    }
    static params(payload) {
        const self = this.instance();
        self.params(payload);
        return self;
    }
    static first() {
        const self = this.instance();
        return self.first();
    }
    static $first() {
        const self = this.instance();
        return self.$first();
    }
    static find(identifier) {
        const self = this.instance();
        return self.find(identifier);
    }
    static $find(identifier) {
        const self = this.instance();
        return self.$find(identifier);
    }
    static get() {
        const self = this.instance();
        return self.get();
    }
    static $get() {
        const self = this.instance();
        return self.$get();
    }
}
