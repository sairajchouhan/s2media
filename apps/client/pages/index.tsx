import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'

export default function Landing() {
  return (
    <UnAuthenticatedLayout>
      {/* test commit from vscode.dev */}
      <div className="flex justify-center">
        <h1 className="mt-10 text-5xl text-indigo-500">Landing Page Click on SignUp to Get Started</h1>
      </div>
    </UnAuthenticatedLayout>
  )
}
