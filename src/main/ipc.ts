import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async () => {
  return [
    { id: '1', title: 'Ignite' },
    { id: '2', title: 'Discover' },
    { id: '3', title: 'Deliver' },
    { id: '4', title: 'Documentação' },
  ]
})
