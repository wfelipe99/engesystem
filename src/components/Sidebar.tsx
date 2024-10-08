import { Box, UnorderedList, ListItem, Stack, ListIcon, Text, HStack } from '@chakra-ui/react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { TbHierarchy2 } from 'react-icons/tb'
import { HiBuildingOffice2 } from 'react-icons/hi2'
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
                <ListItem>
                  <Link href="/funcionarios/gerenciar">Gerenciar</Link>
                </ListItem>
              </Box>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <HStack>
              <ListIcon as={TbHierarchy2} />
              <Text fontWeight="bold">Funções</Text>
            </HStack>

            <UnorderedList listStyleType="none">
              <Box ml="8">
                <Link href="/funcoes/criar">Criar</Link>
                <ListItem>Gerenciar</ListItem>
              </Box>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <HStack>
              <ListIcon as={HiBuildingOffice2} />
              <Text fontWeight="bold">Obras</Text>
            </HStack>

            <UnorderedList listStyleType="none">
              <Box ml="8">
                <ListItem>
                  <Link href="/obras/criar">Criar</Link>
                </ListItem>
                <ListItem>
                  <Link href="/obras/gerenciar">Gerenciar</Link>
                </ListItem>
              </Box>
            </UnorderedList>
          </ListItem>
        </Stack>
      </UnorderedList>
    </Box>
  )
}
