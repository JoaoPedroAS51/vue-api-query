/**
 * Parse attributes from Builder into query string
 */
import Builder from './Builder';
export default class Parser {
    private builder;
    private uri;
    constructor(builder: Builder);
    query(): string;
    reset(): void;
    /**
     * Helpers
     */
    hasIncludes(): boolean;
    hasAppends(): boolean;
    hasFields(): boolean;
    hasFilters(): boolean;
    hasSorts(): boolean;
    hasPage(): boolean;
    hasLimit(): boolean;
    hasPayload(): boolean;
    prepend(): string;
    parameterNames(): {
        include: string;
        filter: string;
        sort: string;
        fields: string;
        append: string;
        page: string;
        limit: string;
    };
    /**
     * Parsers
     */
    includes(): void;
    appends(): void;
    fields(): void;
    filters(): void;
    sorts(): void;
    page(): void;
    limit(): void;
    payload(): void;
}
