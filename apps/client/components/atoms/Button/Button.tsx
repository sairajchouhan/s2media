import React from 'react'
import { Loader } from '../Loader'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'indigo' | 'red' | 'green' | 'gray'
  variant?: 'solid' | 'outline'
  disabled?: boolean
  loading?: boolean
  children: React.ReactChild | React.ReactChild[]
}

const getSolidColorClasses = (colorScheme: string, disabled: boolean) => {
  const resObj: { colorProps: string[] } = { colorProps: [] }
  switch (colorScheme) {
    case 'indigo':
      resObj.colorProps = [`bg-indigo-600`, 'focus:ring-indigo-400', 'text-white']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-indigo-500', 'active:bg-indigo-700'])
      break
    case 'red':
      resObj.colorProps = [`bg-red-600`, 'focus:ring-red-400', 'text-white']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-red-500', 'active:bg-red-700'])
      break
    case 'green':
      resObj.colorProps = [`bg-green-600`, 'focus:ring-green-400', 'text-white']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-green-500', 'active:bg-green-700'])
      break
    case 'gray':
      resObj.colorProps = [`bg-gray-600`, 'focus:ring-gray-400', 'text-white']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-gray-500', 'active:bg-gray-700'])
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
      resObj.colorProps = ['border', `border-indigo-500`, 'text-indigo-800', 'focus:ring-indigo-400']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-indigo-50', 'active:bg-indigo-100'])
      break
    case 'red':
      resObj.colorProps = ['border', `border-red-500`, 'text-red-800', 'focus:ring-red-400']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-red-50', 'active:bg-red-100'])
      break
    case 'green':
      resObj.colorProps = ['border', `border-green-500`, 'text-green-800', 'focus:ring-green-400']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-green-50', 'active:bg-green-100'])
      break
    case 'gray':
      resObj.colorProps = ['border', `border-gray-500`, 'text-gray-800', 'focus:ring-gray-400']
      !disabled && (resObj.colorProps = [...resObj.colorProps, 'hover:bg-gray-50', 'active:bg-gray-100'])
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
  'rounded-md',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-opacity-80',
  'shadow',
]

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ colorScheme = 'indigo', variant = 'solid', disabled = false, loading = false, children, ...props }, ref) => {
    return (
      <button
        {...props}
        className={`
			${baseClasses.join(' ')} 
			${variant === 'solid' ? getSolidColorClasses(colorScheme, disabled).join(' ') : ''}
			${variant === 'outline' ? getOutlineColorClasses(colorScheme, disabled).join(' ') : ''}
			${disabled && 'cursor-not-allowed'}
			relative disabled:opacity-70 
			`}
        disabled={disabled || loading}
        ref={ref}
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
)
