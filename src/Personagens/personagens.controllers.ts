import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PersonagensInteface } from "./personagens.interface";
import { PersonagensDto } from "./personagens.dto";
import { PersonagensService } from "./personagens.service";
import { ItensMagicosDto } from "src/ItensMagicos/itensMagicos.dto";

@Controller('personagens')
export class PersonagensController{
    constructor(private personagensService: PersonagensService) {}
  
    @Post()
    async cadastrarPersonagem(@Body() objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        return await this.personagensService.cadastrarPersonagem(objPersonagem);
    }

    @Get()
    async listarTodosPersonagem():Promise<PersonagensDto[]>{
        return await this.personagensService.listarTodosPersonagem();
    }

    @Get(':identificador')
    async procuraPersonagem(@Param('identificador') identificadorPersonagem:string):Promise<PersonagensDto>{
        return await this.personagensService.procuraPersonagem(identificadorPersonagem);
    }

    @Get('itens/:identificador')
    async listaItensPersonagem(@Param('identificador') identificadorPersonagem:string):Promise<ItensMagicosDto[]>{
        return await this.personagensService.listaItensPersonagem(identificadorPersonagem);
    }

    @Get('amuleto/:identificador')
    async procuraAmuletoPersonagem(@Param('identificador') identificadorPersonagem:string):Promise<ItensMagicosDto>{
        return await this.personagensService.procuraAmuletoPersonagem(identificadorPersonagem);
    }

    @Patch('atualizatTudo/:identificador')
    async atualizarPersonagem(@Param('identificador') identificadorPersonagem:string, @Body() objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        return await this.personagensService.atualizarPersonagem(identificadorPersonagem,objPersonagem);
    }

    @Patch('atualiza-nome/:identificador')
    async atualizaNome(@Param('identificador') identificadorPersonagem:string,@Body() objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        return await this.personagensService.atualizaNome(identificadorPersonagem, objPersonagem);
    }

    @Post('adicionar-item/:identificador')
    async adicinarItemMagicoMochila(@Param('identificador') identificadorPersonagem:string, @Body() itemMagico:ItensMagicosDto):Promise<PersonagensDto>{
        return await this.personagensService.adicionarItemMagico(identificadorPersonagem,itemMagico);
    }

    @Delete(':identificador')
    async deletePersonagem(@Param('identificador') identificadorPersonagem:string){
        return this.personagensService.deletePersonagem(identificadorPersonagem)
    }

    @Delete('itens/:identificador')
    async deleteItemMagicoPersonagem(@Param('identificador') identificadorPersonagem:string,@Body() itemMagico:ItensMagicosDto):Promise<ItensMagicosDto[]>{
        return await this.personagensService.deleteItemMagicoPersonagem(identificadorPersonagem,itemMagico);
    }

     
   

    
}