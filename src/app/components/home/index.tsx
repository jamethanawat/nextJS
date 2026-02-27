'use client'
import React, { useState } from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Icon } from '@iconify/react'
import { format } from "date-fns"

const Home = () => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [selectedInfo, setSelectedInfo] = useState({
        DATE_DISPLAY1: "ตุลาคม 2566",
        PRICE: "350.0000",
        DATEDUBAI1: "01/10/2566",
        DUBAI_PRICE: "85.00",
        DATEEXCHANGERATE1: "01/10/2566",
        EXCHANGE_RATE: "36.50"
    })

    const handleSearch = () => {
        console.log("Search clicked", date)
        // Logic to fetch data based on date
    }

    const dateLabel = date ? format(date, "dd-MM-yyyy") : "DD-MM-YYYY"

    return (
        <div className="grid gap-6 grid-cols-1">
            {/* Search Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-end gap-2">
                    <div className="space-y-1">
                        <Label htmlFor="date" className="text-xs">วันที่</Label>
                        <div className="flex w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="w-full sm:w-[300px] justify-start text-left font-normal h-8 text-xs rounded-lg border-ld bg-transparent text-ld px-3 hover:bg-transparent hover:text-ld"
                                    >
                                        <Icon
                                            icon="solar:calendar-linear"
                                            className={`mr-2 h-4 w-4 ${!date ? "text-muted-foreground" : "text-ld"}`}
                                        />
                                        <span className={`truncate ${!date ? "text-muted-foreground" : "text-ld"}`}>
                                            {dateLabel}
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSearch}>
                        <Icon icon="solar:magnifer-linear" width="14" height="14" className="mr-2" />
                        Search
                    </Button>
                </div>
            </div>

            {/* Display Section */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden relative min-h-[600px]">
                {/* Background Image Simulation */}
                <div 
                    className="absolute inset-0 z-0 opacity-100"
                    style={{ 
                        backgroundImage: "url('/images/home/LNGPrice-bg.png')", 
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat"
                    }}
                />
                
                <div className="absolute inset-4 z-1 flex flex-col items-center justify-center p-8 gap-8 border-2 border-black/10 rounded-lg">
                    {/* Logo */}
                    <div className="mb-4">
                         <div className="w-[100px] h-[100px] flex items-center justify-center">
                            <Image src="/images/logos/PTT_LOGO.png" width={100} height={100} alt="PTT Logo" /> 
                         </div>
                    </div>

                    <div className="text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold ">
                            ราคาขายแอลเอ็นจีตลาดค้าส่งก๊าซธรรมชาติ
                        </h2>
                        
                        <h3 className="text-xl md:text-2xl font-semibold ">
                            ประจำเดือน {selectedInfo.DATE_DISPLAY1}
                        </h3>

                        <div className="text-lg md:text-xl text-foreground">
                            ราคาแอลเอ็นจี (P) &nbsp;
                            <span className="underline decoration-2 underline-offset-4 font-bold text-2xl ">
                                {selectedInfo.PRICE}
                            </span>
                            &nbsp; บาทต่อล้านทีบียู (ไม่รวมภาษีมูลค่าเพิ่ม)
                        </div>
                    </div>

                    <div className="mt-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-border/50 max-w-3xl w-full">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="py-2 text-sm md:text-base text-muted-foreground">
                                        *ราคาน้ำมันดิบดูไบ(Dubai Crude Oil Price) ประจำวันที่ {selectedInfo.DATEDUBAI1} &nbsp;
                                        <span className="underline font-semibold text-foreground">{selectedInfo.DUBAI_PRICE}</span>
                                        &nbsp; USD/Barrel
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 text-sm md:text-base text-muted-foreground">
                                        *อัตราแลกเปลี่ยนสกุลเงินบาทต่อสกุลเงินเหรียญดอลลาร์สหรัฐอเมริกา ประจำวันที่ {selectedInfo.DATEEXCHANGERATE1} &nbsp;
                                        <span className="underline font-semibold text-foreground">{selectedInfo.EXCHANGE_RATE}</span>
                                        &nbsp; บาท/USD
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
