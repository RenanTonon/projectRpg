import { BadRequestException, Injectable } from "@nestjs/common";
import { PersonagensDto } from "./personagens.dto";
import { ItensMagicosDto } from "src/ItensMagicos/itensMagicos.dto";
import { Personagens } from "./personagens.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ItensMagicosService } from "src/ItensMagicos/itensMagicos.service";

@Injectable()
export class PersonagensService{
    
    
    constructor(@InjectModel(Personagens.name) private readonly personagemModel: Model<Personagens>,
    private readonly itensMagicosService: ItensMagicosService 
){}
    
    async cadastrarPersonagem(objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        const statusOk = this.vericaStatusCadastramentoInicial(objPersonagem.forca,objPersonagem.defesa);

        if(!statusOk){
            throw new BadRequestException('Somente distribuir 10 pontos entre força e defesa.')
        }
        var statusTotalItens = this.reajusteStatusComItemMagicos(objPersonagem.lista_itens_magicos);
        objPersonagem.forca = objPersonagem.forca + statusTotalItens.forca;
        objPersonagem.defesa = objPersonagem.defesa + statusTotalItens.defesa;
        var mochilaOk = this.verificaMochilaItensMagicos(objPersonagem.lista_itens_magicos);
        if(!mochilaOk){
            throw new BadRequestException('Sem trapacear! apenas um amuleto inicial permitido');
        }
        var itemMagicosVerificados:ItensMagicosDto[] = await this.verificaStatusDeItensMagicos(objPersonagem.lista_itens_magicos)
        objPersonagem.lista_itens_magicos = itemMagicosVerificados
        const newPersonagem = new this.personagemModel(objPersonagem)

        try {
            return await newPersonagem.save();
        } catch (error) {
            throw new BadRequestException('Já existe um identificador com esse nome, troque!')
        }
        

    }

    async listarTodosPersonagem(): Promise<PersonagensDto[]> {
        return await this.personagemModel.find();
    }

    async procuraPersonagem(identificadorPersonagem:string):Promise<PersonagensDto>{
        
       
         const personagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(personagem){
            return personagem
        }else{
            throw new BadRequestException('Personagem não encontrado');
        }
      
    }

