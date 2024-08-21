import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/factories/make-authenticate-use-case'
import { JwtService } from '@nestjs/jwt'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(

    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    try {
      const authenticateUseCase = makeAuthenticateUseCase()

      const  { user } = await authenticateUseCase.execute({
        email,
        password
      })

      const accessToken = this.jwt.sign({ sub: user.id })

      return {
        access_token: accessToken,
      }

    } catch (err) {
      throw err
    }
  }
}
