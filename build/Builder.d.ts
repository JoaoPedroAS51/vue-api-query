/**
 * Prepare attributes to be parsed
 */
import Model from './Model';
import Parser from './Parser';
export default class Builder {
    model: Model<boolean, boolean>;
    includes: unknown[];
    appends: unknown[];
    sorts: unknown[];
    pageValue: number | null;
    limitValue: number | null;
    payload: Record<string, unknown> | null;
    fields: Record<string, unknown>;
    filters: Record<string, unknown>;
    parser: Parser;
    constructor(model: Model<boolean, boolean>);
    query(): string;
    /**
     * Query builder
     */
    include(...args: unknown[]): this;
    append(...args: unknown[]): this;
    select(...fields: (string | {
        [p: string]: string[];
    })[]): this;
    where(key: string, value: unknown): this;
    whereIn(key: string, array: unknown[]): this;
    orderBy(...args: unknown[]): this;
    page(value: number): this;
    limit(value: number): this;
    params(payload: Record<string, unknown>): this;
}
