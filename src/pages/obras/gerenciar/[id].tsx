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
  const { id } = router.query

  if (!id) return <div>Funcionário não localizado.</div>

  const { data: construction } = trpc.construction.getById.useQuery({ id: id as string })

  if (!construction) return <div>Funcionário não localizado.</div>

  // TODO: Make it with Editable component, so I won't need to create a "Editar" tab
  return (
    <Container>
      <Link href="/obras/gerenciar" passHref>
        <Button leftIcon={<IoMdArrowRoundBack />} variant="outline">
          Voltar
        </Button>
      </Link>
      <p>Nome: {construction.name}</p>
    </Container>
  )
}

export default GerenciarFuncionario
