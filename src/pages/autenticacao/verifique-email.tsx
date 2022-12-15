import { Box, Center, Text, Heading, Stack, Container } from '@chakra-ui/react'
import { NextPage } from 'next'

const VerifiqueEmail: NextPage = () => {
  return (
    <Box w="100vw" h="100vh" bgColor="brand.primary">
      <Center h="full">
        <Container maxW="3xl">
          <Box py="10" px="4" boxShadow="2xl" borderRadius="xl" bgColor="white" textAlign="center">
            <Stack spacing="12">
              <Heading>Verifique o seu e-mail</Heading>
              <Text fontSize="lg">
                Um link para entrar na sua conta foi enviado para o endereço de e-mail fornecido.
              </Text>
            </Stack>
          </Box>
        </Container>
      </Center>
    </Box>
  )
}

export default VerifiqueEmail
