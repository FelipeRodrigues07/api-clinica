import { PrismaUserRepository } from "src/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaService } from "src/prisma-lib/prisma.service";
import { JwtService } from '@nestjs/jwt';

export function makeAuthenticateUseCase(){
    const prismaService = new PrismaService()
    const usersRepository = new PrismaUserRepository(prismaService)
    const jwtService = new JwtService();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository, jwtService)
    return authenticateUseCase

    
}