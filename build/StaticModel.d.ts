import Model from './Model';
import { DomainModel, QueryResponseCollection, QueryResponseModel } from './types';
declare type ThisClass<InstanceType extends Model<boolean, boolean>> = {
    instance<T extends Model<boolean, boolean>>(this: ThisClass<T>): T;
    new (...args: unknown[]): InstanceType;
};
export default abstract class StaticModel {
    static instance<T extends Model<boolean, boolean>>(this: ThisClass<T>): T;
    static include<T extends Model<boolean, boolean>>(this: ThisClass<T>, ...args: unknown[]): T;
    static append<T extends Model<boolean, boolean>>(this: ThisClass<T>, ...args: unknown[]): T;
    static select<T extends Model<boolean, boolean>>(this: ThisClass<T>, ...fields: (string | {
        [p: string]: string[];
    })[]): T;
    static where<T extends Model<boolean, boolean>>(this: ThisClass<T>, field: string, value: unknown): T;
    static whereIn<T extends Model<boolean, boolean>>(this: ThisClass<T>, field: string, array: unknown[]): T;
    static orderBy<T extends Model<boolean, boolean>>(this: ThisClass<T>, ...args: unknown[]): T;
    static page<T extends Model<boolean, boolean>>(this: ThisClass<T>, value: number): T;
    static limit<T extends Model<boolean, boolean>>(this: ThisClass<T>, value: number): T;
    static custom<T extends Model<boolean, boolean>>(this: ThisClass<T>, ...args: unknown[]): T;
    static params<T extends Model<boolean, boolean>>(this: ThisClass<T>, payload: Record<string, unknown>): T;
    static first<T extends Model<boolean, boolean>>(this: ThisClass<T>): Promise<QueryResponseModel<T, boolean>>;
    static $first<T extends Model<boolean, boolean>>(this: ThisClass<T>): Promise<DomainModel<T>>;
    static find<T extends Model<boolean, boolean>>(this: ThisClass<T>, identifier: number | string): Promise<QueryResponseModel<T, boolean>>;
    static $find<T extends Model<boolean, boolean>>(this: ThisClass<T>, identifier: number | string): Promise<DomainModel<T>>;
    static get<T extends Model<boolean, boolean>>(this: ThisClass<T>): Promise<QueryResponseCollection<T, boolean, boolean>>;
    static $get<T extends Model<boolean, boolean>>(this: ThisClass<T>): Promise<QueryResponseModel<T, boolean>[]>;
}
export {};
