import { Prisma } from '@prisma/client'
import { z } from 'zod'

export enum Role {
  Apontador = 1,
  Administrativo,
  CEO,
}

export const AG_GRID_LOCALE_PT_BR = {
  // Set Filter
  selectAll: '(Selecionar tudo)',
  selectAllSearchResults: '(Selecionar todos os resultados da pesquisa)',
  searchOoo: 'Pesquisando...',
  blanks: '(Em branco)',
  noMatches: 'Nenhum resultado encontrado',

  // Number Filter & Text Filter
  filterOoo: 'Filtrar...',
  equals: 'Igual a',
  notEqual: 'Diferente de',
  blank: 'Em branco',
  notBlank: 'Não em branco',
  empty: 'Vazio',

  // Number Filter
  lessThan: 'Menor que',
  greaterThan: 'Maior que',
  lessThanOrEqual: 'Menor ou igual a',
  greaterThanOrEqual: 'Maior ou igual a',
  inRange: 'Entre',
  inRangeStart: 'De',
  inRangeEnd: 'Até',

  // Text Filter
  contains: 'Contém',
  notContains: 'Não contém',
  startsWith: 'Começa com',
  endsWith: 'Termina com',

  // Date Filter
  dateFormatOoo: 'dd/mm/yyyy',

  // Filter Conditions
  andCondition: 'E',
  orCondition: 'OU',

  // Filter Buttons
  applyFilter: 'Aplicar filtro',
  resetFilter: 'Redefinir filtro',
  clearFilter: 'Limpar filtro',
  cancelFilter: 'Cancelar filtro',

  // Filter Titles
  textFilter: 'Filtro de texto',
  numberFilter: 'Filtro numérico',
  dateFilter: 'Filtro de data',
  setFilter: 'Definir filtro',

  // Side Bar
  columns: 'Colunas',
  filters: 'Filtros',

  // columns tool panel
  pivotMode: 'Modo de agrupamento',
  groups: 'Grupos',
  rowGroupColumnsEmptyMessage: 'Arraste uma coluna para o grupo',
  values: 'Valores',
  valueColumnsEmptyMessage: 'Arraste uma coluna para o valor',
  pivots: 'Agrupamentos',
  pivotColumnsEmptyMessage: 'Arraste uma coluna para o agrupamento',

  // Header of the Default Group Column
  group: 'Grupo',

  // Other
  loadingOoo: 'Carregando...',
  noRowsToShow: 'Nenhum registro para mostrar',
  enabled: 'Habilitado',

  // Menu
  pinColumn: 'Fixar coluna',
  pinLeft: 'Fixar à esquerda',
  pinRight: 'Fixar à direita',
  noPin: 'Não fixar',
  valueAggregation: 'Agregação de valores',
  autosizeThiscolumn: 'Redimensionar esta coluna',
  autosizeAllColumns: 'Redimensionar todas as colunas',
  groupBy: 'Agrupar por',
  ungroupBy: 'Desagrupar por',
  addToValues: 'Adicionar ${variable} aos valores',
  removeFromValues: 'Remover ${variable} dos valores',
  addToLabels: 'Adicionar ${variable} aos nomes',
  removeFromLabels: 'Remover ${variable} dos nomes',
  resetColumns: 'Redefinir colunas',
  expandAll: 'Expandir todos',
  collapseAll: 'Recolher todos',
  copy: 'Copiar',
  ctrlC: 'Ctrl+C',
  copyWithHeaders: 'Copiar com cabeçalhos',
  copyWithGroupHeaders: 'Copiar com grupo de cabeçalhos',
  paste: 'Colar',
  ctrlV: 'Ctrl+V',
  export: 'Exportar',
  csvExport: 'Exportar para CSV',
  excelExport: 'Exportar para Excel',

  // Enterprise Menu Aggregation and Status Bar
  sum: 'Soma',
  min: 'Mínimo',
  max: 'Máximo',
  none: 'Nenhum',
  count: 'Contagem',
  avg: 'Média',
  filteredRows: 'Linhas filtradas',
  selectedRows: 'Linhas selecionadas',
  totalRows: 'Total de linhas',
  totalAndFilteredRows: 'Total e linhas filtradas',
  more: 'Mais',
  to: 'para',
  of: 'de',
  page: 'Página',
  nextPage: 'Próxima página',
  lastPage: 'Última página',
  firstPage: 'Primeira página',
  previousPage: 'Página anterior',

  // Pivoting
  pivotColumnGroupTotals: 'Total de grupo de colunas',

  // Enterprise Menu (Charts)
  pivotChartAndPivotMode: 'Grafíco Pivô & Modo Pivô',
  pivotChart: 'Gráfico Pivô',
  chartRange: 'Alcance do gráfico',

  columnChart: 'Coluna',
  groupedColumn: 'Agrupada',
  stackedColumn: 'Empilhada',
  normalizedColumn: '100% empilhada',

  barChart: 'Barras',
  groupedBar: 'Agrupada',
  stackedBar: 'Empilhada',
  normalizedBar: '100% empilhada',

  pieChart: 'Pizza',
  pie: 'Pizza',
  doughnut: 'Rosquinha',

  line: 'Linha',

  xyChart: 'X Y (Dispersão)',
  scatter: 'Dispersão',
  bubble: 'Bolhas',

  areaChart: 'Área',
  area: 'Área',
  stackedArea: 'Empilhada',
  normalizedArea: '100% empilhada',

  histogramChart: 'Histograma',

  // Charts
  pivotChartTitle: 'Gráfico Pivô',
  rangeChartTitle: 'Alcance do gráfico',
  settings: 'Configurações',
  data: 'Dados',
  format: 'Formato',
  categories: 'Categorias',
  defaultCategory: '(padrão)',
  series: 'Séries',
  xyValues: 'Valores X Y',
  paired: 'Par',
  axis: 'Eixo',
  navigator: 'Navegador',
  color: 'Cor',
  thickness: 'Espessura',
  xType: 'Tipo X',
  automatic: 'Automático',
  category: 'Categoria',
  number: 'Número',
  time: 'Tempo',
  autoRotate: 'Auto rotacionar',
  xRotation: 'Rotação X',
  yRotation: 'Rotação Y',
  ticks: 'Ticks',
  width: 'Largura',
  height: 'Altura',
  length: 'Comprimento',
  padding: 'Preenchimento',
  spacing: 'Espaçamento',
  chart: 'Gráfico',
  title: 'Título',
  titlePlaceholder: 'Título aqui',
  background: 'Fundo',
  font: 'Fonte',
  top: 'Topo',
  right: 'Direita',
  bottom: 'Fundo',
  left: 'Esquerda',
  labels: 'Nomes',
  size: 'Tamanho',
  minSize: 'Tamanho mínimo',
  maxSize: 'Tamanho máximo',
  legend: 'Legenda',
  position: 'Posição',
  markerSize: 'Tamanho do marcador',
  markerStroke: 'Marcador de traço',
  markerPadding: 'Marcador de preenchimento',
  itemSpacing: 'Espaçamento do item',
  itemPaddingX: 'Preenchimento X do item',
  itemPaddingY: 'Preenchimento Y do item',
  layoutHorizontalSpacing: 'Espaçamento horizontal do layout',
  layoutVerticalSpacing: 'Espaçamento vertical do layout',
  strokeWidth: 'Espessura do traço',
  lineDash: 'Linha tracejada',
  offset: 'Offset',
  offsets: 'Offsets',
  tooltips: 'Dicas',
  callout: 'Callout',
  markers: 'Marcadores',
  shadow: 'Sombra',
  blur: 'Desfocar',
  xOffset: 'Offset X',
  yOffset: 'Offset Y',
  lineWidth: 'Largura da linha',
  normal: 'Normal',
  bold: 'Negrito',
  italic: 'Itálico',
  boldItalic: 'Negrito itálico',
  predefined: 'Predefinido',
  fillOpacity: 'Opacidade de preenchimento',
  strokeOpacity: 'Opacidade do traço',
  histogramBinCount: 'Contagem de binário do histograma',
  columnGroup: 'Agrupar coluna',
  barGroup: 'Agrupar barra',
  pieGroup: 'Agrupar pizza',
  lineGroup: 'Agrupar linha',
  scatterGroup: 'Agrupar dispersão',
  areaGroup: 'Agrupar área',
  histogramGroup: 'Agrupar histograma',
  combinationGroup: 'Combinação',
  groupedColumnTooltip: 'Agrupar por coluna',
  stackedColumnTooltip: 'Empilhada por coluna',
  normalizedColumnTooltip: '100% empilhada por coluna',
  groupedBarTooltip: 'Agrupar por barra',
  stackedBarTooltip: 'Empilhada por barra',
  normalizedBarTooltip: '100% empilhada por barra',
  pieTooltip: 'Pizza',
  doughnutTooltip: 'Rosquinha',
  lineTooltip: 'Linha',
  groupedAreaTooltip: 'Agrupar por área',
  stackedAreaTooltip: 'Empilhada por área',
  normalizedAreaTooltip: '100% empilhada por área',
  scatterTooltip: 'Dispersão',
  bubbleTooltip: 'Bolha',
  histogramTooltip: 'Histograma',
  columnLineComboTooltip: 'Coluna e Linha',
  areaColumnComboTooltip: 'Área e Coluna',
  customComboTooltip: 'Combinação Personalizada',
  noDataToChart: 'Não há dados para gráfico',
  pivotChartRequiresPivotMode: 'Gráfico Pivô requer modo pivô',
  chartSettingsToolbarTooltip: 'Configurações do gráfico',
  chartLinkToolbarTooltip: 'Link do gráfico',
  chartUnlinkToolbarTooltip: 'Desvincular gráfico',
  chartDownloadToolbarTooltip: 'Download do gráfico',
  seriesChartType: 'Tipo de gráfico de série',
  seriesType: 'Tipo de Série',
  secondaryAxis: 'Eixo Secundário',

  // ARIA
  ariaHidden: 'escondido',
  ariaVisible: 'visível',
  ariaChecked: 'verificado',
  ariaUnchecked: 'não verificado',
  ariaIndeterminate: 'indeterminado',
  ariaDefaultListName: 'lista',
  ariaColumnSelectAll: 'Selecionar todas as colunas',
  ariaInputEditor: 'Editor de entrada',
  ariaDateFilterInput: 'Filtrar entrada de data',
  ariaFilterList: 'Filtrar list',
  ariaFilterInput: 'Filtrar entrada',
  ariaFilterColumnsInput: 'Entrada de filtro de colunas',
  ariaFilterValue: 'Filtrar valor',
  ariaFilterFromValue: 'Filtrar pelo valor de',
  ariaFilterToValue: 'Filtrar pelo valor para',
  ariaFilteringOperator: 'Operador de filtragem',
  ariaColumn: 'Coluna',
  ariaColumnList: 'Lista de colunas',
  ariaColumnGroup: 'Grupo de colunas',
  ariaRowSelect: 'Aperte ESPAÇO para selecionar esta linha',
  ariaRowDeselect: 'Aperte ESPAÇO para desmarcar esta linha',
  ariaRowToggleSelection: 'Aperte ESPAÇO para alternar a seleção desta linha',
  ariaRowSelectAll: 'Aperte ESPAÇO para alternar a seleção de todas as linhas',
  ariaToggleVisibility: 'Aperte ESPAÇO para alternar a visibilidade',
  ariaSearch: 'Pesquisar',
  ariaSearchFilterValues: 'Pesquisar valores de filtro',

  // ARIA Labels for Drop Zones
  ariaRowGroupDropZonePanelLabel: 'Grupo de linhas',
  ariaValuesDropZonePanelLabel: 'Valores',
  ariaPivotDropZonePanelLabel: 'Nome das colunas',
  ariaDropZoneColumnComponentDescription: 'Pressione DELETE para remover',
  ariaDropZoneColumnValueItemDescription: 'Pressione ENTER para alterar o tipo de agregação',
  ariaDropZoneColumnGroupItemDescription: 'Pressione ENTER para ordenar',
  // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeperator}{column name}
  ariaDropZoneColumnComponentAggFuncSeperator: ' de ',
  ariaDropZoneColumnComponentSortAscending: 'ascendente',
  ariaDropZoneColumnComponentSortDescending: 'descendente',

  // ARIA LABEL FOR DIALOGS
  ariaLabelColumnMenu: 'Menu de coluna',
  ariaLabelCellEditor: 'Editor de célula',
  ariaLabelDialog: 'Diálogo',
  ariaLabelSelectField: 'Selecionar campo',
  ariaLabelTooltip: 'Dica',
  ariaLabelContextMenu: 'Menu de contexto',
  ariaLabelSubMenu: 'Sub-menu',
  ariaLabelAggregationFunction: 'Função de agregação',

  // Number Format (Status Bar, Pagination Panel)
  thousandSeparator: '.',
  decimalSeparator: ',',
}

