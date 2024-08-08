import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { makeCreateAccountUseCase } from 'src/factories/make-createaccount-use-case'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) //tipo um midlware para tratar dados 
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    try {
    const CreateAccountUseCase = makeCreateAccountUseCase()
     await CreateAccountUseCase.execute({
      name, 
      email, 
      password
     })

    } catch (err) {
     
      throw err
    }
  }
}