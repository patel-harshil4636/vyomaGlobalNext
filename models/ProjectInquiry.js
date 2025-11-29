// models/ProjectInquiry.js
import mongoose from "mongoose";

const ProjectInquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      required: true,
      trim: true,
    },
    projectDetails: {
      type: String,
      required: true,
      trim: true,
    },
    // frontend sends: "yes" / "no"
    consent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProjectInquiry ||
  mongoose.model("ProjectInquiry", ProjectInquirySchema);
