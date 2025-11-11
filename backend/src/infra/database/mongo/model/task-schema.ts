import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["LOW", "HIGH"],
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  completedBy: {
    type: String,
  },
  groupId: {
    type: String,
    required: true,
  },
});

taskSchema.index({ groupId: 1, status: 1 });

export const Task = model("Task", taskSchema);
