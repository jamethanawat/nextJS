import BreadcrumbComp from '@/app/(Pages)/layout/shared/breadcrumb/BreadcrumbComp'
import React from 'react'
import type { Metadata } from 'next'
import CreateBilling from '@/app/components/transaction/CreateBilling'
import Contract from '@/app/components/master/contract'
export const metadata: Metadata = {
  title: 'Contract/Quotation No',
}

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Contract/Quotation No',
  },
]
const Page = () => {

  return (
    <>
    {/* <BreadcrumbComp title='Contract/Quotation List' items={BCrumb} /> */}
       <Contract/>
    </>
  )
}
export default Page
