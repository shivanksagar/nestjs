import { Controller, Get, Post, Body,  Param, Delete, Query, Put, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RequestWithUser } from './request-with-user.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto ,  @Req() req: RequestWithUser) {
  
    if (!req.user || req.user.id !== createNoteDto.user_id) {
    return {
      error: true,
      message: 'User not found',
    }
    }

    if (!this.notesService.create(createNoteDto)) {
      throw new Error('Note not created');
    }else {
      return {
        error: false,
        message: 'Note created successfully',
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('page') pageNumber: number = 1 , @Req() req: RequestWithUser) {
    const limit = 5;
    const paginatedNotes = await this.notesService.paginate({ limit, pageNumber });
    const filteredNotes = paginatedNotes.data
    .filter(note => {
      if (req.user && req.user.id === note.user_id.toString()) {
        return true; // Keep the note
      } else {
        return false; // Discard the note
      }
    });

    if (filteredNotes.length === 0) {
      return {
        error: true,
        message: 'No notes found for this user',
        data: [],
      };
    }else {
      return filteredNotes;
    }

    }


  @UseGuards(AuthGuard)
  @Get('/search/:search')
  search(@Param('search') query: string) {
    return this.notesService.search( query );
  }

  @UseGuards(AuthGuard)
  @Get('/all/:id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {

    if(this.notesService.update(id, updateNoteDto)){
      return { message: 'Note updated successfully', updated: true };
    }else{
      return { message: 'Note not found', updated: false };
    }
    return ;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {

    if (this.notesService.remove(id)){
      return { message: 'Note deleted successfully', deleted: true };
    }else {
      return { message: 'Note not found', deleted: false };
    }
  }



}
