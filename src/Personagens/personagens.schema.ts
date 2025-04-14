import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItensMagicosDto } from "src/ItensMagicos/itensMagicos.dto";
import { ClassePersonagens } from "./personagens.enum";

@Schema()
export class Personagens{
       
        @Prop({unique:true})
        identificador:string;
    
        @Prop({required:true})
        nome:string;
    
        @Prop({required:true})
        nome_aventureiro:string;
    
        @Prop({required:true})
        classe:ClassePersonagens;
    
        @Prop({required:true})
        level:number;

        @Prop({required:true})
        lista_itens_magicos:ItensMagicosDto[];
        
        @Prop({required:true})
        forca:number;

        @Prop({required:true})
        defesa:number;
}

export const PersonagensSchema = SchemaFactory.createForClass(Personagens)