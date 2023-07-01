import React from 'react'
import aboutImg from "../../images/about-img.jpg"

export default function About() {
  return (
    <>
    <section className='about'>
      <div className='container p-10 md:mx-10'>
        <div>
          <h2 className=' font-semibold text-2xl'>ABOUT</h2>
        </div>

        <div className='md:grid grid-cols-2 my-5 gap-20'>
          <div className='col-span-1'>
            <img src={aboutImg} alt="about"/>

          </div>
          <div className='col-span-1 md:mt-0 mt-10'>
                <div>
                  <h2 className='text-3xl font-bold mb-5'>About BookStacks</h2>
                  <p className='text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat modi eaque molestias totam? Ipsum, voluptatum ipsa non est voluptas nemo doloremque corporis molestiae odio laborum suscipit quis assumenda sapiente commodi.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, expedita exercitationem. Deleniti autem molestias optio culpa eaque id error. Quidem quis iste nemo assumenda molestias quisquam, veniam ab facilis suscipit.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed provident asperiores cupiditate non cum, unde delectus dolore voluptates a voluptatum doloribus aliquam sint, sit possimus incidunt officia. Minima, at consequatur.</p>
                </div>
          </div>

        </div>

      </div>
    </section>
    </>
  )
}
