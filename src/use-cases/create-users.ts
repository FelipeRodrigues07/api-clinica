import { UsersRepository } from 'src/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UsersAlreadyExistsError } from 'src/errors/user-already-exists-error'
import { User } from '@prisma/client'  //tipagem propria do prisma
import {
  ConflictException,
} from '@nestjs/common'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateAccountUseCaseResponse {
  user: User
}



export class CreateAccountUseCase {  
  constructor(private usersRepository: UsersRepository) {}   

  async execute({ name, email, password }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const password_hash = await hash(password, 6)

   
    const userWithSameEmail = await this.usersRepository.findByEmail(email) 
  

    if (userWithSameEmail) { 
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

                     
    const user = await this.usersRepository.create({   
      name,
      email,
      password_hash,
    })

    return {
      user
    }
  }
}
