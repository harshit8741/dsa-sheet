import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], required: true },
});

export default mongoose.model('Topic', topicSchema);
