import { Flex, Heading, Input, FormControl, FormLabel, Container, Button, Stack, Select, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import Head from 'next/head'
import DayPicker from '../../components/DayPicker'
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  roleId: string
  CPF: string
  admissionDate: Date
  pixKey: string
  bank: string
  agency: string
  account: string
  operation: string
}

const STATES_NAMES = {
  AC: {
    name: 'Acre',
  },
  AL: {
    name: 'Alagoas',
  },
  AP: {
    name: 'Amapá',
  },
  AM: {
    name: 'Amazonas',
  },
  BA: {
    name: 'Bahia',
  },
  CE: {
    name: 'Ceará',
  },
  DF: {
    name: 'Distrito Federal',
  },
  ES: {
    name: 'Espírito Santo',
  },
  GO: {
    name: 'Goiás',
  },
  MA: {
    name: 'Maranhão',
  },
  MT: {
    name: 'Mato Grosso',
  },
  MS: {
    name: 'Mato Grosso do Sul',
  },
  MG: {
    name: 'Minas Gerais',
  },
  PA: {
    name: 'Pará',
  },
  PB: {
    name: 'Paraíba',
  },
  PR: {
    name: 'Paraná',
  },
  PE: {
    name: 'Pernambuco',
  },
  PI: {
    name: 'Piauí',
  },
  RJ: {
    name: 'Rio de Janeiro',
  },
  RN: {
    name: 'Rio Grande do Norte',
  },
  RS: {
    name: 'Rio Grande do Sul',
  },
  RO: {
    name: 'Rondônia',
  },
  RR: {
    name: 'Roraima',
  },
  SC: {
    name: 'Santa Catarina',
  },
  SP: {
    name: 'São Paulo',
  },
  SE: {
    name: 'Sergipe',
  },
  TO: {
    name: 'Tocantins',
  },
}

const Registrar: NextPage = () => {
  const [bankInfo, setBankInfo] = useState<string>('Banco')
  const [selectedUF, setSelectedUF] = useState<string>('')

  const { register, handleSubmit, control } = useForm()

  const mutation = trpc.employee.register.useMutation()
  const roleQuery = trpc.role.getAll.useQuery()

  if (roleQuery.status === 'loading') return <div>Carregando...</div>

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    email,
    roleId,
    CPF,
    admissionDate,
    pixKey,
    bank,
    agency,
    account,
    operation,
  }) => {
    mutation.mutate({ name, email, roleId, CPF, admissionDate, pixKey, bank, agency, account, operation })
  }

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_HEAD_TITLE} - Registrar Funcionário</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.lg">
        <Flex align="center" direction="column">
          <Heading as="h2">Registrar Funcionário</Heading>

          <Stack w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt="12">
                <FormLabel>Nome</FormLabel>
                <Input id="name" type="text" {...register('name')} />
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" type="email" {...register('email')} />
              </FormControl>

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select
                  id="UF"
                  placeholder="Selecione um estado"
                  onChange={(e) => setSelectedUF(e.currentTarget.value)}
                >
                  {roleQuery.data?.statesUF.map((UF, index) => (
                    <option key={index} value={UF}>
                      {STATES_NAMES[UF].name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Função</FormLabel>
                <Select id="role" placeholder="Selecione uma função" {...register('roleId')}>
                  {roleQuery.data?.roles
                    .filter((role) => role.UF === selectedUF)
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>CPF</FormLabel>
                <Input id="CPF" type="text" {...register('CPF')} />
              </FormControl>

              <FormControl>
                <FormLabel>Data de Admissão</FormLabel>
                <Controller
                  name="admissionDate"
                  control={control}
                  render={({ field }) => (
                    <DayPicker selected={field.value} onSelect={(date: any) => field.onChange(date)} />
                  )}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dados Bancários</FormLabel>
                <Select id="bankInfo" defaultValue="Banco" onChange={(e) => setBankInfo(e.currentTarget.value)}>
                  <option value="PIX">PIX</option>
                  <option value="Banco">Banco</option>
                </Select>

                {bankInfo === 'PIX' ? (
                  <FormControl>
                    <FormLabel>Chave PIX</FormLabel>
                    <Input id="pixKey" type="text" {...register('pixKey')} />
                  </FormControl>
                ) : (
                  <>
                    <FormControl>
                      <FormLabel>Banco</FormLabel>
                      <Input type="text" {...register('bank')} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Agência</FormLabel>
                      <Input type="text" id="agency" {...register('agency')} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Conta</FormLabel>
                      <Input type="text" id="account" {...register('account')} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Operação</FormLabel>
                      <Input type="text" id="operation" {...register('operation')} />
                    </FormControl>
                  </>
                )}
              </FormControl>

              <Button type="submit" colorScheme="blue">
                Cadastrar
              </Button>
            </form>
          </Stack>
        </Flex>
      </Container>
    </>
  )
}

export default Registrar
