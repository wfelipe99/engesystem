import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const CEO = await prisma.role.create({ data: { name: 'CEO', hierarchy: 3 } })
  const Administrativo = await prisma.role.create({ data: { name: 'Administrativo', hierarchy: 2 } })
  const Apontador = await prisma.role.create({ data: { name: 'Apontador', hierarchy: 1 } })

  await prisma.role.createMany({
    data: [
      { name: 'Carpinteiro', hierarchy: 0 },
      { name: 'Servente', hierarchy: 0 },
    ],
  })

  await prisma.user.create({
    data: {
      name: 'Caíque Müller',
      email: 'a@email.com',
      CPF: 'a',
      admissionDate: new Date(),
      UF: 'Pernambuco',
      bank: 'Caixa',
      agency: '123',
      account: '12336987-2',
      operation: '013',
      pixKey: null,
      role: { connect: { id: CEO.id } },
    },
  })
  await prisma.user.create({
    data: {
      name: 'Wevelly Felipe',
      email: 'b@email.com',
      CPF: 'a',
      admissionDate: new Date(),
      UF: 'Pernambuco',
      pixKey: '123',
      role: { connect: { id: Administrativo.id } },
    },
  })
  await prisma.user.create({
    data: {
      name: 'Padrxn',
      email: 'c@email.com',
      CPF: 'a',
      admissionDate: new Date(),
      UF: 'Pernambuco',
      bank: 'Caixa',
      agency: '123',
      account: '12336987-2',
      operation: '013',
      pixKey: null,
      role: { connect: { id: Apontador.id } },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
