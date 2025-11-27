<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12 fade-in">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">PDF Batch Renamer</h1>
        <p class="text-gray-600">Upload PDFs and an Excel file to rename them automatically</p>
      </header>

      <!-- Upload Section -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- PDF Upload -->
        <div class="bg-white rounded-lg shadow-lg p-6 fade-in hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Upload PDF Files
          </h2>
          <div 
            @drop.prevent="handlePdfDrop"
            @dragover.prevent
            @dragenter="pdfDragActive = true"
            @dragleave="pdfDragActive = false"
            :class="{'border-primary bg-primary/5 upload-animation': pdfDragActive, 'border-gray-300': !pdfDragActive}"
            class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-all duration-300"
            @click="$refs.pdfInput.click()"
          >
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-gray-600 mb-2">Drag & drop PDF files here or click to browse</p>
            <p class="text-sm text-gray-500">{{ pdfFiles.length }} file(s) selected</p>
            <input 
              ref="pdfInput"
              type="file" 
              accept=".pdf" 
              multiple 
              @change="handlePdfSelect"
              class="hidden"
            >
          </div>
        </div>

        <!-- Excel Upload -->
        <div class="bg-white rounded-lg shadow-lg p-6 fade-in hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Upload Excel File
          </h2>
          <div 
            @drop.prevent="handleExcelDrop"
            @dragover.prevent
            @dragenter="excelDragActive = true"
            @dragleave="excelDragActive = false"
            :class="{'border-accent bg-accent/5 upload-animation': excelDragActive, 'border-gray-300': !excelDragActive}"
            class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-all duration-300"
            @click="$refs.excelInput.click()"
          >
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-gray-600 mb-2">Drag & drop Excel file (.xlsx or .csv)</p>
            <p class="text-sm text-gray-500">{{ excelFile ? excelFile.name : 'No file selected' }}</p>
            <input 
              ref="excelInput"
              type="file" 
              accept=".xlsx,.xls,.csv" 
              @change="handleExcelSelect"
              class="hidden"
            >
          </div>
        </div>
      </div>

      <!-- Help Section with Example Download -->
      <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-8 fade-in">
        <div class="flex items-start justify-between">
          <div class="flex items-start flex-1">
            <svg class="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="font-medium text-blue-800 mb-1">Excel File Format</p>
              <p class="text-sm text-blue-700">Your Excel file should have <strong>two columns</strong>: "old file name" and "New filename". The first row (header) will be skipped.</p>
            </div>
          </div>
          <button 
            @click="downloadExampleExcel"
            class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 transition-all duration-300 flex items-center whitespace-nowrap download-animation"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Example
          </button>
        </div>
      </div>

      <!-- Process Button -->
      <div class="text-center mb-8">
        <button 
          @click="processFiles"
          :disabled="!canProcess || processing"
          class="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
        >
          <span v-if="!processing">Process Files</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        </button>
      </div>

      <!-- Status Messages -->
      <div v-if="statusMessage" class="mb-8 fade-in">
        <div :class="statusClass" class="rounded-lg p-4 shadow-md">
          <p class="font-medium">{{ statusMessage }}</p>
          <p v-if="statusDetails" class="text-sm mt-1">{{ statusDetails }}</p>
        </div>
      </div>

      <!-- Warning Message -->
      <div v-if="showMemoryWarning" class="mb-8 fade-in">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-md">
          <div class="flex">
            <svg class="w-6 h-6 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="font-medium text-yellow-800">Memory Warning</p>
              <p class="text-sm text-yellow-700 mt-1">You have uploaded a large number of files. Processing may be slow or affect browser performance if total size exceeds 100MB.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Processing Logs -->
      <div v-if="processingLogs.length > 0" class="bg-white rounded-lg shadow-lg p-6 mb-8 fade-in">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Processing Logs
        </h2>
        <div class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <div v-for="(log, index) in processingLogs" :key="index" class="mb-2 last:mb-0">
            <div class="flex items-start text-sm">
              <span 
                :class="{
                  'text-green-600': log.type === 'success',
                  'text-blue-600': log.type === 'info',
                  'text-yellow-600': log.type === 'warning',
                  'text-red-600': log.type === 'error'
                }"
                class="font-mono mr-2 flex-shrink-0"
              >
                {{ log.type === 'success' ? '✓' : log.type === 'error' ? '✗' : log.type === 'warning' ? '⚠' : 'ℹ' }}
              </span>
              <span 
                :class="{
                  'text-green-700': log.type === 'success',
                  'text-blue-700': log.type === 'info',
                  'text-yellow-700': log.type === 'warning',
                  'text-red-700': log.type === 'error'
                }"
              >{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="processedFiles.length > 0" class="bg-white rounded-lg shadow-lg p-6 fade-in">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">Renamed Files</h2>
          <button 
            @click="downloadAll"
            class="bg-secondary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-secondary/90 hover:scale-105 transition-all duration-300 flex items-center download-animation"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download All as ZIP
          </button>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(file, index) in processedFiles" 
            :key="index"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div class="flex items-center flex-1">
              <div 
                :class="file.status === 'renamed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'"
                class="w-10 h-10 rounded-full flex items-center justify-center mr-4"
              >
                <svg v-if="file.status === 'renamed'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ file.newName }}</p>
                <p class="text-sm text-gray-500">Original: {{ file.originalName }}</p>
              </div>
            </div>
            <button 
              v-if="file.status === 'renamed'"
              @click="downloadFile(file)"
              class="ml-4 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 hover:scale-105 transition-all duration-300 flex items-center download-animation"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <span v-else class="ml-4 text-yellow-600 font-medium">Skipped</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import * as XLSX from 'xlsx'
import JSZip from 'jszip'

const toast = useToast()

// State
const pdfFiles = ref([])
const excelFile = ref(null)
const excelData = ref([])
const processedFiles = ref([])
const processing = ref(false)
const statusMessage = ref('')
const statusDetails = ref('')
const pdfDragActive = ref(false)
const excelDragActive = ref(false)
const processingLogs = ref([])

// Computed
const canProcess = computed(() => pdfFiles.value.length > 0 && excelFile.value !== null)

const showMemoryWarning = computed(() => pdfFiles.value.length > 20)

const statusClass = computed(() => {
  if (statusMessage.value.includes('Error') || statusMessage.value.includes('Failed')) {
    return 'bg-red-50 border-l-4 border-red-400 text-red-800'
  } else if (statusMessage.value.includes('Success') || statusMessage.value.includes('Complete')) {
    return 'bg-green-50 border-l-4 border-green-400 text-green-800'
  } else {
    return 'bg-blue-50 border-l-4 border-blue-400 text-blue-800'
  }
})

// PDF Handlers
const handlePdfSelect = (event) => {
  const files = Array.from(event.target.files)
  pdfFiles.value = files
  pdfDragActive.value = false
  if (files.length > 0) {
    toast.success(`📄 ${files.length} PDF file(s) uploaded successfully!`, {
      timeout: 3000,
    })
  }
}

const handlePdfDrop = (event) => {
  const files = Array.from(event.dataTransfer.files).filter(f => f.type === 'application/pdf')
  pdfFiles.value = files
  pdfDragActive.value = false
  if (files.length > 0) {
    toast.success(`📄 ${files.length} PDF file(s) uploaded successfully!`, {
      timeout: 3000,
    })
  } else {
    toast.warning('Please drop PDF files only', {
      timeout: 2000,
    })
  }
}

// Excel Handlers
const handleExcelSelect = (event) => {
  excelFile.value = event.target.files[0]
  excelDragActive.value = false
  if (excelFile.value) {
    toast.success(`📊 Excel file "${excelFile.value.name}" uploaded successfully!`, {
      timeout: 3000,
    })
  }
}

const handleExcelDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
    excelFile.value = file
    toast.success(`📊 Excel file "${file.name}" uploaded successfully!`, {
      timeout: 3000,
    })
  } else {
    toast.error('Please drop a valid Excel file (.xlsx, .xls, or .csv)', {
      timeout: 2000,
    })
  }
  excelDragActive.value = false
}

