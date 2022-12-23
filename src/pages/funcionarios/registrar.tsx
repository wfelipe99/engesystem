import { Flex, Heading, Input, FormControl, FormLabel, Container, Button, Stack, Select, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import Head from 'next/head'
import DayPicker, { dayPickerAtom } from '../../components/DayPicker'
import { useAtom } from 'jotai'

const Registrar: NextPage = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [admissionDate, setAdmissionDate] = useAtom<Date>(dayPickerAtom)
  const [bankInfo, setBankInfo] = useState<string>('Banco')
  const [CPF, setCPF] = useState<string>()

  const mutation = trpc.employee.register.useMutation()
  const roles = trpc.role.getAll.useQuery()

  const PixInfo = () => (
    <FormControl>
      <FormLabel>Chave PIX</FormLabel>
      <Input id="pixKey" name="pixKey" type="text" />
    </FormControl>
  )

  const BankInfoComponent = () => (
    <Box>
      <FormControl>
        <FormLabel>Banco</FormLabel>
        <Input type="text" id="bank" name="bank" />
      </FormControl>

      <FormControl>
        <FormLabel>Agência</FormLabel>
        <Input type="text" id="agency" name="agency" />
      </FormControl>

      <FormControl>
        <FormLabel>Conta</FormLabel>
        <Input type="text" id="account" name="account" />
      </FormControl>

      <FormControl>
        <FormLabel>Operação</FormLabel>
        <Input type="text" id="operation" name="operation" />
      </FormControl>
    </Box>
  )

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
            <FormControl mt="12">
              <FormLabel>Nome</FormLabel>
              <Input id="name" name="name" type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Função</FormLabel>
              <Select
                id="roleName"
                name="roleName"
                placeholder="Selecione uma função"
                required
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.data?.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Data de Admissão</FormLabel>
              <DayPicker />
            </FormControl>

            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input id="cpf" name="cpf" type="text" onChange={(e) => setCPF(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Dados Bancários</FormLabel>
              <Select id="bankInfo" name="bankInfo" onChange={(e) => setBankInfo(e.currentTarget.value)}>
                <option value="PIX">PIX</option>
                <option value="Banco" selected>
                  Banco
                </option>
              </Select>

              {bankInfo === 'PIX' ? <PixInfo /> : <BankInfoComponent />}
            </FormControl>

            <Button colorScheme="blue" onClick={() => mutation.mutate({ name, email, roleName: role })}>
              Cadastrar
            </Button>
          </Stack>
        </Flex>
      </Container>
    </>
  )
}

export default Registrar
