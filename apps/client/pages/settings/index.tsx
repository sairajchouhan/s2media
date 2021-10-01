import { CircleLoader } from '../../components/atoms/CircleLoader'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Settings = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Settings" />
      <main className="flex flex-col justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
        <div className="mt-5">
          <CircleLoader />
        </div>
      </main>
    </div>
  )
}

export default Settings
