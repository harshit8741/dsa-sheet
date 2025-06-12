import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subtopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic', required: true },
  isDone: { type: Boolean, default: false },
});

progressSchema.index({ userId: 1, subtopicId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
