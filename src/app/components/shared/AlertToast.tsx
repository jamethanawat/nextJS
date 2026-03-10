'use client'

import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AlertToastVariant = 'success' | 'error'

type AlertToastProps = {
  open: boolean
  title: string
  description: string
  variant?: AlertToastVariant
  onClose: () => void
  autoHideMs?: number
  className?: string
}

type AlertToastState = {
  open: boolean
  title: string
  description: string
  variant: AlertToastVariant
}

export function useAlertToast() {
  const [state, setState] = useState<AlertToastState>({
    open: false,
    title: '',
    description: '',
    variant: 'success',
  })

  const setMessage = useCallback(
    (variant: AlertToastVariant, title: string, description: string) => {
      setState({
        open: true,
        variant,
        title,
        description,
      })
    },
    []
  )

  const closeMessage = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [])

  return {
    alertState: state,
    setMessage,
    closeMessage,
  }
}

export default function AlertToast({
  open,
  title,
  description,
  variant = 'success',
  onClose,
  autoHideMs = 4000,
  className,
}: AlertToastProps) {
  useEffect(() => {
    if (!open || autoHideMs <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, autoHideMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoHideMs, onClose, open]);

  if (!open) {
    return null;
  }

  const isSuccess = variant === 'success';

  return (
    <div className={cn('fixed top-4 right-4 z-[100] w-full max-w-md', className)}>
      <div
        className={cn(
          'rounded-md border px-4 py-3 shadow-lg',
          isSuccess
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-red-200 bg-red-50 text-red-800'
        )}>
        <div className='flex items-start gap-3'>
          {isSuccess ? (
            <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-600' />
          ) : (
            <AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-red-600' />
          )}
          <div className='min-w-0 flex-1'>
            <p className='text-sm font-semibold'>{title}</p>
            <p className='mt-1 text-sm'>{description}</p>
          </div>
          <button
            type='button'
            className='rounded p-1 hover:bg-black/10'
            onClick={onClose}>
            <X className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
