export interface Document {
  id: string
  title: string
  content?: string
}

/** Requests */
export type UpdateDocumentRequest = Document

export interface FetchDocumentRequest {
  id: string
}

export interface DeleteDocumentRequest {
  id: string
}


/** Responses */
export interface FecthAllDocumentsResponse {
  data: Document[]
}

export interface FetchDocumentResponse {
  data: Document
}


export interface CreateDocumentResponse {
  data: Document
}
