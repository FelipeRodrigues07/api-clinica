import { UsersRepository } from '@/repositories/users-repository'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    access_token: string
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


        const accessToken = this.jwt.sign({ sub: user.id })

        return {
            access_token: accessToken
        }
    }
}