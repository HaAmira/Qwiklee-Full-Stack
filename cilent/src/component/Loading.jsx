import React from 'react'

const Loading = () => {
  return (
    <section className='flex justify-center p-12'>
        <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status">
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
        </div>
    </section>
  )
}

export default Loading