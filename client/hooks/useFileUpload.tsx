import { useEffect, useState } from 'react'

export const useFile = () => {
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setSelectedFile(files[0])
    }
  }

  const resetFile = () => {
    setTimeout(() => {
      setSelectedFile(null)
      setPreviewUrl(null)
    }, 200)
  }

  return {
    selectedFile,
    previewUrl,
    handleFileChange,
    resetFile,
  }
}
