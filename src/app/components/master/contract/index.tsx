
'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Save, ChevronRight, Settings, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataTablePagination } from '@/app/components/shared/DataTablePagination'
import {
    fetchContractCustomers,
    fetchContractDistrChan,
    fetchContractList,
    fetchContractShipTo,
} from '@/app/services/contractService'
import type {
    ContractCustomer,
    ContractData,
    ContractDistrChan,
    ContractShipTo,
} from '@/app/types/contract'

const Contract = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [keyword, setKeyword] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<ContractData>>({});
    const [sorting, setSorting] = useState<SortingState>([])
    const [contractList, setContractList] = useState<ContractData[]>([])
    const [customers, setCustomers] = useState<ContractCustomer[]>([])
    const [shipToList, setShipToList] = useState<ContractShipTo[]>([])
    const [distrChanList, setDistrChanList] = useState<ContractDistrChan[]>([])

    // Filter Logic
    const filteredList = useMemo(() => {
        if (!keyword) return contractList;
        const lowerKeyword = keyword.toLowerCase();
        return contractList.filter(item =>
            item.saNo.toLowerCase().includes(lowerKeyword) || 
            item.customerName.toLowerCase().includes(lowerKeyword)
        );
    }, [keyword, contractList]);

    useEffect(() => {
        let isMounted = true

        const loadContractData = async () => {
            setIsLoading(true)
            try {
                const [contracts, customerOptions, shipToOptions, distrChanOptions] =
                    await Promise.all([
                        fetchContractList(),
                        fetchContractCustomers(),
                        fetchContractShipTo(),
                        fetchContractDistrChan(),
                    ])

                if (!isMounted) {
                    return
                }

                setContractList(contracts)
                setCustomers(customerOptions)
                setShipToList(shipToOptions)
                setDistrChanList(distrChanOptions)
            } catch (error) {
                console.log('Failed to load contract page data:', error)
                if (!isMounted) {
                    return
                }
                setContractList([])
                setCustomers([])
                setShipToList([])
                setDistrChanList([])
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        void loadContractData()

        return () => {
            isMounted = false
        }
    }, [])

    // Table Columns
    const columns = useMemo<ColumnDef<ContractData>[]>(
        () => [
            {
                id: 'index',
                header: 'No.',
                cell: ({ row, table }) => {
                    return <div className="text-center">{row.index + 1 + (table.getState().pagination.pageIndex * table.getState().pagination.pageSize)}</div>;
                },
                size: 20,
                enableSorting: false,
            },
            { accessorKey: 'saNo', header: 'Contract NO' },
            { accessorKey: 'customerName', header: 'Customer' },
            { accessorKey: 'startDate', header: 'Start Date' },
            { accessorKey: 'endDate', header: 'End Date' },
            { accessorKey: 'plant', header: 'Plant' },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => (
                    <Badge className={`px-2 py-0.5 rounded-full text-xs justify-center ${row.original.isActive ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}`}>
                        {row.original.status}
                    </Badge>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: filteredList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        state: { sorting },
    })

    // Handlers
    const handleRowClick = (item: ContractData) => {
        setSelectedId(item.id);
        setFormData({ ...item });
    };

    const handleInputChange = (field: keyof ContractData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleClear = () => {
        setSelectedId(null);
        setFormData({});
    }

    if (isLoading) {
        return (
            <div className="w-full space-y-5">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Settings className="w-6 h-6" /> Contract/Quotation List
                    </h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
                        <div className="space-y-2">
                            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="flex gap-2">
                                <div className="h-8 flex-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-pulse">
                        <div className="h-6 w-56 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="space-y-2">
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-pulse">
                        <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="grid grid-cols-4 gap-3 items-center">
                                    <div className="col-span-2 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="col-span-2 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Settings className="w-6 h-6" /> Contract/Quotation List
                </h3>
            </div>

            {/* Search Condition */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="keyword" className="text-xs">Keyword</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="keyword" 
                                placeholder="Search Contract No, Customer Name..." 
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="text-xs h-8"
                            />
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Search className="w-4 h-4 mr-2" /> Search
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={handleClear}><Plus className="w-4 h-4 mr-2" /> Add</Button>
                        <Button size="sm" variant="outline" disabled={!selectedId}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={!selectedId}><Save className="w-4 h-4 mr-2" /> Save</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left: List */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <ChevronRight className="w-5 h-5" /> Contract/Quotation List
                    </h4>
                    <div className="overflow-auto flex-1 border rounded-md border-ld">
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
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {{
                                                                asc: <ArrowUp className='w-3 h-3' />,
                                                                desc: <ArrowDown className='w-3 h-3' />,
                                                            }[header.column.getIsSorted() as string] ??
                                                                <ChevronsUpDown className='w-3 h-3' />
                                                            }
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
                                            onClick={() => handleRowClick(row.original)}
                                            className={`cursor-pointer border-b hover:bg-blue-50 dark:hover:bg-gray-700 ${selectedId === row.original.id ? 'bg-blue-100 dark:bg-gray-600' : ''}`}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-center whitespace-nowrap text-xs py-2 px-2">
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
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <DataTablePagination table={table} pageSizeOptions={[5, 10, 20, 30]} />
                </div>

                {/* Right: Information Form */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <ChevronRight className="w-5 h-5" /> Contract/Quotation Information
                    </h4>
                    
                    <div className="space-y-4">
                        {/* Contract NO */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Contract/Quotation NO :</Label>
                            <div className="col-span-2">
                                <Input 
                                    value={formData.saNo || ''} 
                                    onChange={(e) => handleInputChange('saNo', e.target.value)}
                                    maxLength={10}
                                    className="text-xs h-8 w-full"
                                />
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Customer Name :</Label>
                            <div className="col-span-2">
                                <Select 
                                    value={formData.customerId} 
                                    onValueChange={(val) => handleInputChange('customerId', val)}
                                >
                                    <SelectTrigger className="text-xs h-8 w-full">
                                        <SelectValue placeholder="Select Customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Ship To */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Ship To :</Label>
                            <div className="col-span-2">
                                <Select 
                                    value={formData.shipToId} 
                                    onValueChange={(val) => handleInputChange('shipToId', val)}
                                >
                                    <SelectTrigger className="text-xs h-8 w-full">
                                        <SelectValue placeholder="Select Ship To" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {shipToList.map(s => (
                                            <SelectItem key={s.id} value={s.id} className="text-xs">{s.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Transport Price (Radio) */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">ระบุค่าขนส่ง :</Label>
                            <div className="col-span-2 flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="isPriceTransport"
                                        checked={formData.isPriceTransport === true}
                                        onChange={() => handleInputChange('isPriceTransport', true)}
                                        className="accent-blue-600"
                                    />
                                    <span>ระบุ</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="isPriceTransport"
                                        checked={formData.isPriceTransport === false}
                                        onChange={() => handleInputChange('isPriceTransport', false)}
                                        className="accent-blue-600"
                                    />
                                    <span>ไม่ระบุ</span>
                                </label>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Start Date :</Label>
                            <div className="col-span-2 relative">
                                <Input 
                                    type="date"
                                    value={formData.startDate || ''}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className="text-xs h-8 w-full"
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">End Date :</Label>
                            <div className="col-span-2 relative ">
                                <Input 
                                    type="date"
                                    value={formData.endDate || ''}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                    className="text-xs h-8 w-full"
                                />
                            </div>
                        </div>

                        {/* Plant */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Plant :</Label>
                            <div className="col-span-2">
                                <Input 
                                    value={formData.plant || ''}
                                    onChange={(e) => handleInputChange('plant', e.target.value)}
                                    className="text-xs h-8 w-full"
                                />
                            </div>
                        </div>

                        {/* Distribution Channel */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Distribution Channel :</Label>
                            <div className="col-span-2">
                                <Select 
                                    value={formData.distrChan} 
                                    onValueChange={(val) => handleInputChange('distrChan', val)}
                                >
                                    <SelectTrigger className="text-xs h-8 w-full">
                                        <SelectValue placeholder="Select Channel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {distrChanList.map(d => (
                                            <SelectItem key={d.id} value={d.id} className="text-xs">{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Ref Doc Category */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right required text-xs">Reference Document Category :</Label>
                            <div className="col-span-2 flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="refDocCat"
                                        checked={formData.refDocCat === 'G'}
                                        onChange={() => handleInputChange('refDocCat', 'G')}
                                        className="accent-blue-600"
                                    />
                                    <span>Contract</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="refDocCat"
                                        checked={formData.refDocCat === 'B'}
                                        onChange={() => handleInputChange('refDocCat', 'B')}
                                        className="accent-blue-600"
                                    />
                                    <span>Quotation</span>
                                </label>
                            </div>
                        </div>

                        {/* Remark */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-start">
                            <Label className="col-span-2 text-right mt-2 text-xs">Remark :</Label>
                            <div className="col-span-2">
                                <textarea 
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.remark || ''}
                                    onChange={(e) => handleInputChange('remark', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-4 gap-x-4 gap-y-1 items-center">
                            <Label className="col-span-2 text-right text-xs">Status :</Label>
                            <div className="col-span-2 flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="isActive"
                                        checked={formData.isActive === true}
                                        onChange={() => handleInputChange('isActive', true)}
                                        className="accent-blue-600"
                                    />
                                    <span>Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input 
                                        type="radio" 
                                        name="isActive"
                                        checked={formData.isActive === false}
                                        onChange={() => handleInputChange('isActive', false)}
                                        className="accent-blue-600"
                                    />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contract
