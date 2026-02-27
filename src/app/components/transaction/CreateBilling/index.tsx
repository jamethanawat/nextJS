'use client'
import { TbDotsVertical } from 'react-icons/tb'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icon } from "@iconify/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, FileText } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTablePagination } from '@/app/components/shared/DataTablePagination'
import DateRangeField from '@/app/components/shared/DateRangeField'
import ModalLog from '@/app/components/shared/ModalLog'
import {
    fetchCancelSoLogById,
    fetchCreateBillingCount,
    fetchCreateBillingList,
    fetchCreateBillingLogById,
    fetchMurCount,
    fetchMurList,
} from '@/app/services/createBillingService'
import type {
    CancelSoLogItem,
    CreateBillingCount,
    CreateBillingItem,
    CreateBillingLogItem,
    MurCount,
    MurItem,
} from '@/app/types/createBilling'
const tableActionData = [
    {
        icon: 'solar:add-circle-outline',
        listtitle: 'Add',
    },
    {
        icon: 'solar:pen-new-square-broken',
        listtitle: 'Edit',
    },
    {
        icon: 'solar:trash-bin-minimalistic-outline',
        listtitle: 'Delete',
    },
    {
        icon: 'solar:document-text-linear',
        listtitle: 'log',
    },
    {
        icon: 'solar:document-text-linear',
        listtitle: 'log cancel so',
    },
]

const customer2Options = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "France", value: "fr" },
    { label: "Germany", value: "de" },
]

type CustomerOption = {
    label: string
    value: string
}

type MultiSelectProps = {
    options: CustomerOption[]
    label?: string
    placeholder?: string
}

