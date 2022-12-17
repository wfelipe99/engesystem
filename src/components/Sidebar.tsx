import { Box, UnorderedList, ListItem, Stack, ListIcon, Text, HStack } from '@chakra-ui/react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { TbHierarchy2 } from 'react-icons/tb'
import { CiMoneyBill } from 'react-icons/ci'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <Box w="200px" float="left" bgColor="red.600" color="white" h="90%" pt="2">
      <UnorderedList listStyleType="none">
        <Stack spacing="4">
          <ListItem>
            <HStack>
              <ListIcon as={BsFillPeopleFill} />
              <Text fontWeight="bold">Funcionários</Text>
            </HStack>

            <UnorderedList listStyleType="none">
              <Box ml="8">
                <ListItem>
                  <Link href="/funcionarios/registrar">Registrar</Link>
                </ListItem>
                <ListItem>Gerenciar</ListItem>
              </Box>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <HStack>
              <ListIcon as={TbHierarchy2} />
              <Text fontWeight="bold">Cargos</Text>
            </HStack>

            <UnorderedList listStyleType="none">
              <Box ml="8">
                <ListItem>Criar</ListItem>
                <ListItem>Gerenciar</ListItem>
              </Box>
            </UnorderedList>
          </ListItem>
          <ListItem fontWeight="bold">
            <ListIcon as={CiMoneyBill} />
            Faturas
          </ListItem>
        </Stack>
      </UnorderedList>
    </Box>
  )
}
