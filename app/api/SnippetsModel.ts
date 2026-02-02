import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISnippet extends Document {
    snippet: string;
    timestamp: Date;
}

const snippetSchema = new Schema<ISnippet>({
    snippet: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const SnippetModel = (mongoose.models.Snippet as Model<ISnippet>) || mongoose.model<ISnippet>('Snippet', snippetSchema);

export default SnippetModel;