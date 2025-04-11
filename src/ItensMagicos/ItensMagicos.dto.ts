import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ClasseItens } from "./classeItens.enum";

export class ItensMagicos {
    
    identificador;

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