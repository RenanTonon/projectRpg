import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ClasseItens } from "./ClasseItens.enum";

export class ItensMagicosDto {
    
    identificador:string;

    @IsNotEmpty()
    @IsString()
    nome:string;

    @IsNotEmpty()
    @IsEnum(ClasseItens)
    tipo_item:ClasseItens;

    @IsNotEmpty()
    @IsNumber()
    força:number;

    @IsNotEmpty()
    @IsNumber()
    defesa:number;

}