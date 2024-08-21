import { UsersRepository } from '@/repositories/users-repository'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
   user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository, private jwt: JwtService,) { }

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('User credentials do not match.')
        }


        const isPasswordValid = await compare(password, user.password_hash)

        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match.')
        }

        return {
           user
        }
    }
}