import React from 'react'
import { Loader } from '../Loader'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'indigo' | 'red' | 'green' | 'gray'
  variant?: 'solid' | 'outline'
  disabled?: boolean
  loading?: boolean
  children: React.ReactChild
}

const getSolidColorClasses = (colorScheme: string, disabled: boolean) => {
  const resObj: { colorProps: string[] } = { colorProps: [] }
  switch (colorScheme) {
    case 'indigo':
      resObj.colorProps = [`bg-indigo-100`, 'focus:ring-indigo-400', 'text-indigo-900']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-indigo-200', 'active:bg-indigo-300'])
      break
    case 'red':
      resObj.colorProps = [`bg-red-100`, 'focus:ring-red-400', 'text-red-900']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-red-200', 'active:bg-red-300'])
      break
    case 'green':
      resObj.colorProps = [`bg-green-100`, 'focus:ring-green-400', 'text-green-900']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-green-200', 'active:bg-green-300'])
      break
    case 'gray':
      resObj.colorProps = [`bg-gray-100`, 'focus:ring-gray-400', 'text-gray-900']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-gray-200', 'active:bg-gray-300'])
      break
    default:
      resObj.colorProps = []
      break
  }
  return resObj.colorProps
}

const getOutlineColorClasses = (colorScheme: string, disabled: boolean) => {
  const resObj: { colorProps: string[] } = { colorProps: [] }
  switch (colorScheme) {
    case 'indigo':
      resObj.colorProps = [
        'border',
        `border-indigo-500`,
        'text-indigo-800',
        'focus:ring-indigo-400',
      ]
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-indigo-50', 'active:bg-indigo-100'])
      break
    case 'red':
      resObj.colorProps = ['border', `border-red-500`, 'text-red-800', 'focus:ring-red-400']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-red-50', 'active:bg-red-100'])
      break
    case 'green':
      resObj.colorProps = ['border', `border-green-500`, 'text-green-800', 'focus:ring-green-400']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-green-50', 'active:bg-green-100'])
      break
    case 'gray':
      resObj.colorProps = ['border', `border-gray-500`, 'text-gray-800', 'focus:ring-gray-400']
      !disabled &&
        (resObj.colorProps = [...resObj.colorProps, 'hover:bg-gray-50', 'active:bg-gray-100'])
      break
    default:
      resObj.colorProps = []
      break
  }
  return resObj.colorProps
}

const baseClasses = [
  'px-4',
  'py-1.5',
  'font-semibold',
  'font-base',
  'rounded-lg',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-opacity-80',
  'shadow',
]

export const Button = ({
  colorScheme = 'indigo',
  variant = 'solid',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
			${baseClasses.join(' ')} 
			${variant === 'solid' ? getSolidColorClasses(colorScheme, disabled).join(' ') : ''}
			${variant === 'outline' ? getOutlineColorClasses(colorScheme, disabled).join(' ') : ''}
			${disabled && 'cursor-not-allowed'}
			m-1 relative disabled:opacity-70 
			`}
      disabled={disabled}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center red-100">
          <Loader />
        </div>
      )}

      <div className={`${loading && 'invisible'}`}>{children}</div>
    </button>
  )
}
