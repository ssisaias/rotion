import { Menu, Tray, app, nativeImage } from 'electron'
import path from 'node:path'

app.whenReady().then(() => {
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
      label: 'Rotion',
      enabled: true,
    },
    {
      type: 'checkbox',
      label: 'dark theme',
    },
  ])

  tray.setContextMenu(menu)
})
