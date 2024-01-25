import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const urlSchema = new Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Url || mongoose.model("Url", urlSchema);
