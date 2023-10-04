import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async (event, args) => {
  console.log(args)
  return 'Hello Worldd'
})
