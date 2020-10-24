/**
 * Get property defined by dot notation in string.
 * Based on  https://github.com/dy/dotprop (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
import Model from './Model'

export function getProp(
  holder: Record<string, any>,
  propName: string
): Record<string, any> {
  if (!propName || !holder) {
    return holder || {}
  }

  if (propName in holder) {
    return holder[propName]
  }

  const propParts = Array.isArray(propName)
    ? propName
    : (propName + '').split('.')

  let result = holder
  while (propParts.length && result) {
    result = result[propParts.shift()]
  }

  return result
}

/**
 * Set property defined by dot notation in string.
 * Based on https://github.com/lukeed/dset (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @param  {*}      value    The value to be set
 */
export function setProp(
  holder: Record<string, any>,
  propName: string,
  value: unknown
): void {
  const propParts = Array.isArray(propName)
    ? propName
    : (propName + '').split('.')
  const l = propParts.length
  let i = 0,
    t = holder,
    x

  for (; i < l; ++i) {
    x = t[propParts[i]]
    t = t[propParts[i]] =
      i === l - 1
        ? value
        : x != null
        ? x
        : !!~propParts[i + 1].indexOf('.') || !(+propParts[i + 1] > -1)
        ? {}
        : []
  }
}

type ThisClass<InstanceType extends Model<boolean, boolean>> = {
  new (...args: unknown[]): InstanceType
}

export function hasProperty<T extends Model<boolean, boolean>>(
  obj: T,
  key: string
): key is keyof ThisClass<T> {
  return !!getProp(obj, key)
}