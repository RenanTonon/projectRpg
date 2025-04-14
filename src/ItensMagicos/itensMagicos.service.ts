import { BadRequestException, Injectable } from "@nestjs/common";
import { ItensMagicosDto } from "./itensMagicos.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ItensMagicos } from "src/ItensMagicos/itensMagicos.schema"
import { Model } from "mongoose";

@Injectable()
export class ItensMagicosService{

    constructor(@InjectModel(ItensMagicos.name) private readonly itemMagicosModel: Model<ItensMagicos>){}

     async cadastrarItensMagicos(itemMagicos:ItensMagicosDto):Promise<ItensMagicosDto>{
        const itemOk = this.validacaoTipoItem(itemMagicos);
        if(!itemOk){
            throw new BadRequestException('Cuidado! esse item ultrapassa as normas')
        }
        const newItemMagico = new this.itemMagicosModel(itemMagicos)
        const existeItemMagico = await this.itemMagicosModel.findOne({identificador : itemMagicos.identificador})

        if(!existeItemMagico){
            return await newItemMagico.save();
        }else{
            return existeItemMagico
        }
        
    }

    async listarItensMagicos():Promise<ItensMagicosDto[]>{
        return await this.itemMagicosModel.find();
    }

    async procurarItemMagico(identificadorItem:string):Promise<ItensMagicosDto>{
        const existeItemMagico = await this.itemMagicosModel.findOne({identificador : identificadorItem});
        if(existeItemMagico){
            return existeItemMagico
        }else{
            throw new BadRequestException("Item Magico não encontrado")
        }
    }
    private validacaoTipoItem(item:ItensMagicosDto):boolean{
        if(item.tipo_item == 'Arma'){
            if(item.força <= 10 && item.defesa == 0){
                return true
            }else{
                return false
            }
        }else if(item.tipo_item == 'Armadura'){
            if(item.força == 0 && item.defesa <= 10){
                return true
            }else{
                return false
            }
        }else if(item.tipo_item == 'Amuleto'){
            if(item.força <= 10 && item.defesa <= 10){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
}