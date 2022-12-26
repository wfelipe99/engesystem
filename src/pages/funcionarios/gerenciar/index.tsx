import { Container, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { trpc } from '../../../utils/trpc'

import { useState, useRef, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { AG_GRID_LOCALE_PT_BR } from '../../../utils/utils'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CellDoubleClickedEvent, ColDef, FieldElement, Grid } from 'ag-grid-community'

import type { UserWithRoles } from 'next-auth'
import type { Role } from '@prisma/client'

type User = {
  UF: Pick<Role, 'UF'>
  name: Pick<UserWithRoles, 'name'>
  role: Pick<Role, 'name'>
  admissionDate: Pick<UserWithRoles, 'admissionDate'>
}

const Gerenciar: NextPage = () => {
  const router = useRouter()

  const tableFields: ColDef<User>[] = [
    {
      valueGetter: (params) => {
        return params.data.roles[0].UF
      },
      headerName: 'UF',
      filter: true,
      resizable: true,
    },
    { field: 'name', headerName: 'Nome', filter: true, sort: 'asc', resizable: true },
    {
      valueGetter: (params) => {
        return params.data.roles[0].name
      },
      headerName: 'Função',
      filter: true,
      resizable: true,
    },
    {
      valueGetter: (params) => {
        return format(params.data.admissionDate, "d 'de' MMMM 'de' u", { locale: ptBR })
      },
      headerName: 'Data de Admissão',
      filter: true,
      resizable: true,
    },
  ]

  const { data: rowData } = trpc.employee.getAll.useQuery()

  const gridRef = useRef() // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(tableFields)

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  )

  // Example of consuming Grid Event
  const cellDoubleClickedListener = useCallback(
    (e: CellDoubleClickedEvent) => {
      router.push(`/funcionarios/gerenciar/${e.data.id}`)
    },
    [router]
  )

  return (
    <Container maxW="container.lg">
      <Box w="100%">
        <div>
          {/* Example using Grid's API */}
          {/* <button onClick={buttonListener}>Push Me</button> */}

          {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
          <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection="multiple" // Options - allows click selection of rows
              onRowDoubleClicked={cellDoubleClickedListener}
              localeText={AG_GRID_LOCALE_PT_BR}
              enableCellTextSelection
            />
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default Gerenciar
