import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

//validar o token, precisa só da public


const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),//ver se la tem o id
})

export type UserPayload  = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//request do token
      secretOrKey: Buffer.from(publicKey, 'base64'),//ver a chave do token
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload) {  //se não possuir o id ele vai dar erro
    return tokenPayloadSchema.parse(payload) 
  }
}