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
  roleName: string
  CPF: string
  admissionDate: Date
  UF: string
  pixKey: string
  bank: string
  agency: string
  account: string
  operation: string
}

const Registrar: NextPage = () => {
  const [bankInfo, setBankInfo] = useState<string>('Banco')

  const { register, handleSubmit, control } = useForm()

  const mutation = trpc.employee.register.useMutation()
  const roles = trpc.role.getAll.useQuery()

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    email,
    roleName,
    CPF,
    admissionDate,
    UF,
    pixKey,
    bank,
    agency,
    account,
    operation,
  }) => {
    mutation.mutate({ name, email, roleName, CPF, admissionDate, UF, pixKey, bank, agency, account, operation })
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
                <FormLabel>Função</FormLabel>
                <Select id="roleName" placeholder="Selecione uma função" {...register('roleName')}>
                  {roles.data?.map((role) => (
                    <option key={role.id} value={role.name}>
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
                <FormLabel>Estado</FormLabel>
                <Select id="UF" placeholder="Selecione um estado" {...register('UF')}>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </Select>
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