const MultiSelect = React.memo(({
    options,
    label = "Customer",
    placeholder = "Select customers",
}: MultiSelectProps) => {
    const [customer2, setCustomer2] = useState<string[]>([])

    const customer2Label = useMemo(() => {
        if (!customer2.length) return placeholder
        return options
            .filter((option) => customer2.includes(option.value))
            .map((option) => option.label)
            .join(", ")
    }, [customer2, options, placeholder])

    return (
        <div className="space-y-1">
            <Label htmlFor='customer2' className="text-xs">{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-8 w-full text-xs justify-between font-normal border-ld bg-transparent text-ld hover:bg-transparent hover:text-ld"
                    >
                        <span className={`truncate ${customer2.length ? "text-ld" : "text-muted-foreground"}`}>
                            {customer2Label}
                        </span>
                        <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4 opacity-60" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-2" align="start">
                    <div className="space-y-1">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted cursor-pointer"
                            >
                                <Checkbox
                                    checked={customer2.includes(option.value)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setCustomer2((prev) => [...prev, option.value])
                                        } else {
                                            setCustomer2((prev) => prev.filter((value) => value !== option.value))
                                        }
                                    }}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                    {customer2.length > 0 && (
                        <div className="flex justify-end pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-7 text-[11px]"
                                onClick={() => setCustomer2([])}
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
})


const CreateBilling = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLogLoading, setIsLogLoading] = useState(false)
    const [isCancelSoLogLoading, setIsCancelSoLogLoading] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [activeBillingTab, setActiveBillingTab] = useState('1')
    const [openModal, setOpenModal] = useState(false)
    const [activeMurTab, setActiveMurTab] = useState('8')
    const [openCancelSoLogModal, setOpenCancelSoLogModal] = useState(false)
    const [billdata, setBilldata] = useState<CreateBillingItem[]>([])
    const [murData, setMurData] = useState<MurItem[]>([])
    const [logData, setLogData] = useState<CreateBillingLogItem[]>([])
    const [cancelSoLogData, setCancelSoLogData] = useState<CancelSoLogItem[]>([])
    const [dataCount, setDataCount] = useState<CreateBillingCount>({
        SAVE_DRAFT: 0,
        PTT_APPROVE: 0,
        PTT_REJECT: 0,
        WAIT_CREATE_SO: 0,
        CREATE_SO_ERROR: 0,
        CANCEL_SO_ERROR: 0,
        WAIT_FOR_CREATE_BILLING: 0,
        WAIT_FOR_SAP_RESULT: 0,
        BILLING_WITH_ERROR: 0,
        BILLING_WITH_SUCCESS: 0,
        WAIT_FOR_SAP_RESULT_CANCEL: 0,
        BILLING_WITH_ERROR_CANCEL: 0,
    })
    const [dataCountMUR, setDataCountMUR] = useState<MurCount>({
        WAIT_SAP_CAL_MUR: 0,
        CAL_MUR_ERROR: 0,
        CAL_MUR_SUCCESS: 0,
        WAIT_GENERATE_MUR: 0,
        GENERATE_MUR_ERROR: 0,
        GENERATE_MUR_SUCCESS: 0,
        WAIT_CREATE_MUR: 0,
        CREATE_MUR_ERROR: 0,
        CREATE_MUR_SUCCESS: 0,
        WAIT_CANCEL_MUR: 0,
        CANCEL_MUR_ERROR: 0,
    })

    const paginationOptions = useMemo(() => [5, 10, 20, 30], [])
    const logColumns = useMemo<ColumnDef<CreateBillingLogItem>[]>(
        () => [
            { accessorKey: 'postingDate', header: 'Posting Date', size: 80 },
            { accessorKey: 'contract', header: 'CONTRACT', size: 60 },
            { accessorKey: 'lgort', header: 'LGORT', size: 60 },
            { accessorKey: 'qtyMmb', header: 'QTY MMB', size: 80 },
            { accessorKey: 'addQtyTon', header: 'ADD QTY TON', size: 65 },
            { accessorKey: 'blNo', header: 'BL NO', size: 60 },
            { accessorKey: 'revision', header: 'REVISION', size: 60 },
            { accessorKey: 'process', header: 'PROCESS', size: 60 },
            { accessorKey: 'doNo', header: 'DO NO', size: 60 },
            { accessorKey: 'giDoc', header: 'GI DOC', size: 60 },
            { accessorKey: 'billNo', header: 'BILL NO', size: 60 },
            { accessorKey: 'postingStatus', header: 'POSTING STATUS', size: 60 },
            { accessorKey: 'fiDoc', header: 'FI DOC', size: 60 },
            { accessorKey: 'dueDate', header: 'DUE DATE', size: 60 },
            { accessorKey: 'result', header: 'RESULT', size: 200 },
            { accessorKey: 'prntStatus', header: 'PRNTSTATUS', size: 60 },
            { accessorKey: 'spoolNo', header: 'SPOOL_NO', size: 60 },
            { accessorKey: 'printDate', header: 'PRINTDATE', size: 60 },
            { accessorKey: 'printTime', header: 'PRINTTIME', size: 60 },
        ],
        []
    )
    const cancelSoLogColumns = useMemo<ColumnDef<CancelSoLogItem>[]>(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'createBillingId', header: 'CREATE_BILLING_ID', size: 60 },
            { accessorKey: 'dailyNo', header: 'DAILY_NO', size: 80 },
            { accessorKey: 'soDocNo', header: 'SO_DOC_NO', size: 65 },
            { accessorKey: 'xmlFile', header: 'XML_FILE', size: 80 },
            { accessorKey: 'zresult', header: 'ZRESULT', size: 60 },
            { accessorKey: 'message', header: 'MESSAGE', size: 220 },
            { accessorKey: 'createDatetime', header: 'CREATE_DATETIME', size: 60 },
        ],
        []
    )

    const tabsConfig = useMemo(() => [
        { value: "1", label: "Save Draft", count: dataCount.SAVE_DRAFT },
        { value: "2", label: "Wait PTT Approve", count: dataCount.PTT_APPROVE },
        { value: "3", label: "PTT Reject", count: dataCount.PTT_REJECT },
        { value: "19", label: "Wait Create SO", count: dataCount.WAIT_CREATE_SO },
        { value: "20", label: "SO With Error", count: dataCount.CREATE_SO_ERROR },
        { value: "21", label: "Cancel SO ERROR", count: dataCount.CANCEL_SO_ERROR },
        { value: "4", label: "Wait Create Billing", count: dataCount.WAIT_FOR_CREATE_BILLING },
        { value: "5", label: "Wait SAP Result", count: dataCount.WAIT_FOR_SAP_RESULT },
        { value: "6", label: "Billing With Error", count: dataCount.BILLING_WITH_ERROR },
        { value: "7", label: "Create Billing Success", count: dataCount.BILLING_WITH_SUCCESS },
        { value: "-1", label: "Wait SAP Result : Cancel", count: dataCount.WAIT_FOR_SAP_RESULT_CANCEL },
        { value: "-2", label: "Cancel Error", count: dataCount.BILLING_WITH_ERROR_CANCEL },
    ], [dataCount])

    const handleTableActionClick = useCallback(
        async (actionTitle: string, rowId: number) => {
            const actionType = actionTitle.toLowerCase()
            if (actionType === 'log') {
                setOpenModal(true)
                setIsLogLoading(true)
                try {
                    const logs = await fetchCreateBillingLogById(rowId)
                    setLogData(logs)
                } catch (error) {
                    console.log('Failed to load create billing log:', error)
                    setLogData([])
                } finally {
                    setIsLogLoading(false)
                }
                return
            }
            if (actionType === 'log cancel so') {
                setOpenCancelSoLogModal(true)
                setIsCancelSoLogLoading(true)
                try {
                    const logs = await fetchCancelSoLogById(rowId)
                    setCancelSoLogData(logs)
                } catch (error) {
                    console.log('Failed to load cancel so log:', error)
                    setCancelSoLogData([])
                } finally {
                    setIsCancelSoLogLoading(false)
                }
            }
        },
        []
    )

    const columns = useMemo<ColumnDef<CreateBillingItem>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        id="chkBillingAll"
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                size: 50,
            },
            { accessorKey: 'date', header: 'Date', size: 100 },
            { accessorKey: 'customer', header: 'Customer', size: 250 },
            { accessorKey: 'supplier', header: 'Supplier', size: 100 },
            { accessorKey: 'plant', header: 'Plant', size: 80 },
            { accessorKey: 'sloc', header: 'SLOC', size: 80 },
            { accessorKey: 'contractNo', header: 'Contract/Quotation No', size: 150 },
            { accessorKey: 'qtyKg', header: 'Qty (Kg.)', size: 100 },
            { accessorKey: 'qtyTon', header: 'Qty (Ton)', size: 100 },
            { accessorKey: 'qtyMmb', header: 'Qty (MMB)', size: 100 },
            { accessorKey: 'grPostingDate', header: 'GR Posting Date', size: 120 },
            { accessorKey: 'grQtyMmb', header: 'GR Qty.(MMB)', size: 120 },
            { accessorKey: 'additionalGrQtyTon', header: 'Additional GR Qty.(TON)', size: 150 },
            { accessorKey: 'gainLossQtyMmb', header: 'Gain/Loss QTY(MMB)', size: 150 },
            { accessorKey: 'price', header: 'Price', size: 100 },
            { accessorKey: 'transportCost', header: 'ค่าขนส่ง', size: 100 },
            {
                accessorKey: 'invoiceStatus',
                header: 'Invoice Status',
                cell: ({ row }) => (
                    <Badge className={`text-xs rounded-full py-0.5 px-2 justify-center ${row.original.invoiceStatus === 'Completed' ? 'bg-success text-white' :
                            row.original.invoiceStatus === 'Pending' ? 'bg-warning text-white' : 'bg-error text-white'
                        }`}>
                        {row.original.invoiceStatus}
                    </Badge>
                ),
                size: 150,
            },
            { accessorKey: 'soDocNo', header: 'SO Doc No.', size: 120 },
            { accessorKey: 'doNo', header: 'Do No.', size: 120 },
            { accessorKey: 'giDoc', header: 'GI Doc.', size: 120 },
            { accessorKey: 'billNo', header: 'Bill No.', size: 120 },
            { accessorKey: 'fiDocNo', header: 'FI Doc. No.', size: 120 },
            { accessorKey: 'gainLossDocNo', header: 'Gain/Loss Document No.', size: 150 },
            { accessorKey: 'gainLossDocYear', header: 'Gain/Loss Document Year', size: 150 },
            { accessorKey: 'blNo', header: 'B/L No(Ref.No)', size: 150 },
            { accessorKey: 'ocrStatus', header: 'OCR Status', size: 100 },
            {
                id: 'action',
                header: 'Action',
                enableSorting: false,
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className='h-7 w-7 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer'>
                                <TbDotsVertical size={16} />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-48'>
                            {tableActionData.map((action) => (
                                <DropdownMenuItem
                                    key={action.listtitle}
                                    onSelect={() =>
                                        void handleTableActionClick(action.listtitle, row.original.id)
                                    }
                                    className='flex gap-3 items-center'>
                                    <Icon icon={action.icon} height={18} />
                                    <span>{action.listtitle}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
                size: 80,
            },
            { accessorKey: 'poSaNo', header: 'PO/SA NO', size: 120 },
            { accessorKey: 'grDoc', header: 'GR Doc.', size: 120 },
            { accessorKey: 'year', header: 'Year', size: 80 },
        ],
        []
    )

    // React Table Setup
    const table = useReactTable({
        data: billdata,
        columns,
        getRowId: (row) => String(row.id),
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: paginationOptions[0] || 5 } },
    })

    // Mur List Data & Config
    const [murSorting, setMurSorting] = useState<SortingState>([])
    const murColumns = useMemo<ColumnDef<MurItem>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        id="chkBillingMurAll"
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                size: 50,
            },
            { accessorKey: 'finalFlag', header: 'Final Flag', size: 50 },
            { accessorKey: 'date', header: 'Date', size: 50 },
            { accessorKey: 'customer', header: 'Customer', size: 250 },
            { accessorKey: 'supplier', header: 'Supplier', size: 50 },
            { accessorKey: 'plant', header: 'Plant', size: 50 },
            { accessorKey: 'sloc', header: 'SLOC', size: 50 },
            { accessorKey: 'contractNo', header: 'Contract/Quotation No', size: 50 },
            { accessorKey: 'qtyKg', header: 'Qty (Kg.)', size: 50 },
            { accessorKey: 'qtyTon', header: 'Qty (Ton)', size: 50 },
            { accessorKey: 'qtyMmb', header: 'Qty (MMB)', size: 50 },
            { accessorKey: 'price', header: 'Price', size: 50 },
            { accessorKey: 'transportCost', header: 'ค่าขนส่ง', size: 50 },
            {
                accessorKey: 'billingStatus',
                header: 'Billing Status',
                cell: ({ row }) => (
                    <Badge className={`text-xs rounded-full py-0.5 px-2 justify-center ${row.original.billingStatus === 'Completed' ? 'bg-success text-white' : 'bg-warning text-white'
                        }`}>
                        {row.original.billingStatus}
                    </Badge>
                ),
                size: 150,
            },
            {
                accessorKey: 'invoiceStatus',
                header: 'Invoice Status',
                cell: ({ row }) => (
                    <Badge className={`text-xs rounded-full py-0.5 px-2 justify-center ${row.original.invoiceStatus === 'Completed' ? 'bg-success text-white' :
                            row.original.invoiceStatus === 'Pending' ? 'bg-warning text-white' : 'bg-error text-white'
                        }`}>
                        {row.original.invoiceStatus}
                    </Badge>
                ),
                size: 150,
            },
            { accessorKey: 'actualQty', header: 'Actual Qty', size: 50 },
            { accessorKey: 'murCapInYear', header: 'MUR Cap in Year', size: 50 },
            { accessorKey: 'accumMur', header: 'Accum MUR', size: 50 },
            { accessorKey: 'outstandingMur', header: 'Outstanding MUR', size: 50 },
            { accessorKey: 'outstandingTopAmt', header: 'Outstanding TOP Amt', size: 50 },
            { accessorKey: 'currentMurQty', header: 'Current MUR Qty', size: 50 },
            { accessorKey: 'murAmount', header: 'MUR Amount', size: 50 },
            { accessorKey: 'excessQty', header: 'Excess QTY', size: 60 },
            { accessorKey: 'excessAmount', header: 'Excess Amount', size: 60 },
            { accessorKey: 'soDocNo', header: 'SO DOC NO', size: 60 },
            { accessorKey: 'blNo', header: 'B/L No(Ref.No)', size: 150 },
            {
                id: 'action',
                header: 'Action',
                enableSorting: false,
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className='h-7 w-7 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer'>
                                <TbDotsVertical size={16} />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-48'>
                            {tableActionData.map((action) => (
                                <DropdownMenuItem
                                    key={action.listtitle}
                                    onSelect={() =>
                                        void handleTableActionClick(action.listtitle, row.original.id)
                                    }
                                    className='flex gap-3 items-center'>
                                    <Icon icon={action.icon} height={18} />
                                    <span>{action.listtitle}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
                size: 100,
            },
            { accessorKey: 'poSaNo', header: 'PO/SA NO', size: 100 },
            { accessorKey: 'grDoc', header: 'GR Doc.', size: 100 },
            { accessorKey: 'year', header: 'Year', size: 100 },
        ],
        []
    );
    const murTable = useReactTable({
        data: murData,
        columns: murColumns,
        getRowId: (row) => String(row.id),
        state: { sorting: murSorting },
        onSortingChange: setMurSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: paginationOptions[0] || 5 } },
    })

    const murTabsConfig = useMemo(() => [
        { value: "8", label: "Wait SAP Result : Cal MUR", count: dataCountMUR.WAIT_SAP_CAL_MUR },
        { value: "9", label: "Cal MUR Error", count: dataCountMUR.CAL_MUR_ERROR },
        { value: "10", label: "Cal MUR Success", count: dataCountMUR.CAL_MUR_SUCCESS },
        { value: "11", label: "Wait SAP Result : Generate MUR", count: dataCountMUR.WAIT_GENERATE_MUR },
        { value: "12", label: "Generate MUR Error", count: dataCountMUR.GENERATE_MUR_ERROR },
        { value: "13", label: "Generate MUR Success", count: dataCountMUR.GENERATE_MUR_SUCCESS },
        { value: "14", label: "Wait SAP Result : Create MUR", count: dataCountMUR.WAIT_CREATE_MUR },
        { value: "15", label: "Create MUR Error", count: dataCountMUR.CREATE_MUR_ERROR },
        { value: "16", label: "Create MUR Success", count: dataCountMUR.CREATE_MUR_SUCCESS },
        { value: "17", label: "Wait SAP Result : Cancel MUR", count: dataCountMUR.WAIT_CANCEL_MUR },
        { value: "18", label: "Cancel MUR Error", count: dataCountMUR.CANCEL_MUR_ERROR },
    ], [dataCountMUR])

    useEffect(() => {
        let isMounted = true

        const loadCreateBillingPage = async () => {
            setIsLoading(true)
            try {
                const [billingList, murList, billingCount, murCount] =
                    await Promise.all([
                        fetchCreateBillingList(),
                        fetchMurList(),
                        fetchCreateBillingCount(),
                        fetchMurCount(),
                    ])

                if (!isMounted) {
                    return
                }

                setBilldata(billingList)
                setMurData(murList)
                setDataCount(billingCount)
                setDataCountMUR(murCount)
            } catch (error) {
                console.log('Failed to load create billing page data:', error)
                if (!isMounted) {
                    return
                }
                setBilldata([])
                setMurData([])
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        void loadCreateBillingPage()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <>
            <div className="w-full space-y-5">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="w-6 h-6" /> CreateBilling
                    </h3>
                </div>
                {/* Search Condition */}
                <div className='grid gap-6 grid-cols-1 '>
                    <div className='flex flex-col gap-6'>
                        {/* Default Inputs */}
                        {isLoading ? (
                            <div className='rounded-xl border border-border md:p-6 p-4 animate-pulse'>
                                <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'></div>
                                <div className='flex flex-col gap-6'>
                                    {[...Array(7)].map((_, index) => (
                                        <div key={index}>
                                            <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
                                            <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 rounded'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700'>
                                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
                                    {/* Customer */}
                                    {/* <div className="space-y-1">
                                        <Label htmlFor='countries' className="text-xs">Customer</Label>
                                        <Select>
                                            <SelectTrigger className='h-8 w-full text-xs'>
                                                <SelectValue placeholder='Select an option' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='us' className="text-xs">United States</SelectItem>
                                                <SelectItem value='ca' className="text-xs">Canada</SelectItem>
                                                <SelectItem value='fr' className="text-xs">France</SelectItem>
                                                <SelectItem value='de' className="text-xs">Germany</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                    {/* Customer2 Multi Select */}
                                    <MultiSelect options={customer2Options} />

                                    {/* Datepicker */}
                                    <DateRangeField />
                                    {/* Basic Input */}
                                    <div className="space-y-1">
                                        <Label htmlFor='name' className="text-xs">B/L (Ref.No)</Label>
                                        <Input id='name' type='text' required className='h-8 text-xs w-full' />
                                    </div>

                                    {/* Buttons */}
                                    <div className='flex justify-end gap-2'>
                                        <Button
                                            size='sm'
                                            className='bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs'>
                                            <Icon icon='solar:magnifer-linear' width='14' height='14' className="mr-2" /> Search
                                        </Button>
                                        <Button
                                            size='sm'
                                            variant='outline'
                                            className='h-8 text-xs'>
                                            <Icon icon='solar:add-circle-bold' width='14' height='14' className="mr-2" /> Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Create Billing List */}
                <div className='grid gap-6 grid-cols-1 mt-6 '>
                    <div className='flex flex-col gap-6'>
                        {isLoading ? (
                            <div className='rounded-xl border border-border md:p-6 p-4 animate-pulse'>
                                <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'></div>
                                <div className='flex flex-col gap-6'>
                                    {[...Array(7)].map((_, index) => (
                                        <div key={index}>
                                            <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
                                            <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 rounded'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700'>
                                <h5 className='card-title'> Create Billing List</h5>
                                <div className='grid grid-cols-1 gap-6 mt-6'>
                                    {/* button event */}
                                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2">
                                        <div>
                                            <Button variant="outline" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:download-minimalistic-outline" width="14" height="14" />
                                                Download Text File
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            <Button variant="outline" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:calculator-minimalistic-linear" width="14" height="14" />
                                                OCR Cal
                                            </Button>
                                            <Button variant="success" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:document-add-linear" width="14" height="14" />
                                                Create SO
                                            </Button>
                                            <Button
                                                variant="error"
                                                className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:close-circle-linear" width="14" height="14" />
                                                Cancel SO
                                            </Button>
                                            <Button variant="success" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:check-circle-linear" width="14" height="14" />
                                                Approve
                                            </Button>
                                            <Button variant="error" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:close-circle-linear" width="14" height="14" />
                                                Reject
                                            </Button>
                                            <Button variant="secondary" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs px-2">
                                                <Icon icon="solar:restart-linear" width="14" height="14" />
                                                Revert
                                            </Button>
                                            <Button variant="warning" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:close-circle-linear" width="14" height="14" />
                                                Cancel
                                            </Button>
                                            <Button variant="default" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:file-text-linear" width="14" height="14" />
                                                Create Billing
                                            </Button>
                                            <Button variant="info" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:calculator-minimalistic-linear" width="14" height="14" />
                                                Create MUR
                                            </Button>
                                        </div>
                                    </div>

                                    {/* tab */}
                                    <div className="col-span-1 sm:col-span-2">
                                        <hr className='p-2'></hr>
                                        <Tabs
                                            value={activeBillingTab}
                                            onValueChange={setActiveBillingTab}
                                            className="w-full">
                                            {/* Design 1: Button Outline (Original) */}
                                            {/* <div className="mb-6">
                                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Design 1: Button Outline (Original)</h3>
                                                <TabsList className="flex flex-wrap h-auto w-full justify-start gap-2 bg-transparent p-0">
                                                    {tabsConfig.map((tab) => (
                                                        <TabsTrigger
                                                            key={tab.value}
                                                            value={tab.value}
                                                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border h-8 text-xs px-3 rounded-md transition-all"
                                                        >
                                                            {tab.label} ({tab.count})
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div> */}

                                            {/* Design 2: Underline */}
                                            {/* <div className="mb-6">
                                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Design 2: Underline</h3>
                                                <TabsList className="flex flex-wrap h-auto w-full justify-start gap-6 bg-transparent p-0 border-b border-border rounded-none">
                                                    {tabsConfig.map((tab) => (
                                                        <TabsTrigger
                                                            key={tab.value}
                                                            value={tab.value}
                                                            className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-9 text-xs px-1 bg-transparent shadow-none hover:text-primary transition-colors"
                                                        >
                                                            {tab.label} <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{tab.count}</span>
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div> */}

                                            {/* Design 3: Segmented Pill */}
                                            {/* <div className="mb-6">
                                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Design 3: Segmented Pill</h3>
                                                <TabsList className="flex flex-wrap h-auto w-fit justify-start gap-1 bg-muted/50 p-1 rounded-lg">
                                                    {tabsConfig.map((tab) => (
                                                        <TabsTrigger
                                                            key={tab.value}
                                                            value={tab.value}
                                                            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-7 text-xs px-3 rounded-md"
                                                        >
                                                            {tab.label} ({tab.count})
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div> */}

                                            {/* Design 4: Soft Badges */}
                                            <div className="mb-6">
                                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Billing Status </h3>
                                                <TabsList className="flex flex-wrap h-auto w-full justify-start gap-2 bg-transparent p-0">
                                                    {tabsConfig.map((tab) => (
                                                        <TabsTrigger
                                                            key={tab.value}
                                                            value={tab.value}
                                                            className="group data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 border border-transparent h-9 text-xs px-4 rounded-full hover:bg-muted transition-all"
                                                        >
                                                            {tab.label}
                                                            <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-bold text-muted-foreground group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground transition-colors">
                                                                {tab.count}
                                                            </span>
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div>

                                            <TabsContent value={activeBillingTab}>

                                                <hr className='p-2'></hr>
                                                {/* table */}
                                                {/* <h3 className="text-lg font-medium">Content for Tab {val}</h3>
                                                    <p className="text-sm text-muted-foreground">Displaying data for status {val}</p> */}
                                                <div className='overflow-x-auto border rounded-md border-ld'>
                                                    <Table>
                                                        <TableHeader>
                                                            {table.getHeaderGroups().map((headerGroup) => (
                                                                <TableRow key={headerGroup.id}>
                                                                    {headerGroup.headers.map((header) => (
                                                                        <TableHead
                                                                            key={header.id}
                                                                            className={`select-none px-2 text-center text-xs whitespace-nowrap ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                                                            style={{ minWidth: header.getSize() }}
                                                                        >
                                                                            {header.isPlaceholder ? null : (
                                                                                header.column.getCanSort() ? (
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        className='flex items-center justify-center gap-1 p-2 bg-transparent hover:bg-transparent text-foreground font-semibold w-full h-full text-xs'
                                                                                        onClick={header.column.getToggleSortingHandler()}>
                                                                                        {flexRender(
                                                                                            header.column.columnDef.header,
                                                                                            header.getContext()
                                                                                        )}
                                                                                        {{
                                                                                            asc: <ArrowUp className='w-3 h-3' />,
                                                                                            desc: <ArrowDown className='w-3 h-3' />,
                                                                                        }[header.column.getIsSorted() as string] ??
                                                                                            <ChevronsUpDown className='w-3 h-3' />
                                                                                        }
                                                                                    </Button>
                                                                                ) : (
                                                                                    <div className='flex items-center justify-center gap-1 p-2 text-foreground font-semibold w-full h-full text-xs'>
                                                                                        {flexRender(
                                                                                            header.column.columnDef.header,
                                                                                            header.getContext()
                                                                                        )}
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
                                                                    <TableRow key={row.id} className='group/row bg-transparentodd:bg-transparent even:bg-lightprimary dark:even:bg-lightprimary'>
                                                                        {row.getVisibleCells().map((cell) => (
                                                                            <TableCell key={cell.id} className='text-center whitespace-nowrap text-xs py-2 px-2'>
                                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                ))
                                                            ) : (
                                                                <TableRow>
                                                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                                                        No data available
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                {/* Pagination Controls */}
                                                <DataTablePagination table={table} pageSizeOptions={paginationOptions} />


                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

                {/* Mur List */}
                <div className='grid gap-6 grid-cols-1 mt-6 '>
                    <div className='flex flex-col gap-6'>
                        {isLoading ? (
                            <div className='rounded-xl border border-border md:p-6 p-4 animate-pulse'>
                                <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'></div>
                                <div className='flex flex-col gap-6'>
                                    {[...Array(7)].map((_, index) => (
                                        <div key={index}>
                                            <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
                                            <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 rounded'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700'>
                                <h5 className='card-title'> Mur List</h5>
                                <div className='grid grid-cols-1 gap-6 mt-6'>
                                    {/* button event */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            <Button variant="success" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:document-add-linear" width="14" height="14" />
                                                Generate MUR
                                            </Button>
                                            <Button variant="secondary" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs px-2">
                                                <Icon icon="solar:restart-linear" width="14" height="14" />
                                                Revert
                                            </Button>
                                            <Button variant="warning" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:close-circle-linear" width="14" height="14" />
                                                Cancel
                                            </Button>
                                            <Button variant="default" className="gap-1 h-8 text-xs px-2">
                                                <Icon icon="solar:file-text-linear" width="14" height="14" />
                                                Confirm Create MUR
                                            </Button>
                                        </div>
                                    </div>

                                    {/* tab */}
                                    <div className="col-span-1 sm:col-span-2">
                                        <hr className='p-2'></hr>
                                        <Tabs
                                            value={activeMurTab}
                                            onValueChange={setActiveMurTab}
                                            className="w-full">
                                            <div className="mb-6">
                                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Mur Status </h3>
                                                <TabsList className="flex flex-wrap h-auto w-full justify-start gap-2 bg-transparent p-0">
                                                    {murTabsConfig.map((tab) => (
                                                        <TabsTrigger
                                                            key={tab.value}
                                                            value={tab.value}
                                                            className="group data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 border border-transparent h-9 text-xs px-4 rounded-full hover:bg-muted transition-all"
                                                        >
                                                            {tab.label}
                                                            <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-bold text-muted-foreground group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground transition-colors">
                                                                {tab.count}
                                                            </span>
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div>

                                            <TabsContent value={activeMurTab}>

                                                <hr className='p-2'></hr>
                                                {/* table */}
                                                {/* <h3 className="text-lg font-medium">Content for Tab {val}</h3>
                                                    <p className="text-sm text-muted-foreground">Displaying data for status {val}</p> */}
                                                <div className='overflow-x-auto border rounded-md border-ld'>
                                                    <Table>
                                                        <TableHeader>
                                                            {murTable.getHeaderGroups().map((headerGroup) => (
                                                                <TableRow key={headerGroup.id}>
                                                                    {headerGroup.headers.map((header) => (
                                                                        <TableHead
                                                                            key={header.id}
                                                                            className={`select-none px-2 text-center text-xs whitespace-nowrap ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                                                            style={{ minWidth: header.getSize() }}
                                                                        >
                                                                            {header.isPlaceholder ? null : (
                                                                                header.column.getCanSort() ? (
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        className='flex items-center justify-center gap-1 p-2 bg-transparent hover:bg-transparent text-foreground font-semibold w-full h-full text-xs'
                                                                                        onClick={header.column.getToggleSortingHandler()}>
                                                                                        {flexRender(
                                                                                            header.column.columnDef.header,
                                                                                            header.getContext()
                                                                                        )}
                                                                                        {{
                                                                                            asc: <ArrowUp className='w-3 h-3' />,
                                                                                            desc: <ArrowDown className='w-3 h-3' />,
                                                                                        }[header.column.getIsSorted() as string] ??
                                                                                            <ChevronsUpDown className='w-3 h-3' />
                                                                                        }
                                                                                    </Button>
                                                                                ) : (
                                                                                    <div className='flex items-center justify-center gap-1 p-2 text-foreground font-semibold w-full h-full text-xs'>
                                                                                        {flexRender(
                                                                                            header.column.columnDef.header,
                                                                                            header.getContext()
                                                                                        )}
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </TableHead>
                                                                    ))}
                                                                </TableRow>
                                                            ))}
                                                        </TableHeader>

                                                        <TableBody>
                                                            {murTable.getRowModel().rows?.length ? (
                                                                murTable.getRowModel().rows.map((row) => (
                                                                    <TableRow key={row.id} className='group/row bg-transparentodd:bg-transparent even:bg-lightprimary dark:even:bg-lightprimary'>
                                                                        {row.getVisibleCells().map((cell) => (
                                                                            <TableCell key={cell.id} className='text-center whitespace-nowrap text-xs py-2 px-2'>
                                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                ))
                                                            ) : (
                                                                <TableRow>
                                                                    <TableCell colSpan={murColumns.length} className="h-24 text-center">
                                                                        No data available
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                {/* Pagination Controls */}
                                                <DataTablePagination table={murTable} pageSizeOptions={paginationOptions} />


                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalLog
                open={openModal}
                onOpenChange={setOpenModal}
                title='Create Billing Log'
                columns={logColumns}
                data={logData}
                pageSizeOptions={paginationOptions}
                emptyText={isLogLoading ? 'Loading log...' : 'No data available'}
                disableAnimation
                forceMount
            />
            <ModalLog
                open={openCancelSoLogModal}
                onOpenChange={setOpenCancelSoLogModal}
                title='Cancel SO Log'
                columns={cancelSoLogColumns}
                data={cancelSoLogData}
                pageSizeOptions={paginationOptions}
                wrapColumnIds={['message']}
                emptyText={isCancelSoLogLoading ? 'Loading log...' : 'No data available'}
                disableAnimation
                forceMount
            />
        </>
    )
}

export default CreateBilling
