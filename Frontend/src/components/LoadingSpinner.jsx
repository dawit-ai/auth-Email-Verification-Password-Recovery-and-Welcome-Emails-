import { Loader } from "lucide-react"

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader className="size-10 animate-spin text-purple-500" />
    </div>
  )
}

export default LoadingSpinner