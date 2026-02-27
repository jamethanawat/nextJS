import BreadcrumbComp from '@/app/(Pages)/layout/shared/breadcrumb/BreadcrumbComp'
import React from 'react'
import type { Metadata } from 'next'
import CreateBilling from '@/app/components/transaction/CreateBilling'

export const metadata: Metadata = {
  title: 'CreateBilling',
}

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'CreateBilling',
  },
]
const Page = () => {

  return (
    <>
    {/* <BreadcrumbComp title='CreateBilling' items={BCrumb} /> */}
       <CreateBilling/>
    </>
  )
}
export default Page
