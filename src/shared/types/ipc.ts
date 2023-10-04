export interface Document {
  id: string
  title: string
  content: string
}

/** Requests */


/** Responses */
export interface FecthAllDocumentsResponse {
  data: Document[]
}
