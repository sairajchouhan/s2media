import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { MenuItem } from './menu-item'

interface IMenu {
  activationButton: React.ReactNode
  children: React.ReactNode
}

const BaseMenu = ({ activationButton, children }: IMenu) => {
  return (
    <HeadlessMenu as="div" role="menu" className="relative z-10 inline-block">
      <div>
        <HeadlessMenu.Button as="div">
          {activationButton ? activationButton : <span>Menu</span>}
        </HeadlessMenu.Button>
      </div>
      <Transition
        as={'div'}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="absolute right-0 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">{children}</div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  )
}

export const Menu = Object.assign(BaseMenu, {
  Item: MenuItem,
})
