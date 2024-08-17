import { Module } from '@nestjs/common';
import { envSchema  } from './env';
import { CreateAccountController } from './controllers/create-account.controller';
import { PrismaService } from './prisma-lib/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
  validate: (env) => envSchema.parse(env), //configura para a validação do env
  isGlobal: true,
  }),
  AuthModule, 
],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}