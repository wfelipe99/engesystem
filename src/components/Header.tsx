import { Avatar, Box, Flex, Heading, HStack, Stack, VStack, Text } from '@chakra-ui/react'
import Image from 'next/image'

const Header = () => {
  return (
    <HStack bgColor="brand.primary" justify="space-between" spacing="6" p="6" h="10%">
      <HStack spacing="6">
        <Image src="/logo.png" alt="Logo da empresa" width="60" height="60" />
        <Heading as="h1" color="white">
          Evolution Construções
        </Heading>
      </HStack>

      <HStack bgColor="red.600" p="2" rounded="2xl" spacing="4">
        <Avatar
          name="Padrxn"
          src="http://www.petplan.com.au/blog/wp-content/uploads/2016/12/pet-insurance-dog-cat-8.jpg"
        />

        <Text color="white" fontWeight="bold">
          Padrxn
        </Text>
      </HStack>
    </HStack>
  )
}

export default Header
