import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Personagens, PersonagensSchema } from "./personagens.schema";
import { PersonagensController } from "./personagens.controllers";
import { PersonagensService } from "./personagens.service";
import { ItensMagicosService } from "src/ItensMagicos/itensMagicos.service";
import { ItensMagicosModule } from "src/ItensMagicos/itensMagicos.module";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:Personagens.name,
            schema:PersonagensSchema
        }]),
        ItensMagicosModule
    ],
    controllers:[PersonagensController],
    providers:[PersonagensService],
    exports:[PersonagensService]
})
export class PersonagensModule {}