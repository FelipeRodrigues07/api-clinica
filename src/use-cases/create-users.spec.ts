// import { RegisterUseCase } from './register'
// import { compare } from 'bcryptjs'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
// import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

// //unit testing - teste unitário

// let usersRepository: InMemoryUsersRepository
// let sut: RegisterUseCase

// describe('Register Use Case', () => {

//   beforeEach(() => {
//     usersRepository = new InMemoryUsersRepository() //não usa o repository prisma, porque ele é fictício, pois é teste unitário
//     sut = new RegisterUseCase(usersRepository)
//   })

//   it('should register a user', async () => {  //testa o cadastro

//     const { user } = await sut.execute({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//     })

//     expect(user.id).toEqual(expect.any(String)) //espera que o id do usuário seja uma string
//   })

//   it('should hash user password upon registration', async () => {

//     const { user } = await sut.execute({
//       name: 'John Doe',
//       email: "john@gmail.com",
//       password: '123456'
//     })

//     const isPasswordCorrectlyHashed = await compare(
//       '123456', //compara a senha original com o hash armazenado
//       user.password_hash
//     )

//     expect(isPasswordCorrectlyHashed).toBe(true)
//   })

//   it('should not allow registration with the same email twice', async () => {  //impede registro com email duplicado

//     const email = 'johndoe@example.com'

//     await sut.execute({
//       name: 'John Doe',
//       email,
//       password: '123456',
//     })

//     await expect(sut.execute({
//       name: 'John Doe',
//       email,
//       password: '123456',
//     })).rejects.toBeInstanceOf(UserAlreadyExistsError)
//   })
// })