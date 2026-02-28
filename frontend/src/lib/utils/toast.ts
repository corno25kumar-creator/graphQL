import { Toast } from 'primereact/toast'

let toastRef: Toast | null = null

export const setToastRef = (ref: Toast) => {
  toastRef = ref
}

export const showToast = (
  severity: 'success' | 'error' | 'info' | 'warn',
  summary: string,
  detail?: string,
) => {
  toastRef?.show({
    severity,
    summary,
    detail,
    life: 3000,
  })
}