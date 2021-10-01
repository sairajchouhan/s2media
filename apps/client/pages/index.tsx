import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'

export default function Landing() {
  return (
    <UnAuthenticatedLayout>
      <div className="flex justify-center">
        <h1 className="text-5xl text-indigo-500">Landing Page Click on SignUp to Get Started</h1>
      </div>
    </UnAuthenticatedLayout>
  )
}
