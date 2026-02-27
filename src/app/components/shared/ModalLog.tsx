'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { DataTablePagination } from '@/app/components/shared/DataTablePagination'

export type ModalLogProps<TData extends Record<string, unknown>> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  pageSizeOptions?: number[]
  disableAnimation?: boolean
  forceMount?: boolean
  icon?: string
  dialogClassName?: string
  tableContainerClassName?: string
  wrapColumnIds?: string[]
  emptyText?: string
}

const defaultPageSizeOptions = [10, 20, 30, 40, 50]

function ModalLog<TData extends Record<string, unknown>>({
    open,
    onOpenChange,
    title,
    data,
  columns,
  pageSizeOptions = defaultPageSizeOptions,
  disableAnimation = false,
  forceMount = false,
  icon = 'solar:document-text-linear',
  dialogClassName,
  tableContainerClassName,
  wrapColumnIds = [],
  emptyText = 'No data available',
}: ModalLogProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const normalizedPageSizeOptions =
        pageSizeOptions.length > 0 ? pageSizeOptions : defaultPageSizeOptions
    const wrapColumnIdSet = useMemo(() => new Set(wrapColumnIds), [wrapColumnIds])

    const table = useReactTable({
        data,
        columns,
        getRowId: (row, index) => {
            const candidateId = row.id
            return candidateId !== undefined && candidateId !== null
                ? String(candidateId)
                : String(index)
        },
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: normalizedPageSizeOptions[0] || 10 },
        },
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...(forceMount ? { forceMount: true as const } : {})}
        disableAnimation={disableAnimation}
        className={cn('max-w-[95vw] w-full lg:max-w-7xl', dialogClassName)}>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <Icon icon={icon} className='w-6 h-6' />
                        <span className='text-lg font-semibold'>{title}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className={cn('overflow-x-auto border rounded-md', tableContainerClassName)}>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={`select-none px-2 text-center text-xs whitespace-nowrap ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                            style={{ minWidth: header.getSize() }}>
                                            {header.isPlaceholder ? null : (
                                                header.column.getCanSort() ? (
                                                    <Button
                                                        variant='ghost'
                                                        className='flex items-center justify-center gap-1 p-2 bg-transparent hover:bg-transparent text-foreground font-semibold w-full h-full text-xs'
                                                        onClick={header.column.getToggleSortingHandler()}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: <ArrowUp className='w-3 h-3' />,
                                                            desc: <ArrowDown className='w-3 h-3' />,
                                                        }[header.column.getIsSorted() as string] ?? (
                                                                <ChevronsUpDown className='w-3 h-3' />
                                                            )}
                                                    </Button>
                                                ) : (
                                                    <div className='flex items-center justify-center gap-1 p-2 text-foreground font-semibold w-full h-full text-xs'>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </div>
                                                )
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className='group/row bg-transparentodd:bg-transparent even:bg-lightprimary dark:even:bg-lightprimary'>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    'text-center text-xs py-2 px-2',
                                                    wrapColumnIdSet.has(cell.column.id)
                                                        ? 'whitespace-normal text-left min-w-[320px]'
                                                        : 'whitespace-nowrap'
                                                )}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                                        {emptyText}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination
                    table={table}
                    pageSizeOptions={normalizedPageSizeOptions}
                />
                <DialogFooter>

                    {/* <Button
                        size='sm'
                        variant='outline'
                        className='h-8 text-xs'
                        onClick={() => onOpenChange(false)}>
                        <Icon icon="solar:close-circle-linear" width="14" height="14" /> Close
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalLog
