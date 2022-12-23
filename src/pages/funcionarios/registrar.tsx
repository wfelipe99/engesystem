import { Flex, Heading, Input, FormControl, FormLabel, Container, Button, Stack, Select } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import Head from 'next/head'

const Registrar: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const mutation = trpc.employee.register.useMutation()
  const roles = trpc.role.getAll.useQuery()

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
