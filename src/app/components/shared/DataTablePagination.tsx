import { Table } from '@tanstack/react-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'

export interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 items-center gap-4 p-2 border-t border-border dark:border-white/10'>
      <div className='flex items-center space-x-2 justify-center sm:justify-start'>
          <p className='text-xs font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-3 w-[70px] text-xs'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className='text-xs'>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>
      <div className="text-xs font-medium justify-center flex">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </div>
      <div className='flex items-center space-x-2 justify-center sm:justify-end'>
        <Button
          variant="outline"
          className="hidden h-7 w-7 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <Icon icon="solar:double-alt-arrow-left-linear" width="14" height="14" />
        </Button>
        <Button
          variant="outline"
          className="h-7 w-7 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <Icon icon="solar:alt-arrow-left-linear" width="14" height="14" />
        </Button>
        {Array.from({ length: pageCount }).map((_, i) => {
             if (
                 pageCount <= 7 ||
                 i === 0 ||
                 i === pageCount - 1 ||
                 (i >= pageIndex - 1 && i <= pageIndex + 1)
             ) {
                 return (
                    <Button
                        key={i}
                        variant={pageIndex === i ? "default" : "outline"}
                        className="h-7 w-7 p-0 text-xs"
                        onClick={() => table.setPageIndex(i)}
                    >
                        {i + 1}
                    </Button>
                 )
             }
             if (i === 1 || i === pageCount - 2) {
                 return <span key={i} className="px-1">...</span>
             }
             return null;
        })}
        <Button
          variant="outline"
          className="h-7 w-7 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-7 w-7 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <Icon icon="solar:double-alt-arrow-right-linear" width="14" height="14" />
        </Button>
      </div>
    </div>
  )
}