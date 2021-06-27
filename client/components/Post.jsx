/* eslint-disable @next/next/no-img-element */
import React from 'react'
// import Image from 'next/image'

const Post = () => {
  return (
    <div>
      <div>
        <h1>Sairaj</h1>
        <h3>Mumbai, india</h3>
      </div>
      <main className="bg-blue-100">
        <div className="">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="object-cover w-full max-h-96"
            draggable="false"
          />
        </div>
        <div>like share subscribe</div>
      </main>
    </div>
  )
}

export default Post
