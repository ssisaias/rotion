import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import { FecthAllDocumentsResponse } from '@shared/types/ipc'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FecthAllDocumentsResponse> => {
    return {
      data: [
        { id: '1', title: 'Ignite', content: '' },
        { id: '2', title: 'Discover', content: '' },
        { id: '3', title: 'Deliver', content: '' },
        { id: '4', title: 'Documentação', content: '' },
      ],
    }
  },
)
