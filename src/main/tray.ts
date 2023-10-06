import { BrowserWindow, Menu, Tray, nativeImage } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '../../resources/rotionTemplate.png'),
  )

  const tray = new Tray(icon)
  const menu = Menu.buildFromTemplate([
    {
      label: 'Rotion',
      enabled: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Documentos recentes',
      enabled: false,
    },
    {
      label: 'Discover',
      accelerator: 'CommandOrControl+1',
    },
    {
      label: 'Ignote',
      accelerator: 'CommandOrControl+2',
    },
    {
      label: 'Untitledd',
      accelerator: 'CommandOrControl+3',
    },
    {
      type: 'separator',
    },
    {
      label: 'Sair',
      role: 'quit',
    },
  ])

  tray.setContextMenu(menu)
}
