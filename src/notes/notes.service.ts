import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../../schemas/notes.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private nModel: Model<Note>) {}
  create(createNoteDto: CreateNoteDto) {
    return this.nModel.create(createNoteDto);
  }

  findAll() {
    return  this.nModel.find();
  }

  findOne(id: string) {
    return  this.nModel.findById(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.nModel.findByIdAndUpdate(id, updateNoteDto);
  }

  remove(id: string) {
    return this.nModel.findByIdAndDelete(id);
  }


  search(keyword: string) {
    return this.nModel.find({ $text: { $search: keyword } });
  }

  async paginate(options: { limit: number; pageNumber: number }) {
    const { limit, pageNumber } = options;
    const skip = (pageNumber - 1) * limit;
  
    const aggregationPipeline = [
      { $skip: skip },
      { $limit: limit },
    ]
    const [data, totalItems] = await Promise.all([
      this.nModel.aggregate(aggregationPipeline).exec(),
      this.nModel.countDocuments().exec(),
    ]);
  
    const totalPages = Math.ceil(totalItems / limit);
  
    return {
      data,
      currentPage: pageNumber,
      totalPages,
      totalItems,
    };
  }
}
