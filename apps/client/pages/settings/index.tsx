import { Button } from '../../components/atoms/Button/Button'
import { EditIcon } from '../../components/icons'
import { DeleteIcon } from '../../components/icons/DeleteIcon'
import { Menu } from '../../components/molecules/Menu'
import { PageNav } from '../../components/molecules/Page/page-nav'

const ActivationButton = () => {
  return <Button>Click Click</Button>
}

const Settings = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Settings" />
      <main className="flex flex-col justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
        <div className="mt-5">
          <Menu activationButton={ActivationButton}>
            <Menu.Item onClick={() => console.log('Hi Man')} icon={EditIcon}>
              Edit
            </Menu.Item>
            <Menu.Item className="text-red-500" activeClassName="hover:bg-red-50" icon={DeleteIcon}>
              Delete
            </Menu.Item>
          </Menu>
        </div>
      </main>
    </div>
  )
}

export default Settings
