import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
