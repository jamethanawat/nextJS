'use client'

import { cn } from '@/lib/utils'

type ThemedLoadingSpinnerProps = {
  label?: string
  fullScreen?: boolean
  className?: string
}

const ThemedLoadingSpinner = ({
  label = 'Loading...',
  fullScreen = true,
  className,
}: ThemedLoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-background',
        fullScreen ? 'h-screen w-full' : 'h-full w-full',
        className
      )}>
      <div className='relative flex flex-col items-center gap-3'>
        <div className='relative h-16 w-16'>
          <span className='absolute inset-0 rounded-full border-4 border-primary/20' />
          <span className='absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin' />
          <span className='absolute inset-2 rounded-full border-4 border-transparent border-b-secondary border-l-secondary animate-spin [animation-duration:1.2s] [animation-direction:reverse]' />
          <span className='absolute inset-[18px] rounded-full bg-lightprimary ring-1 ring-primary/20' />
        </div>
        <p className='text-xs font-medium tracking-wide text-muted-foreground'>
          {label}
        </p>
      </div>
    </div>
  )
}

export default ThemedLoadingSpinner
