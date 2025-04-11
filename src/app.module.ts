import { Module } from '@nestjs/common';
import { PersonagensController } from './Personagens/personagens.controllers';

@Module({
  imports: [],
  controllers: [PersonagensController],
  providers: [],
})
export class AppModule {}
