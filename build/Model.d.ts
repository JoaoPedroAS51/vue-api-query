import StaticModel from './StaticModel';
import type { DomainModel, HTTPPromise, HTTPRequestConfig, QueryResponseCollection, QueryResponseModel, TCollection, TModel, WrappedCollection, WrappedModel } from './types';
declare type Constructor<T extends Model<boolean, boolean>> = new (...args: unknown[]) => T;
export default abstract class Model<isWrappedCollection extends boolean = false, isWrappedModel extends boolean = false> extends StaticModel {
    static $http: unknown;
    private readonly _builder?;
    private _fromResource?;
    private _customResource?;
    constructor(...attributes: unknown[]);
    /**
     *  Setup
     */
    abstract baseURL(): string;
    abstract request<T = any>(config: HTTPRequestConfig): HTTPPromise<T>;
    get $http(): unknown;
    resource(): string;
    primaryKey(): string;
    getPrimaryKey(): string | number;
    custom(...args: unknown[]): this;
    hasMany<T extends Model<boolean, boolean>>(model: Constructor<T>): T;
    _from(url: string): void;
    for(...args: unknown[]): this;
    relations(): Record<string, InstanceType<typeof Model>>;
    /**
     * Helpers
     */
    hasId(): boolean;
    isValidId(id: number | string): boolean;
    endpoint(): string;
    parameterNames(): {
        include: string;
        filter: string;
        sort: string;
        fields: string;
        append: string;
        page: string;
        limit: string;
    };
    isWrappedModel<T extends Model<boolean, boolean>>(model: TModel<T>): model is WrappedModel<T>;
    isWrappedCollection<T extends Model<boolean, boolean>>(collection: TCollection<T>): collection is WrappedCollection<T>;
    /**
     *  Query
     */
    include(...args: unknown[]): this;
    append(...args: unknown[]): this;
    select(...fields: (string | {
        [p: string]: string[];
    })[]): this;
    where(field: string, value: unknown): this;
    whereIn(field: string, array: unknown[]): this;
    orderBy(...args: unknown[]): this;
    page(value: number): this;
    limit(value: number): this;
    params(payload: Record<string, unknown>): this;
    /**
     * Result
     */
    _applyInstance<T extends Model<boolean, boolean>>(data: Record<string, any>, model?: Constructor<T>): DomainModel<T>;
    _applyInstanceCollection<T extends Model<boolean, boolean>>(data: Record<string, any> | Record<string, any>[], model?: Constructor<T>): TModel<T>[];
    _applyRelations(model: this): void;
    first(): Promise<QueryResponseModel<this, isWrappedModel>>;
    $first(): Promise<DomainModel<this>>;
    find(identifier: number | string): Promise<QueryResponseModel<this, isWrappedModel>>;
    $find(identifier: number | string): Promise<DomainModel<this>>;
    get(): Promise<QueryResponseCollection<this, isWrappedCollection, isWrappedModel>>;
    $get(): Promise<QueryResponseModel<this, isWrappedModel>[]>;
    /**
     * Common CRUD operations
     */
    delete(): HTTPPromise<unknown>;
    save(): Promise<QueryResponseModel<this, isWrappedModel>>;
    _create(): Promise<QueryResponseModel<this, isWrappedModel>>;
    _update(): Promise<QueryResponseModel<this, isWrappedModel>>;
    /**
     * Relationship operations
     */
    attach(params: unknown): HTTPPromise<unknown>;
    sync(params: unknown): HTTPPromise<unknown>;
}
export {};
