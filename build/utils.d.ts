/**
 * Get property defined by dot notation in string.
 * Based on  https://github.com/dy/dotprop (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
import Model from './Model';
export declare function getProp(holder: Record<string, any>, propName: string): Record<string, any>;
/**
 * Set property defined by dot notation in string.
 * Based on https://github.com/lukeed/dset (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @param  {*}      value    The value to be set
 */
export declare function setProp(holder: Record<string, any>, propName: string, value: unknown): void;
declare type ThisClass<InstanceType extends Model<boolean, boolean>> = {
    new (...args: unknown[]): InstanceType;
};
export declare function hasProperty<T extends Model<boolean, boolean>>(obj: T, key: string): key is keyof ThisClass<T>;
export {};
