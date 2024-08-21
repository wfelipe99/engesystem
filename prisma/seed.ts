import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const CEO = await prisma.role.create({ data: { name: 'CEO', UF: 'PE', salary: 0, hierarchy: 3 } })

  const Administrativo = await prisma.role.create({
    data: { name: 'Administrativo', UF: 'PE', salary: 1200.25, hierarchy: 2 },
  })

  const Apontador = await prisma.role.create({
    data: { name: 'Apontador', UF: 'PE', salary: 2000, hierarchy: 1 },
  })

  const ServentePE = await prisma.role.create({
    data: { name: 'Servente', UF: 'PE', salary: 2500, hierarchy: 0 },
  })

  await prisma.role.createMany({
    data: [
      { name: 'Carpinteiro', UF: 'PE', salary: 900, hierarchy: 0 },
      { name: 'Servente', UF: 'AL', salary: 900.95, hierarchy: 0 },
    ],
  })

  const discountSindicato = await prisma.discount.create({ data: { name: 'Sindicato', percentOnSalary: 0.02 } })
  const discountAlimentacao = await prisma.discount.create({ data: { name: 'Alimentação', percentOnSalary: 0.03 } })
  const discountPassagem = await prisma.discount.create({ data: { name: 'Passagem', percentOnSalary: 0.06 } })

  const constructionHospital = await prisma.construction.create({ data: { name: 'Hospital', UF: 'PE' } })
  const constructionAlvenaria = await prisma.construction.create({ data: { name: 'Alvenaria', UF: 'AL' } })

  const Caique = await prisma.user.create({
    data: {
      name: 'Caíque Müller',
      email: 'a@email.com',
      CPF: '1',
      admissionDate: new Date(),
      bank: 'Caixa',
      agency: '123',
      account: '12336987-2',
      operation: '013',
      pixKey: null,
      roles: {
        connect: { id: CEO.id },
      },
      discounts: { connect: { id: discountSindicato.id } },
      constructions: { connect: { id: constructionHospital.id } },
    },
  })

  const Felipe = await prisma.user.create({
    data: {
      name: 'Wevelly Felipe',
      email: 'b@email.com',
      CPF: '12',
      admissionDate: new Date(),
      pixKey: '123',
      roles: {
        connect: { id: Administrativo.id },
      },
      discounts: { connect: [{ id: discountAlimentacao.id }, { id: discountPassagem.id }] },
      constructions: { connect: { id: constructionAlvenaria.id } },
    },
  })

  const Padrxn = await prisma.user.create({
    data: {
      name: 'Padrxn',
      email: 'c@email.com',
      CPF: '123',
      admissionDate: new Date(),
      bank: 'Caixa',
      agency: '123',
      account: '12336987-2',
      operation: '013',
      pixKey: null,
      roles: {
        connect: { id: Apontador.id },
      },
      constructions: { connect: { id: constructionHospital.id } },
    },
  })

  const Zezinho = await prisma.user.create({
    data: {
      name: 'Zezinho',
      email: 'd@email.com',
      CPF: '123',
      admissionDate: new Date(),
      pixKey: 'asd49as84f98af',
      TransportVouch: 0,
      roles: {
        connect: { id: ServentePE.id },
      },
      constructions: { connect: { id: constructionHospital.id } },
      discounts: { connect: [{ id: discountAlimentacao.id }, { id: discountPassagem.id }] },
    },
  })

  const Joaozinho = await prisma.user.create({
    data: {
      name: 'Joãozinho',
      email: 'e@email.com',
      CPF: '123',
      admissionDate: new Date(),
      pixKey: 'asd49as84f98af',
      productionSalary: 5000,
      TransportVouch: 1000.5,
      roles: {
        connect: { id: ServentePE.id },
      },
      constructions: { connect: { id: constructionHospital.id } },
      discounts: { connect: [{ id: discountAlimentacao.id }, { id: discountPassagem.id }] },
    },
  })

  await prisma.variableValue.create({
    data: { payedAt: new Date(), bonus: 400, employee: { connect: { id: Zezinho.id } } },
  })

  await prisma.moneyInAdvance.create({
    data: {
      paidAt: new Date(),
      value: 3000,
      description: 'Pegou para fazer x coisa',
      employee: { connect: { id: Zezinho.id } },
    },
  })

  const overTime60Percent = await prisma.overTime.create({
    data: {
      percentOnWorkedHour: 0.6,
      constructions: {
        connect: { id: constructionHospital.id },
      },
    },
  })
  const overTime100Percent = await prisma.overTime.create({
    data: { percentOnWorkedHour: 1.0, constructions: { connect: { id: constructionHospital.id } } },
  })

  await prisma.overTimeWork.create({
    data: {
      paidAt: new Date(),
      hours: 4,
      employee: { connect: { id: Zezinho.id } },
      overTimeInfo: { connect: { id: overTime60Percent.id } },
    },
  })

  await prisma.overTimeWork.create({
    data: {
      paidAt: new Date(),
      hours: 5,
      employee: { connect: { id: Zezinho.id } },
      overTimeInfo: { connect: { id: overTime100Percent.id } },
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
