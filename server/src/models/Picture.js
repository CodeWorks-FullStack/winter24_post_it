import { Schema } from "mongoose";

export const PictureSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    albumId: { type: Schema.ObjectId, required: true, ref: 'Album' },
    imgUrl: { type: String, required: true, maxLength: 2000 }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})