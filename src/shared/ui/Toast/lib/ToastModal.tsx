export type ToastType = {
  id: string
  headerText: string
  detailsText?: string
  type: 'info' | 'success' | 'warning' | 'error'
}