    async atualizarPersonagem(identificadorPersonagem:string,objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : objPersonagem.identificador});
        if(procuraPersonagem){
            procuraPersonagem.nome = objPersonagem.nome
            procuraPersonagem.nome_aventureiro = objPersonagem.nome_aventureiro
            procuraPersonagem.classe = objPersonagem.classe
            procuraPersonagem.level = objPersonagem.level
            
            var statusIniciais = this.descobrindoStatusIniciais(procuraPersonagem.lista_itens_magicos,procuraPersonagem.forca,procuraPersonagem.defesa)
            procuraPersonagem.lista_itens_magicos = objPersonagem.lista_itens_magicos
            
            var mochilaOk = this.verificaMochilaItensMagicos(procuraPersonagem.lista_itens_magicos);
            if(!mochilaOk){
                throw new BadRequestException('Sem trapacear! apenas um amuleto inicial permitido');
            }
            var itemMagicosVerificados:ItensMagicosDto[] = await this.verificaStatusDeItensMagicos(procuraPersonagem.lista_itens_magicos)
            procuraPersonagem.lista_itens_magicos = itemMagicosVerificados
            var statusTotalItens = this.reajusteStatusComItemMagicos(procuraPersonagem.lista_itens_magicos);

            procuraPersonagem.forca = statusIniciais.forcax + statusTotalItens.forca;
            procuraPersonagem.defesa = statusIniciais.defesax + statusTotalItens.defesa;
            
            return  await procuraPersonagem.save()

        }else{
            throw new BadRequestException('Personagem não foi encontrado!')
        }
    }

    async atualizaNome(identificadorPersonagem:string,objPersonagem:PersonagensDto):Promise<PersonagensDto>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(procuraPersonagem){
            procuraPersonagem.nome_aventureiro = objPersonagem.nome_aventureiro
            return await procuraPersonagem.save()
        }else{
            throw new BadRequestException("Personagem não encontrado para alteração de nome")
        }
    }

    async deletePersonagem(identificadorPersonagem:string){
        try {
            return await this.personagemModel.findOneAndDelete({identificador : identificadorPersonagem});
        } catch (error) {
            throw new BadRequestException("Personagem não localizado para exclusão");
        }
        
        
    }

    async adicionarItemMagico(identificadorPersonagem:string,itemMagico:ItensMagicosDto):Promise<PersonagensDto>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(procuraPersonagem){
            for(var count = 0;count < procuraPersonagem.lista_itens_magicos.length;count++){
                if(procuraPersonagem.lista_itens_magicos[count].tipo_item == "Amuleto"){
                    throw new BadRequestException('Esse personagem já possui um amuleto')
                }
            }
            var statusIniciais = this.descobrindoStatusIniciais(procuraPersonagem.lista_itens_magicos,procuraPersonagem.forca,procuraPersonagem.defesa)
            procuraPersonagem.lista_itens_magicos.push(itemMagico)
            
            var itemMagicosVerificados:ItensMagicosDto[] = await this.verificaStatusDeItensMagicos(procuraPersonagem.lista_itens_magicos)
            procuraPersonagem.lista_itens_magicos = itemMagicosVerificados
            var statusTotalItens = this.reajusteStatusComItemMagicos(procuraPersonagem.lista_itens_magicos);

            procuraPersonagem.forca = statusIniciais.forcax + statusTotalItens.forca;
            procuraPersonagem.defesa = statusIniciais.defesax + statusTotalItens.defesa;

            return procuraPersonagem.save()
        }else{
            throw new BadRequestException('Personagem não foi encontrado! Não foi possivel adicionar o item')
        }
    }

    async listaItensPersonagem(identificadorPersonagem):Promise<ItensMagicosDto[]>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(procuraPersonagem){
            return procuraPersonagem.lista_itens_magicos
        }else{
            throw new BadRequestException('Personagem não encontrado! não é possivel listar os itens')
        }
    }

    async deleteItemMagicoPersonagem(identificadorPersonagem:string,itemMagico:ItensMagicosDto):Promise<ItensMagicosDto[]>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(procuraPersonagem){
                
            var statusIniciais = this.descobrindoStatusIniciais(procuraPersonagem.lista_itens_magicos,procuraPersonagem.forca,procuraPersonagem.defesa)
            const nova_lista_itens = procuraPersonagem.lista_itens_magicos.filter(item => item.identificador != itemMagico.identificador);
            if(nova_lista_itens.length > 0){
    
                var itemMagicosVerificados:ItensMagicosDto[] = await this.verificaStatusDeItensMagicos(nova_lista_itens)
                procuraPersonagem.lista_itens_magicos = itemMagicosVerificados
                var statusTotalItens = this.reajusteStatusComItemMagicos(procuraPersonagem.lista_itens_magicos);

                procuraPersonagem.forca = statusIniciais.forcax + statusTotalItens.forca;
                procuraPersonagem.defesa = statusIniciais.defesax + statusTotalItens.defesa;
                procuraPersonagem.save()
                return procuraPersonagem.lista_itens_magicos
            }else{
                throw new BadRequestException("Como você conseguiu esse item? Não existe itens na lista para excluir")
            }
            
            
        }else{
            throw new BadRequestException('Personagem não encontrado! não foi possivel fazer a exclusão do item')
        }
    }

    async procuraAmuletoPersonagem(identificadorPersonagem:string):Promise<ItensMagicosDto>{
        const procuraPersonagem = await this.personagemModel.findOne({identificador : identificadorPersonagem});
        if(procuraPersonagem){
            
            for(var item = 0; item < procuraPersonagem.lista_itens_magicos.length;item++){
                if(procuraPersonagem.lista_itens_magicos[item].tipo_item == "Amuleto"){
                    return procuraPersonagem.lista_itens_magicos[item]
                }
            }
            
            throw new BadRequestException("O personagem não possui um amuleto")
            
        }else{
            throw new BadRequestException("Personagem não encontrado! não foi possui procurar pelo amuleto")
        }
    }

    private vericaStatusCadastramentoInicial(forca:number,defesa:number):boolean {
        return (forca + defesa) <= 10;
    }

    private reajusteStatusComItemMagicos(itemMagicos:Array<ItensMagicosDto>):{forca:number,defesa:number}{
        var somaForca = 0;
        var somaDefesa = 0;
        for(var item = 0; item < itemMagicos.length;item++){
            somaForca+=itemMagicos[item].força
            somaDefesa+=itemMagicos[item].defesa
        }
        return {forca: somaForca,defesa: somaDefesa}
    }

    private verificaMochilaItensMagicos(itemMagicos:Array<ItensMagicosDto>):boolean{
        
        var quantItemArma = 0;
        var quantItemArmadura = 0;
        var quantItemAmuleto = 0;
        for(var item = 0; item < itemMagicos.length;item++){
            if(itemMagicos[item].tipo_item == "Arma"){
                quantItemArma++
            }else if(itemMagicos[item].tipo_item == "Armadura"){
                quantItemArmadura++
            }else if(itemMagicos[item].tipo_item == "Amuleto"){
                quantItemAmuleto++
            }
        }
        if(quantItemArma >= 0 && quantItemArmadura >= 0 && quantItemAmuleto <= 1){
            return true
        }else{
            return false
        }
    }
    
    async verificaStatusDeItensMagicos(itemMagicos:ItensMagicosDto[]):Promise<ItensMagicosDto[]>{
        var itemValidos: ItensMagicosDto[] = [];
        for(var item = 0; item < itemMagicos.length;item++){
            try {
                await this.itensMagicosService.cadastrarItensMagicos(itemMagicos[item])
                itemValidos.push(itemMagicos[item]);
            } catch (error) {
                throw new BadRequestException(`Um ou mais itens estão ìnvalidos! fora do padrão, corrija imediatamente ou exclua!`)
            }
            
        }
        return itemValidos
    }

    
    private descobrindoStatusIniciais(itemMagicos:Array<ItensMagicosDto>,forca:number,defesa:number):{forcax:number,defesax:number}{
        var forcaAjustada:number = forca;
        var defesaAjustada:number = defesa;

        for(var item = 0; item < itemMagicos.length;item++){
            forcaAjustada-=itemMagicos[item].força
            defesaAjustada-=itemMagicos[item].defesa
        }
        return {forcax: forcaAjustada,defesax: defesaAjustada}
    }
}