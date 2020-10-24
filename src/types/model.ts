import Model from '../Model'

/**
 * Domain Model
 *
 * Methods using this type as response: `$first` and `$find`
 *
 * The domain model type only returns the properties and methods that belongs to the domain model,
 * with the addition of model operators. All other methods from the base model are stripped from this type.
 */

type ModelOperations = 'delete' | 'save' | 'attach' | 'sync' | 'for'

export type DomainModel<T extends Model<boolean, boolean>> = Required<
  Omit<T, keyof Omit<Model, ModelOperations>>
>

/**
 * Model and Collection Types
 *
 * Query Builder methods using these types: `first`, `find`, `get`, `$get` and `save` (`_create` and `_update`)
 *
 * These types should be used internally for type checking. They are Union types.
 * The type guards `isWrappedModel` and `isWrappedCollection` in Model class can be used to predict the type.
 * They shouldn't be used for response. They must be converted to the Conditional Types.
 *
 * TModel as QueryResponseModel
 * TCollection as QueryResponseCollection
 *
 */

export type WrappedModel<T extends Model<boolean, boolean>> = {
  data: DomainModel<T>
}

export type TModel<T extends Model<boolean, boolean>> =
  | DomainModel<T>
  | WrappedModel<T>

export type WrappedCollection<T extends Model<boolean, boolean>> = {
  data: TModel<T>[]
}

export type TCollection<T extends Model<boolean, boolean>> =
  | WrappedCollection<T>
  | TModel<T>[]

/**
 * Model and Collection Response Types
 *
 * Query Builder methods using these types as response: `first`, `find`, `get`, `$get` and `save` (`_create` and `_update`)
 *
 * These are types used for responses. Different from the types above, these are Conditional Types.
 * They use the arguments of the Model class (Generic Class) to define if the collection and the model
 * are wrapped in "data" property.
 *
 * These types can't be used internally for type checking, only for responses.
 * When using methods that returns these types internally, they must be converted to Union Types.
 *
 * QueryResponseModel as TModel
 * QueryResponseCollection as TCollection
 *
 * C = Is Wrapped Collection?
 * M = Is Wrapped Model?
 *
 */

export type QueryResponseModel<
  T extends Model<boolean, boolean>,
  M
> = M extends true ? WrappedModel<T> : DomainModel<T>

export type QueryResponseCollection<
  T extends Model<boolean, boolean>,
  C,
  M
> = C extends true
  ? { data: QueryResponseModel<T, M>[] }
  : QueryResponseModel<T, M>[]
