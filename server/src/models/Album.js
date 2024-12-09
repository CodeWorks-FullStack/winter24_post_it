import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    // NOTE _id/id is generated by database
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    title: { type: String, minLength: 3, maxLength: 25, required: true },
    description: { type: String, minLength: 15, maxLength: 250 },
    coverImg: { type: String, maxLength: 2000, required: true },
    archived: { type: Boolean, required: true },
    category: { type: String, enum: ['aesthetics', 'food', 'games', 'animals', 'vibes', 'misc'], required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)