import { IsEmail, IsString, Length, IsIn } from 'class-validator';

export class CreateClienteDto {
  @IsString() @Length(8, 11) // DNI 8 / RUC 11
  ruc_dni: string;

  @IsString() @Length(1, 80)
  nombres: string;

  @IsEmail()
  email: string;

  @IsString() @Length(0, 100)
  direccion: string;

  @IsIn([0,1])
  estado: number;
}
