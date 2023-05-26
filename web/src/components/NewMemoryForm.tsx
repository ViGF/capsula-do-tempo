'use client'

import { FormEvent, useState } from 'react'
import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'
import { MediaPicker } from './MediaPicker'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      // @ts-ignore-next-line
      uploadFormData.set('fileName', fileToUpload.name)
      uploadFormData.set('folder', 'nlw-spacetime')

      const uploadResponse = await api.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        uploadFormData,
        {
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY}`,
          },
        },
      )

      coverUrl = uploadResponse.data.url
    }

    const token = Cookie.get('token')

    setLoading(true)

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.replace('/?success')
  }

  return (
    <form
      onSubmit={handleCreateMemory}
      className="flex flex-1 flex-col gap-2"
      id="form"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="false"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        disabled={loading}
        className={`inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 ${
          loading && 'cursor-not-allowed'
        }`}
      >
        Salvar
      </button>
    </form>
  )
}
