import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ItensMagicosDto } from "src/ItensMagicos/itensMagicos.dto";
import { ClassePersonagens } from "./personagens.enum";

export class PersonagensDto {
    
    identificador:string;

    @IsNotEmpty()
    @IsString()
    nome:string;

    @IsNotEmpty()
    @IsString()
    nome_aventureiro:string;

    @IsNotEmpty()
    @IsEnum(ClassePersonagens)
    classe:ClassePersonagens;

    @IsNotEmpty()
    @IsNumber()
    level:number;

    @IsArray()
    @Type(()=> ItensMagicosDto)
    @ValidateNested({each:true})
    lista_itens_magicos:ItensMagicosDto[];

    @IsNotEmpty()
    @IsNumber()
    forca:number;

    @IsNotEmpty()
    @IsNumber()
    defesa:number;
}