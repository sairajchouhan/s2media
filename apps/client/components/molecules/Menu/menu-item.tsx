import { Menu as HeadlessMenu } from '@headlessui/react'

interface IMenuItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line no-unused-vars
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  activeClassName?: string
}

export const MenuItem = ({
  children,
  className,
  activeClassName = 'hover:bg-gray-100',
  icon: Icon,
  ...props
}: IMenuItem) => {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <button
          {...props}
          className={`${
            active ? activeClassName : ''
          } group flex items-center w-full px-2 py-2 text-sm ${className}`}
        >
          {Icon ? <Icon className="w-5 mr-2" /> : null}
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  )
}
