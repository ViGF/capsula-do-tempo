'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const fileType = files[0].type.split('/')[1]

    const previewUrl = URL.createObjectURL(files[0]).concat(`.${fileType}`)
    setPreview(previewUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
      />
      {preview &&
        (preview.includes('.mp') ? (
          <video
            src={preview.split('.')[0]}
            controls
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          // eslint-disable-next-line
          <img
            src={preview.split('.')[0]}
            alt="Imagem Escolhida pelo usuário"
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))}
    </>
  )
}
