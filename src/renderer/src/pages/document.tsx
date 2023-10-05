import { useParams } from 'react-router-dom'
import { Editor, onContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useMemo } from 'react'
import { Document as Doc } from '@shared/types/ipc'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })
    return response.data
  })

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: onContentUpdatedParams) => {
      window.api.updateDocument({ id: id!, title, content })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueryData<Doc[] | undefined>(
          ['documents'],
          (documents) => {
            if (!documents) {
              return documents
            }
            return documents?.map((document) => {
              if (document.id === id) {
                return { ...document, title }
              }
              return document
            })
          },
        )
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  function handleEditorContentUpdated({
    title,
    content,
  }: onContentUpdatedParams) {
    saveDocument({ title, content })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-bold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Back End</ToC.Link>
          <ToC.Section>
            <ToC.Link>Dbs</ToC.Link>
            <ToC.Link>Auth</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  )
}
