import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('page') pageNumber: number = 1) {
    const limit = 5;
    const paginatedNotes = this.notesService.paginate({ limit, pageNumber });
    return paginatedNotes;
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
    return this.notesService.update(id, updateNoteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }



}
