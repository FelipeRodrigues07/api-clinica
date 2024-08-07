import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma,  User } from '@prisma/client'

import { UsersRepository } from '../users-repository'


export class PrismaUserRepository implements UsersRepository{

    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({   
          where: {
            email,
          },
        })
    
        return user
      }


      async create(data: Prisma.UserCreateInput){
        const user = await this.prisma.user.create({
            data
        })

        return user
      }
}