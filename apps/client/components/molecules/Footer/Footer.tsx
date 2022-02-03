import React from 'react'

const links = [
  { title: 'Github', link: 'https://github.com/sairajchouhan', icon: '/icons/github.svg' },
  { title: 'Twitter', link: 'https://twitter.com/sairajchouhan', icon: '/icons/twitter.svg' },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/sairaj.me/',
    icon: '/icons/instagram.svg',
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/sairaj-chouhan/',
    icon: '/icons/linkedin.svg',
  },
]

export const Footer = () => {
  return (
    <footer className="py-12 mt-10 bg-gray-100 bg-opacity-50">
      <div className="flex items-center justify-between w-5/6 mx-auto">
        <p className="text-gray-600">&copy; 2022 Sairaj Chouhan. All rights reserved.</p>
        <ul className="flex space-x-3">
          {links.map((link) => (
            <li key={link.title}>
              <a href={link.link} target="_blank" rel="noreferrer">
                <img className="w-10 h-10" src={link.icon} alt={link.title} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
