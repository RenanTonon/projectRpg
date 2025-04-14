import { Module } from "@nestjs/common";
import { ItensMagicos, ItensMagicosSchema } from "./itensMagicos.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ItensMagicosService } from "./itensMagicos.service";
import { ItensMagicosController } from "./itensMagicos.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:ItensMagicos.name,
            schema:ItensMagicosSchema,
        }])
    ],
    controllers:[ItensMagicosController],
    providers:[ItensMagicosService],
    exports:[ItensMagicosService]
})
export class ItensMagicosModule {}