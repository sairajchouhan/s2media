import { LeftNavIconProps } from '../../types'

export const MessageIcon = ({ variant, styling }: LeftNavIconProps) => {
  return (
    <>
      {variant === 'outline' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${styling}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      )}
      {variant === 'solid' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${styling}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  )
}
