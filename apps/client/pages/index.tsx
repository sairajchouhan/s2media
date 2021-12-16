import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'
import Link from 'next/link'
import { Footer } from '../components/molecules/Footer'

const technologies = [
  {
    title: 'React',
    description: 'React is a JavaScript library for building user interfaces.',
    img: '/icons/react.svg',
  },
  {
    description:
      'NextJs is a React framework for hybrid static & server rendering, smart bundling, route pre-fetching, and more.',
    img: '/icons/nextjs.svg',
  },
  {
    title: 'React Query',
    description:
      'Performant and powerful data synchronization for React used to Fetch, cache and update data in your React  ',
    img: '/icons/react-query.svg',
  },
  {
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework',
    img: '/icons/tailwind.svg',
  },
  {
    title: 'Socket.io',
    description: 'Bidirectional and low-latency communication for every platform',
    img: '/icons/socket-io.svg',
  },

  {
    title: 'Node.js',
    description: 'Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine.',
    img: '/icons/nodejs.svg',
  },
  {
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    img: '/icons/express.svg',
  },
  {
    title: 'Docker',
    description:
      'Docker is a platform for deploying applications with a focus on developer convenience',
    img: '/icons/docker.svg',
  },
  {
    title: 'Nginx',
    description: 'Nginx is an HTTP(S) server and reverse proxy',
    img: '/icons/nginx.svg',
  },
  {
    description: 'Prisma is a Next Generation Node.js and Typescript ORM',
    img: '/icons/prisma.svg',
  },
  {
    title: 'Redis',
    description: 'Redis is an open-source, in-memory data structure store',
    img: '/icons/redis.svg',
  },
  {
    title: 'Postgres',
    description: 'Postgres is a powerful, open source object-relational database system',
    img: '/icons/postgres.svg',
  },
  {
    title: 'Firebase',
    description: 'Firebase is a cloud platform as a service (CaaS)',
    img: '/icons/firebase.svg',
  },
  {
    title: 'Cloudinary',
    description: 'Cloudinary is a cloud image hosting service',
    img: '/icons/cloudinary.svg',
  },
]

export default function Landing() {
  return (
    <UnAuthenticatedLayout>
      <section className="flex pt-16" style={{ height: 'calc(100vh - 58px)' }}>
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
          <Link href="/signup" passHref>
            <button className="px-12 py-3 mt-2 text-lg text-white rounded-md bg-gradient-to-tl from-indigo-500 to-pink-500">
              Try it out
            </button>
          </Link>
        </div>
        <div className="flex-1 pt-8">
          <img src="/landing-2.svg" className="block" alt="" />
        </div>
      </section>
      <section className="py-8">
        <h1 className="mb-24 font-bold text-center text-gray-800 text-7xl">Tech Stack Used</h1>
        <div className="grid grid-cols-2 gap-12">
          {technologies.map((tech) => (
            <EachTech {...tech} key={tech.title} />
          ))}
        </div>
      </section>
    </UnAuthenticatedLayout>
  )
}

type TechType =
  | {
      title: string
      description: string
      img: string
    }
  | {
      description: string
      img: string
      title?: undefined
    }

const EachTech = ({ description, img, title }: TechType) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
      <img src={img} className="w-24 h-auto mb-3" alt={title} />
      {title ? <p className="text-xl font-medium text-gray-700">{title}</p> : null}
      <p className="w-1/2 mt-1">{description}</p>
    </div>
  )
}
