import { Body, Controller, Get } from "@nestjs/common";
import { PersonagensInteface } from "./personagens.interface";
import { PersonagensDto } from "./personagens.dto";

@Controller('Personagens')
export class PersonagensController{
    //constructor(private catsService: CatsService) {}
    @Get()
    writeAny(@Body() objPersonagem:PersonagensDto):PersonagensDto{
        return objPersonagem;
    }
}