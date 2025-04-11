import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PersonagensDto {
    
    identificador:string;

    @IsNotEmpty()
    @IsString()
    nome:string;

    @IsNotEmpty()
    @IsString()
    nome_aventureiro:string;

    @IsNotEmpty()
    @IsString()
    Classe:string;

    @IsNotEmpty()
    @IsNumber()
    level:number;

    @IsArray()
    lista_itens_magicos:[string];

    @IsNotEmpty()
    @IsNumber()
    forca:number;

    @IsNotEmpty()
    @IsNumber()
    Defesa:number;
}