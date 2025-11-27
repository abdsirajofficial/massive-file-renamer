# PDF Batch Renamer

A modern, client-side web application for batch renaming PDF files using Excel data.

## Features

- 📄 Upload multiple PDF files (10-50 files supported)
- 📊 Upload Excel (.xlsx, .xls) or CSV files with new filenames
- 🔄 Sequential renaming based on Excel data
- 📦 Download individual files or all files as a ZIP
- ⚡ Fully client-side processing (no server required)
- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations and transitions
- ⚠️ Memory usage warnings for large batches

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Accessing from Your Phone (Local Network)

To access the app from your phone on the same network:

1. **Find your computer's IP address:**
   - Windows: Open Command Prompt and run `ipconfig`, look for "IPv4 Address"
   - Mac/Linux: Open Terminal and run `ifconfig` or `ip addr`, look for your network interface IP

2. **Start the dev server** (already configured for network access):
   ```bash
   npm run dev
   ```

3. **On your phone**, open a browser and navigate to:
   ```
   http://YOUR_COMPUTER_IP:5173
   ```
   For example: `http://192.168.1.100:5173`

4. **Make sure** both your computer and phone are on the same Wi-Fi network

**Note:** The server is configured to accept connections from any device on your local network (host: '0.0.0.0')

### Build for Production

Build the application:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Firebase Hosting

### Prerequisites

- Firebase CLI installed globally: `npm install -g firebase-tools`
- A Firebase project created at [Firebase Console](https://console.firebase.google.com)

### Steps

1. **Login to Firebase:**

```bash
firebase login
```

2. **Initialize Firebase in your project:**

```bash
firebase init
```

Select the following options:
- Choose "Hosting"
- Select your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: `No` (optional)

3. **Build your application:**

```bash
npm run build
```

4. **Deploy to Firebase:**

```bash
firebase deploy
```

Your application will be deployed and accessible at: `https://your-project-id.web.app`

### Alternative: Deploy with one command

After initial setup, you can build and deploy in one step:

```bash
npm run build && firebase deploy
```

## Usage

1. **Upload PDF Files**: Drag and drop or click to select multiple PDF files
2. **Upload Excel File**: Upload an Excel or CSV file with new filenames in the first column
3. **Process**: Click the "Process Files" button
4. **Download**: Download individual files or all files as a ZIP

### Excel File Format

The Excel file should have filenames in the first column (header row is skipped):

| EmployeeID |
|------------|
| EMP001     |
| EMP002     |
| EMP003     |

## Technical Details

### Technologies Used

- **Vite**: Fast build tool and dev server
- **Vue 3**: Progressive JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **SheetJS (xlsx)**: Excel file parsing
- **JSZip**: ZIP file creation

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- File API support required

### Performance Notes

- **Recommended**: 10-50 PDF files per batch
- **Warning**: Total file size over 100MB may affect browser performance
- All processing is done client-side in the browser
- No files are uploaded to any server

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues or questions, please create an issue in the repository.