export const STATES_NAMES = {
  AC: {
    name: 'Acre',
  },
  AL: {
    name: 'Alagoas',
  },
  AP: {
    name: 'Amapá',
  },
  AM: {
    name: 'Amazonas',
  },
  BA: {
    name: 'Bahia',
  },
  CE: {
    name: 'Ceará',
  },
  DF: {
    name: 'Distrito Federal',
  },
  ES: {
    name: 'Espírito Santo',
  },
  GO: {
    name: 'Goiás',
  },
  MA: {
    name: 'Maranhão',
  },
  MT: {
    name: 'Mato Grosso',
  },
  MS: {
    name: 'Mato Grosso do Sul',
  },
  MG: {
    name: 'Minas Gerais',
  },
  PA: {
    name: 'Pará',
  },
  PB: {
    name: 'Paraíba',
  },
  PR: {
    name: 'Paraná',
  },
  PE: {
    name: 'Pernambuco',
  },
  PI: {
    name: 'Piauí',
  },
  RJ: {
    name: 'Rio de Janeiro',
  },
  RN: {
    name: 'Rio Grande do Norte',
  },
  RS: {
    name: 'Rio Grande do Sul',
  },
  RO: {
    name: 'Rondônia',
  },
  RR: {
    name: 'Roraima',
  },
  SC: {
    name: 'Santa Catarina',
  },
  SP: {
    name: 'São Paulo',
  },
  SE: {
    name: 'Sergipe',
  },
  TO: {
    name: 'Tocantins',
  },
}

export const ZOD_UF_ENUM = z.enum([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SC',
  'SP',
  'SE',
  'TO',
])

const userWithSalaryInfo = Prisma.validator<Prisma.UserArgs>()({
  include: {
    roles: true,
    receivedVariableValue: true,
    receivedMoneyInAdvance: true,
    overTimeWork: {
      include: {
        overTimeInfo: true,
      },
    },
    discounts: true,
  },
})

export type UserWithSalaryInfo = Prisma.UserGetPayload<typeof userWithSalaryInfo>

export type DetailedSalary = {
  grossSalary: Prisma.Decimal
  netSalary: Prisma.Decimal
  vale: Prisma.Decimal
  bonus: Prisma.Decimal
  moneyInAdvance: Prisma.Decimal
  overTime: Prisma.Decimal
  discount: Prisma.Decimal
}
