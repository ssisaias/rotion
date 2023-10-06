import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

import './ipc'
import './store'
import { createTray } from './tray'
import { createShortcuts } from './shortcuts'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1e1a29',
      symbolColor: '#5f596e',
      height: 10,
    },
    trafficLightPosition: { x: 0, y: 0 },
    icon: join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  createTray(mainWindow)
  createShortcuts(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Don't forget to check if the port is the same as your dev server
  const devServerURL = createURLRoute('http://localhost:5173/', 'main')

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'main',
  )

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
