import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Stack,
  Select,
  Button,
  FormHelperText,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import type { NextPage } from 'next'
import { trpc } from '../../utils/trpc'
import type { ZOD_UF_ENUM } from '../../utils/types'
import type { z } from 'zod'
import EmployeeTable, { selectedRowsAtom } from '../../components/EmployeeTable'
import { useAtom } from 'jotai'

type Inputs = {
  name: string
  UF: z.infer<typeof ZOD_UF_ENUM>
}

const CriarObra: NextPage = () => {
  const { register, handleSubmit } = useForm()
  const [selectedRows] = useAtom(selectedRowsAtom)

  const { data: rowData, status } = trpc.employee.getAll.useQuery()
  const mutation = trpc.construction.create.useMutation()

  const onSubmit: SubmitHandler<Inputs> = ({ name, UF }) => {
    mutation.mutate({ name, UF, workersId: selectedRows.map((worker) => ({ id: worker.id })) })
  }

  if (status === 'loading') return <div>Carregando table...</div>

  return (
    <Container maxW="container.lg">
      <Flex align="center" direction="column">
        <Heading as="h2">Criar Obra</Heading>

        <Stack w="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="12">
              <FormLabel>Nome</FormLabel>
              <Input id="name" type="text" {...register('name')} />
            </FormControl>

            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select id="UF" placeholder="Selecione um estado" {...register('UF')}>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Funcionários</FormLabel>
              <FormHelperText>Selecione os funcionários a serem alocados para esta obra</FormHelperText>
              <EmployeeTable rowData={rowData} showCheckBox={true} />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Criar
            </Button>
          </form>
        </Stack>
      </Flex>
    </Container>
  )
}

export default CriarObra
