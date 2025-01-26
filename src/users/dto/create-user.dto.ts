import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: "Nom d'utilisateur unique", 
    example: 'john_doe' 
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, { 
    message: 'Le nom d\'utilisateur peut contenir uniquement des lettres, chiffres et underscores' 
  })
  username: string;

  @ApiProperty({ 
    description: "Mot de passe de l'utilisateur", 
    example: 'fjsdf7dskdsqkjd' 
  })
  @IsString()
  password: string;

  @ApiProperty({ 
    description: "Adresse email de l'utilisateur", 
    example: 'johndoe@gmail.com' 
  })
  @IsEmail({}, { message: 'L\'email doit être valide' })
  email: string;

  @ApiProperty({ 
    description: 'Prénom de l\'utilisateur', 
    example: 'John' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Nom de l\'utilisateur', 
    example: 'Doe' 
  })
  @IsString()
  surname: string;
}
