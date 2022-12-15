import type { GetServerSideProps, NextPage } from 'next'
import { getCsrfToken } from 'next-auth/react'

import {
  Box,
  Center,
  VStack,
  Heading,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
} from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  csrfToken: string | undefined
}

const Entrar: NextPage<Props> = ({ csrfToken }) => {
  return (
    <Box w="100vw" h="100vh" bgColor="brand.primary">
      <Center h="full">
        <Container maxW="lg">
          <Stack spacing="8">
            <VStack spacing="2">
              <Image src="/logo.png" alt="Logo com as palavras Evolution Construções" width="100" height="100" />
              <Heading as="h1" size="xl" color="white">
                {process.env.NEXT_PUBLIC_COMPANY_NAME}
              </Heading>
            </VStack>

            <Box p="6" boxShadow="2xl" borderRadius="xl" bgColor="white">
              <form method="POST" action="/api/auth/signin/email">
                <Stack spacing="6">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                  <FormControl>
                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <Input id="email" name="email" type="email" placeholder="Digite o seu e-mail" isRequired />
                    <FormHelperText>O e-mail deve ser o mesmo fornecido pela gerência.</FormHelperText>
                  </FormControl>

                  <Button type="submit" colorScheme="blue">
                    Entrar
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      </Center>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const csrfToken = await getCsrfToken(context)

  return {
    props: { csrfToken },
  }
}

export default Entrar
