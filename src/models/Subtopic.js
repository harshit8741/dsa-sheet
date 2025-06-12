import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leetCodeLink: String,
  youtubeLink: String,
  articleLink: String,
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }
});

export default mongoose.model('Subtopic', subtopicSchema);
