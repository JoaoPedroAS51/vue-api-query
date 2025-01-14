---
title: CRUD Operations
description: 'CRUD Operations.'
position: 8
category: API
---

## `save`
- Returns: `Model | { data: Model }`

Save or update a model in the database, then return the instance.

### create

<code-group>
  <code-block Label="Query 1" active>

  ```js
  const model = new Model({ foo: 'bar' })

  model.save()
  ```

  </code-block>
  <code-block Label="Query 2">

  ```js
  const model = new Model()

  model.foo = 'bar'
  
  model.save()
  ```

  </code-block>
  <code-block Label="Request">

  ```http request
  POST /resource
  ```

  </code-block>
</code-group>

### update

<code-group>
  <code-block Label="Query" active>

  ```js
  const model = await Model.find(1)
  
  model.foo = 'bar'
  
  model.save()
  ```

  </code-block>
  <code-block Label="Request">

  ```http request
  PUT /resource/1
  ```

  </code-block>
</code-group>


## `delete`

Delete the model from the database.

<code-group>
  <code-block Label="Query" active>

  ```js
  const model = await Model.find(1)
  
  model.delete()
  ```

  </code-block>
  <code-block Label="Find Request">

  ```http request
  GET /resource/1
  ```

  </code-block>
  <code-block Label="Delete Request">

  ```http request
  DELETE /resource/1
  ```

  </code-block>
</code-group>
