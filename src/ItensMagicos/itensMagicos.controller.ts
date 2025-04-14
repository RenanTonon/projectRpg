import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ItensMagicosDto } from "./itensMagicos.dto";
import { ItensMagicosService } from "./itensMagicos.service";
@Controller('itens-magicos')
export class ItensMagicosController{
    constructor(private itensMagicosService: ItensMagicosService) {}

    @Post()
    async cadastrarItensMagicos(@Body() objItemMagicos:ItensMagicosDto):Promise<ItensMagicosDto>{
        return await this.itensMagicosService.cadastrarItensMagicos(objItemMagicos)
    }

    @Get()
    async listarItensMagicos():Promise<ItensMagicosDto[]>{
        return await this.itensMagicosService.listarItensMagicos()
    }

    @Get(':identificador')
    async procurarItemMagico(@Param('identificador') identificador:string):Promise<ItensMagicosDto>{
        return await this.itensMagicosService.procurarItemMagico(identificador);
    }
}