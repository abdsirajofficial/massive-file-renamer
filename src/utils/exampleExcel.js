import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// Create example Excel file
const createExampleExcel = () => {
  const data = [
    ['EmployeeID'],
    ['EMP001'],
    ['EMP002'],
    ['EMP003'],
    ['EMP004'],
    ['EMP005'],
    ['EMP006'],
    ['EMP007'],
    ['EMP008'],
    ['EMP009'],
    ['EMP010']
  ]

  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Filenames')
  
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'example-filenames.xlsx'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export { createExampleExcel }
