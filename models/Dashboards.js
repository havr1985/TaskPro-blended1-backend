import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

const dashboardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for dashboard"],
    },
    icon: {
      type: String,
      default: "",
    },
    backgroundURL: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true, strictPopulate: false }
);

export const dashboardAddSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string(),
  background: Joi.string(),
});

dashboardSchema.pre("findOneAndUpdate", runValidateAtUpdate);
dashboardSchema.post("save", handleSaveError);
dashboardSchema.post("findOneAndUpdate", handleSaveError);

const Dashboard = model("dashboard", dashboardSchema);
export default Dashboard;