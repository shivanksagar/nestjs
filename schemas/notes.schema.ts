import { Prop, Schema, SchemaFactory }  from '@nestjs/mongoose';
import { Document }                     from 'mongoose';
import { User }                         from './user.schema';
import * as mongoose                    from 'mongoose';

@Schema()
export class Note extends Document {
    @Prop()
    title: string;  

    @Prop()
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.index({ title: 'text', content: 'text' }); 
export { NoteSchema }; // Exporting as a named export