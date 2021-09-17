import { useEffect, useState } from 'react'

const allowedImageTypes = ['image/jpeg', 'image/png']

export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      console.log(file.type)
      if (file && allowedImageTypes.includes(file.type)) {
        setSelectedFile(file)
      } else {
        setError('*Please select a valid image file')
      }
    }
  }

  const resetFile = () => {
    setTimeout(() => {
      setSelectedFile(null)
      setPreviewUrl(null)
      setError(null)
    }, 200)
  }

  return {
    selectedFile,
    previewUrl,
    handleFileChange,
    resetFile,
    error,
  }
}
