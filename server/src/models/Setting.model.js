import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    companyPhone: {
      type: String,
      default: "+20 2 2840 9000",
      trim: true,
    },
    companyWhatsapp: {
      type: String,
      default: "+20 100 000 0000",
      trim: true,
    },
    companyEmail: {
      type: String,
      default: "info@pharaohsfuture.com",
      trim: true,
      lowercase: true,
    },
    companyAddress: {
      type: String,
      default: "أسوان الجديدة - الحي الثاني (المقر الرئيسي)",
      trim: true,
    },
    googleMapsUrl: {
      type: String,
      default: "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
      trim: true,
    },
    workingHours: {
      type: String,
      default: "السبت – الخميس: 9:00 ص – 9:00 م",
      trim: true,
    },
    homeFeaturedProjectsCount: {
      type: Number,
      default: 3,
      min: 1,
      max: 12,
    },
    facebookUrl: {
      type: String,
      default: "",
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: "",
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
