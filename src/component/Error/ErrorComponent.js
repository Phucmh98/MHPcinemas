import React from 'react'

export default function ErrorComponent() {
  return (
    <div className='container p-5 font-light' style={{ backgroundColor: 'transparent' }}>
      <div className=' text-gray-400 text-center' style={{ fontSize: '180px' }}>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h1 className='text-gray-400 text-center text-5xl pb-4'>404</h1>
      <h1 className='text-gray-500 text-center text-4xl pb-3'>Page not found</h1>
      <p className='text-gray-400 text-center text-3xl '>
        Sorry, something is wrong. We are fixing it.</p>
      <p className='text-gray-400 text-center text-3xl '>
        Please try again later.</p>
    </div>
  )
}
