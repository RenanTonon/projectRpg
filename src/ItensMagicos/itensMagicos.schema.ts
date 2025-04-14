import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ClasseItens } from "./ClasseItens.enum";


@Schema()
export class ItensMagicos {
    @Prop({unique:true})
    identificador:string;

    @Prop({required:true})
    nome:string;

    @Prop({required:true})
    tipo_item:ClasseItens;

    @Prop({required:true})
    força:number;

    @Prop({required:true})
    defesa:number;
}
export const ItensMagicosSchema = SchemaFactory.createForClass(ItensMagicos)