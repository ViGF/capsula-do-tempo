import { NewMemoryForm } from '@/components/NewMemoryForm'
import { TimelineButton } from '@/components/TimelineButton'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <TimelineButton />
      <NewMemoryForm />
    </div>
  )
}
