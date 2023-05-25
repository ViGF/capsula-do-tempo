import Image from 'next/image'
import { cookies } from 'next/headers'
import { TimelineButton } from '@/components/TimelineButton'
import EmptyMemories from '@/components/EmptyMemories'
import { api } from '@/lib/api'

interface MemoryType {
  id: string
  coverUrl: string
  content: string
}

export default async function Memory({ params }: any) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: MemoryType = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <TimelineButton />
      <article>
        {memory.coverUrl.includes('.mp') ? (
          <video
            src={memory.coverUrl}
            controls
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          <Image
            src={memory.coverUrl}
            alt="Capa da memória do usuário"
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
        <p className="py-4 text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </article>
    </div>
  )
}
