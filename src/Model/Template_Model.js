import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed, // Can store any type of object
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TemplateUsed ||
  mongoose.model("TemplateUsed", templateSchema);
