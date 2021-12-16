import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'

export default function Landing() {
  return (
    <UnAuthenticatedLayout>
      <div className="flex pt-16">
        <div className="flex-1 pt-16 pr-16">
          <h1
            style={{
              lineHeight: '1.15',
            }}
            className="text-transparent text-indigo-600 text-7xl"
          >
            Simple Social Media
          </h1>
          <p className="my-4 text-lg text-gray-700">
            A social media website built by collecting the best parts of top social media wesites
            like Instagram, Linkdin and Twitter
          </p>
          <button className="px-6 py-3 mt-2 text-lg text-white rounded-md bg-gradient-to-tl from-indigo-500 to-pink-500">
            Try it out
          </button>
        </div>
        <div className="flex-1">
          <img src="/landing-2.svg" className="block" alt="" />
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}
