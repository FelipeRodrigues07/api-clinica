import { PrismaUserRepository } from "src/repositories/prisma/prisma-users-repository";
import { CreateAccountUseCase  } from "src/use-cases/create-users";
import { PrismaService } from "src/prisma-lib/prisma.service";

export function makeCreateAccountUseCase(){
    const prismaService = new PrismaService()
    const usersRepository = new PrismaUserRepository(prismaService)
    const registerUseCase = new CreateAccountUseCase(usersRepository)
    return registerUseCase

    
}