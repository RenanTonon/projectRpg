import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagensModule } from './Personagens/personagens.module';
import { ItensMagicosModule } from './ItensMagicos/itensMagicos.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/project_rpg'),PersonagensModule,ItensMagicosModule,
    
  ],
})
export class AppModule {}
