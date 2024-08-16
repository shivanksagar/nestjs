import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString() 
    title: string;
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsString()
    user_id: string;

}
