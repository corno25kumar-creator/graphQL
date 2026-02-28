import { useRef, useEffect } from 'react'
import { Toast } from 'primereact/toast'
import { setToastRef } from '@/lib/utils/toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null)

  useEffect(() => {
    if (toast.current) {
      setToastRef(toast.current)
    }
  }, [])

  return (
    <>
      <Toast ref={toast} />
      {children}
    </>
  )
}