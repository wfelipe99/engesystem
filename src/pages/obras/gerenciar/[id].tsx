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
import ManageConstructionTable from '../../../components/ManageConstructionTable'

type Inputs = {
  name: string
  email: string
  CPF: string
}

const GerenciarConstrucao = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <div>Construção não localizada.</div>

  const { data: construction } = trpc.construction.getById.useQuery({ id: id as string })
  const { data: employees, status } = trpc.construction.getEmployees.useQuery({ id: id as string })

  if (!construction) return <div>Construção não localizada.</div>
  if (!employees) return <div>Construção não localizada.</div>
  if (status === 'loading') return <div>Carregando</div>

  // TODO: Make it with Editable component, so I won't need to create a "Editar" tab
  return (
    <Container maxW="container.xl">
      <Link href="/obras/gerenciar" passHref>
        <Button leftIcon={<IoMdArrowRoundBack />} variant="outline">
          Voltar
        </Button>
      </Link>

      <Box w="100%">
        <ManageConstructionTable rowData={employees} />
      </Box>
    </Container>
  )
}

export default GerenciarConstrucao
