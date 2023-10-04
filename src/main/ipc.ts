import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    { id: '1', title: 'Ignite' },
    { id: '2', title: 'Discover' },
    { id: '3', title: 'Deliver' },
    { id: '4', title: 'Documentação' },
  ]
})
