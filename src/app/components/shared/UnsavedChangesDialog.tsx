'use client'

import { useCallback, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export type UnsavedChangesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void | Promise<void>
  onReject?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  title?: string
  description?: string
  confirmText?: string
  rejectText?: string
  cancelText?: string
  showRejectButton?: boolean
  showCancelButton?: boolean
}

type UnsavedAction = () => void | Promise<void>

type UseUnsavedChangesGuardOptions = {
  hasUnsavedChanges: boolean
  isSaving: boolean
  onSave: () => Promise<boolean>
  onDiscard?: () => void
}

export function useUnsavedChangesGuard({
  hasUnsavedChanges,
  isSaving,
  onSave,
  onDiscard,
}: UseUnsavedChangesGuardOptions) {
  const [unsavedDialogOpen, setUnsavedDialogOpen] = useState(false)
  const pendingActionRef = useRef<UnsavedAction | null>(null)

  const runActionWithUnsavedGuard = useCallback(
    (action: UnsavedAction) => {
      if (!hasUnsavedChanges || isSaving) {
        void action()
        return
      }

      pendingActionRef.current = action
      setUnsavedDialogOpen(true)
    },
    [hasUnsavedChanges, isSaving]
  )

  const handleUnsavedDialogConfirm = useCallback(async () => {
    const pendingAction = pendingActionRef.current
    pendingActionRef.current = null

    const isSaved = await onSave()
    if (!isSaved || !pendingAction) {
      return
    }

    await pendingAction()
  }, [onSave])

  const handleUnsavedDialogReject = useCallback(async () => {
    const pendingAction = pendingActionRef.current
    pendingActionRef.current = null
    onDiscard?.()

    if (!pendingAction) {
      return
    }

    await pendingAction()
  }, [onDiscard])

  const handleUnsavedDialogCancel = useCallback(() => {
    pendingActionRef.current = null
    setUnsavedDialogOpen(false)
  }, [])

  const handleUnsavedDialogOpenChange = useCallback((open: boolean) => {
    setUnsavedDialogOpen(open)
    if (!open) {
      pendingActionRef.current = null
    }
  }, [])

  return {
    unsavedDialogOpen,
    runActionWithUnsavedGuard,
    handleUnsavedDialogConfirm,
    handleUnsavedDialogReject,
    handleUnsavedDialogCancel,
    handleUnsavedDialogOpenChange,
  }
}

export default function UnsavedChangesDialog({
  open,
  onOpenChange,
  onConfirm,
  onReject,
  onCancel,
  title = 'Question ?',
  description = 'Details changed. Do you want to save ?',
  confirmText = 'Yes',
  rejectText = 'No',
  cancelText = 'Cancel',
  showRejectButton = true,
  showCancelButton = true,
}: UnsavedChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-base'>
            <Info className='h-4 w-4 text-info' />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className='justify-end'>
          {showCancelButton ? (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                void onCancel?.()
                onOpenChange(false)
              }}>
              {cancelText}
            </Button>
          ) : null}

          {showRejectButton ? (
            <Button
              size='sm'
              variant='warning'
              onClick={() => {
                void onReject?.()
                onOpenChange(false)
              }}>
              {rejectText}
            </Button>
          ) : null}

          <Button
            size='sm'
            variant='success'
            onClick={() => {
              void onConfirm()
              onOpenChange(false)
            }}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