// Process Files
const processFiles = async () => {
  processing.value = true
  statusMessage.value = ''
  statusDetails.value = ''
  processedFiles.value = []
  processingLogs.value = []

  const addLog = (message, type = 'info') => {
    processingLogs.value.push({ message, type })
  }

  try {
    addLog('Starting file processing...', 'info')
    addLog(`Found ${pdfFiles.value.length} PDF file(s) uploaded`, 'info')
    
    // Read Excel file
    addLog('Reading Excel file...', 'info')
    const excelBuffer = await excelFile.value.arrayBuffer()
    const workbook = XLSX.read(excelBuffer, { type: 'array' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
    
    // Extract two columns: old filename and new filename (skip header row)
    const mappingData = data
      .slice(1) // Skip header row
      .filter(row => row[0] && row[1]) // Both columns must have values
      .map(row => ({
        oldName: String(row[0]).trim(),
        newName: String(row[1]).trim()
      }))

    if (mappingData.length === 0) {
      throw new Error('No valid data found in Excel file. Make sure you have two columns: "old file name" and "New filename"')
    }

    addLog(`Found ${mappingData.length} mapping(s) in Excel file`, 'info')
    addLog('─'.repeat(50), 'info')
    
    // Create a map of uploaded PDF filenames for quick lookup
    const pdfFileMap = new Map()
    pdfFiles.value.forEach(file => {
      pdfFileMap.set(file.name, file)
      addLog(`📄 Uploaded: "${file.name}" (${(file.size / 1024).toFixed(2)} KB)`, 'info')
    })
    
    addLog('─'.repeat(50), 'info')
    addLog('Starting validation and renaming process...', 'info')
    addLog('─'.repeat(50), 'info')

    // Process each mapping from Excel
    let renamedCount = 0
    let notFoundCount = 0
    let errorCount = 0
    const notFoundFiles = []
    const errorFiles = []

    for (let i = 0; i < mappingData.length; i++) {
      const { oldName, newName } = mappingData[i]
      const rowNumber = i + 2 // Excel row number (accounting for header)
      
      addLog(`\n📋 Row ${rowNumber}: Processing mapping...`, 'info')
      addLog(`   Old name: "${oldName}"`, 'info')
      addLog(`   New name: "${newName}"`, 'info')
      
      // Check if old filename exists in uploaded PDFs
      if (pdfFileMap.has(oldName)) {
        try {
          const pdfFile = pdfFileMap.get(oldName)
          const fileSize = (pdfFile.size / 1024).toFixed(2)
          const finalNewName = newName.endsWith('.pdf') ? newName : `${newName}.pdf`
          
          addLog(`   ✓ Found matching PDF file (${fileSize} KB)`, 'info')
          addLog(`   ⚙ Creating renamed file...`, 'info')
          
          const blob = new Blob([await pdfFile.arrayBuffer()], { type: 'application/pdf' })
          
          processedFiles.value.push({
            originalName: oldName,
            newName: finalNewName,
            blob: blob,
            status: 'renamed'
          })
          
          addLog(`   ✓ SUCCESS: "${oldName}" → "${finalNewName}"`, 'success')
          addLog(`   File size: ${fileSize} KB`, 'success')
          renamedCount++
          
          // Remove from map to track which files were processed
          pdfFileMap.delete(oldName)
        } catch (error) {
          addLog(`   ✗ ERROR: Failed to process "${oldName}"`, 'error')
          addLog(`   Error details: ${error.message}`, 'error')
          addLog(`   Stack trace: ${error.stack || 'Not available'}`, 'error')
          errorCount++
          errorFiles.push({ row: rowNumber, file: oldName, error: error.message })
        }
      } else {
        addLog(`   ⚠ WARNING: File "${oldName}" not found in uploaded PDFs`, 'warning')
        addLog(`   This file was listed in Excel row ${rowNumber} but was not uploaded`, 'warning')
        addLog(`   Skipping this entry...`, 'warning')
        notFoundCount++
        notFoundFiles.push({ row: rowNumber, file: oldName })
      }
    }

    // Check for any uploaded PDFs that weren't in the Excel file
    addLog('\n' + '─'.repeat(50), 'info')
    if (pdfFileMap.size > 0) {
      addLog(`⚠ WARNING: ${pdfFileMap.size} uploaded PDF(s) not found in Excel file:`, 'warning')
      pdfFileMap.forEach((file, filename) => {
        addLog(`   - "${filename}" (${(file.size / 1024).toFixed(2)} KB) - Not in Excel mapping`, 'warning')
      })
      addLog('These files were uploaded but have no mapping in the Excel file', 'warning')
    } else {
      addLog('✓ All uploaded PDFs have been processed', 'success')
    }

    // Detailed Summary
    addLog('\n' + '═'.repeat(50), 'info')
    addLog('📊 PROCESSING SUMMARY', 'info')
    addLog('═'.repeat(50), 'info')
    
    addLog(`✓ Successfully renamed: ${renamedCount} file(s)`, 'success')
    
    if (notFoundCount > 0) {
      addLog(`⚠ Not found in uploads: ${notFoundCount} file(s)`, 'warning')
      addLog('Details of files not found:', 'warning')
      notFoundFiles.forEach(({ row, file }) => {
        addLog(`   - Row ${row}: "${file}"`, 'warning')
      })
    }
    
    if (errorCount > 0) {
      addLog(`✗ Errors encountered: ${errorCount} file(s)`, 'error')
      addLog('Details of errors:', 'error')
      errorFiles.forEach(({ row, file, error }) => {
        addLog(`   - Row ${row}: "${file}" - Error: ${error}`, 'error')
      })
    }
    
    if (pdfFileMap.size > 0) {
      addLog(`⚠ Uploaded but not in Excel: ${pdfFileMap.size} file(s)`, 'warning')
    }
    
    addLog('═'.repeat(50), 'info')
    addLog(`Total Excel rows processed: ${mappingData.length}`, 'info')
    addLog(`Total PDFs uploaded: ${pdfFiles.value.length}`, 'info')
    addLog('═'.repeat(50), 'info')

    statusMessage.value = 'Processing Complete!'
    statusDetails.value = `${renamedCount} file(s) renamed successfully${notFoundCount > 0 ? `, ${notFoundCount} not found` : ''}${errorCount > 0 ? `, ${errorCount} errors` : ''}`
    
    if (renamedCount > 0) {
      toast.success(`✅ Processing complete! ${renamedCount} file(s) renamed successfully`, {
        timeout: 4000,
      })
    }
    if (notFoundCount > 0) {
      toast.warning(`⚠️ ${notFoundCount} file(s) not found in uploads`, {
        timeout: 4000,
      })
    }
    if (errorCount > 0) {
      toast.error(`❌ ${errorCount} error(s) encountered during processing`, {
        timeout: 4000,
      })
    }
    
  } catch (error) {
    addLog(`✗ Fatal error: ${error.message}`, 'error')
    statusMessage.value = 'Error Processing Files'
    statusDetails.value = error.message
    toast.error(`❌ Error: ${error.message}`, {
      timeout: 5000,
    })
  } finally {
    processing.value = false
  }
}

// Download single file
const downloadFile = (file) => {
  const url = URL.createObjectURL(file.blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.newName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  toast.success(`📥 Downloaded: ${file.newName}`, {
    timeout: 2000,
  })
}

// Download all as ZIP
const downloadAll = async () => {
  toast.info('📦 Creating ZIP file...', {
    timeout: 2000,
  })
  
  const zip = new JSZip()
  const filesToZip = processedFiles.value.filter(file => file.status === 'renamed')
  
  filesToZip.forEach(file => {
    zip.file(file.newName, file.blob)
  })
  
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(zipBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'renamed-pdfs.zip'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  toast.success(`📥 Downloaded ZIP with ${filesToZip.length} file(s)!`, {
    timeout: 3000,
  })
}

// Download example Excel file
const downloadExampleExcel = () => {
  const data = [
    ['old file name', 'New filename'],
    ['document1.pdf', 'D0021'],
    ['document2.pdf', 'D0011'],
    ['report_2024.pdf', 'D0088'],
    ['invoice_123.pdf', 'D0044'],
    ['statement_jan.pdf', 'D0082'],
    ['form_application.pdf', 'D0060'],
    ['certificate_abc.pdf', 'D0002'],
    ['letter_xyz.pdf', 'D0049'],
    ['memo_2024.pdf', 'D0030'],
    ['contract_final.pdf', 'DIR0003'],
    ['ABJPF5972A_2025-26.pdf', 'D0021'],
    ['ABZPT9269N_2025-26.pdf', 'D0011'],
    ['ADJPZ7989D_2025-26.pdf', 'D0088']
  ]

  const ws = XLSX.utils.aoa_to_sheet(data)
  
  // Set column widths for better readability
  ws['!cols'] = [
    { wch: 25 }, // Column A: old file name
    { wch: 20 }  // Column B: New filename
  ]
  
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
  
  toast.success('📥 Example Excel file downloaded!', {
    timeout: 2000,
  })
}

</script>
