import { MagnifyingGlass } from '@phosphor-icons/react'
import { SearchBar } from '../SearchBar'
import { useState } from 'react'

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  function handleOpenCHange(isOpen: boolean) {
    setIsSearchBarOpen(isOpen)
  }

  return (
    <>
      <button
        onClick={() => handleOpenCHange(true)}
        className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>
      <SearchBar open={isSearchBarOpen} onOpenChange={handleOpenCHange} />
    </>
  )
}
