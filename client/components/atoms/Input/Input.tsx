import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  placeholder: string
  error?: boolean
  errorText?: string
}

export const Input = ({ id, label, placeholder, error, errorText, ...props }: InputProps) => {
  return (
    <>
      <label className={label ? '' : 'hidden'} htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete="off"
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full text-sm border-gray-400 rounded outline-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        {...props}
      />
      {error && <p className="text-xs mt-0.5 font-semibold text-red-500">*{errorText}</p>}
    </>
  )
}
