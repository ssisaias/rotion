import { ipcMain } from 'electron'
import { randomUUID } from 'node:crypto'
import { IPC } from '../shared/constants/ipc'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FecthAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  UpdateDocumentRequest,
} from '../shared/types/ipc'
import { store } from './store'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FecthAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document
    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID()
    const document: Document = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.UPDATE,
  async (_, { id, title, content }: UpdateDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`)
  },
)
