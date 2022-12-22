import { Flex, Heading, Input, FormControl, FormLabel, Container, Button, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { trpc } from '../../utils/trpc'

const Registrar: NextPage = () => {
  const mutation = trpc.employees.register.useMutation()

  const handleRegister = async () => {
    const name = 'John Doe'
    mutation.mutate({ name })
  }

  return (
    <Container maxW="container.lg">
      <Flex align="center" direction="column">
        <Heading as="h2">Registrar Funcionário</Heading>

        <Stack w="100%">
          <FormControl mt="12">
            <FormLabel>Nome</FormLabel>
            <Input type="text" />
          </FormControl>

          <Button colorScheme="blue" onClick={handleRegister}>
            Cadastrar
          </Button>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Registrar
