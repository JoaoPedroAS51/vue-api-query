/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import BaseModel from './BaseModel'
import Post from './Post'

export default class User extends BaseModel<false, false> {
  public id?: number
  public firstname?: string
  public lastname?: string
  public age?: number

  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  posts() {
    return this.hasMany(Post)
  }
}
