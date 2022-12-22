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
    data: { name: 'Caíque Müller', email: 'a@email.com', role: { connect: { id: CEO.id } } },
  })
  await prisma.user.create({
    data: { name: 'Wevelly Felipe', email: 'b@email.com', role: { connect: { id: Administrativo.id } } },
  })
  await prisma.user.create({
    data: { name: 'Padrxn', email: 'c@email.com', role: { connect: { id: Apontador.id } } },
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
