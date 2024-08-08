import { Module } from '@nestjs/common';
import { envSchema  } from './env';
import { CreateAccountController } from './controllers/create-account.controller';
import { PrismaService } from './prisma-lib/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
  validate: (env) => envSchema.parse(env), //configura para a validação do env
  isGlobal: true,
  })],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}