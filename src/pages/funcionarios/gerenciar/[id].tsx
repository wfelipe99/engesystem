import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Box,
  Container,
  Button,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  CPF: string
}

const GerenciarFuncionario = () => {
  const router = useRouter()
  const { register, handleSubmit, control } = useForm()

  const { id } = router.query

  if (!id) return <div>Funcionário não localizado.</div>

  const { data: employee } = trpc.employee.getById.useQuery({ id: id as string })

  if (!employee) return <div>Funcionário não localizado.</div>

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Container>
      <Link href="/funcionarios/gerenciar" passHref>
        <Button leftIcon={<IoMdArrowRoundBack />} variant="outline">
          Voltar
        </Button>
      </Link>

      <Tabs>
        <TabList>
          <Tab>Ver</Tab>
          <Tab>Editar</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Nome: {employee.name}</p>
            <p>email: {employee.email}</p>
            <p>CPF: {employee.CPF}</p>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" id="Nome" defaultValue={employee.name} {...register('name')} />
                </FormControl>

                <HStack>
                  <Button type="submit" colorScheme="green">
                    Salvar alterações
                  </Button>
                  <Button colorScheme="red">Cancelar</Button>
                </HStack>
              </Stack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default GerenciarFuncionario
