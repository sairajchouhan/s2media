/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NextImage } from './atoms/Image/Image'
// import Image from 'next/image'

export const Post = () => {
  return (
    <div>
      <div>
        <h1>Sairaj</h1>
        <h3>Mumbai, india</h3>
      </div>
      <main className="bg-blue-100">
        <div className="">
          <NextImage src="https://images.unsplash.com/photo-1625312815354-538eaa7ceced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
        </div>
        <div>like share subscribe</div>
      </main>
    </div>
  )
}
