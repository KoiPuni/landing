import { useEffect, useState } from 'react';
import './App.css'
function App() {
  const [animateMirror, setAnimateMirror] = useState(false)

  const changeState = () => {
    setAnimateMirror(true)
    setTimeout(() => {
      setAnimateMirror(false); // Update state after 5 seconds
    }, 5000); // 4000 milliseconds = 4 seconds
  };

  useEffect(() => {
    changeState()
  }, [])


  return (
    <>
      <div className='mountains-bg'>
        <div className="flex xl:px-24 lg:px-24 md:px-10 sm:px-10 px-6 justify-center sm:justify-between xl:pt-12 lg:pt-12 md:pt-6 sm:pt-6 pt-4">
          <div className="flex">
            <img src="./KoiPuni_Isologo.png" alt="logo circle with s inside" className='w-12 h-12 self-center mx-2' />
            <div className='flex flex-col justify-center'>
              <div className='text-lg font-bold'>KoiPuni Code</div>
              <div>apps with impact!</div>
            </div>
          </div>
          <a href='#contact' className='mr-6 self-center text-xl font-bold hidden sm:block'>Contact Us</a>
        </div>

        <div className='m-auto h-screen lg:py-32 md:py-24 pt-12 w-3/4 flex flex-col justify-start'>
          <h1 className='break-normal text-6xl text-center font-bold transition-all mb-4' onMouseEnter={changeState}>We <span className={`${animateMirror && 'animate-mirror'} transition-all inline-block`}>build</span> <span className={`${animateMirror && 'animate-mirror'} transition-all inline-block`}>cool </span><span className='underline decoration-wavy decoration-transparent animate-web-underline'> web Apps</span></h1>
          <p className='text-center'>We are a US based company dedicated to giving life to your App ideas and designs</p>
          <a href='#contact' className='my-12 w-fit text-2xl font-bold self-center py-4 px-8 rounded-full bg-gradient-to-l to-emerald-200 from-emerald-300'>Get in touch</a>
        </div>
      </div>

      <div className='mt-12 relative flex sm:flex-row flex-col w-3/5 m-auto justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='font-bold text-4xl'>Design UI/UX & Development of custom Apps</div>
          <div>
            Multiple design proposals, transformation of your ideas into real dinamic and functional Web Apps
          </div>
        </div>
        <img className='self-center' src="./beam-web-design-program-on-laptop-screen.gif" alt="" />
      </div>

      <div className='mt-44 relative flex sm:flex-row flex-col w-3/5 m-auto justify-center'>
        <img className='w-64 sm:mr-12 sm:block hidden' src="./isometric-server.gif" alt="" />
        <div className='flex flex-col justify-center'>
          <div className='font-bold text-4xl'>Implementation on Server and DNS management</div>
          <div>
            We upload your Web App to reliables servers and we get in charge of the management and configuration of server and DNS to ensure a constant presence without interruptions
          </div>
        </div>
        <img className='w-44 sm:mr-24 sm:hidden block self-center mt-8 sm:mt-0' src="./isometric-server.gif" alt="" />
      </div>

      <div className='mt-44 relative flex sm:flex-row flex-col w-3/5 m-auto justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='font-bold text-4xl'>SEO and Maintenance</div>
          <div>
            We enhance your visibility online with SEO strategies and periodically mantain your website to guarantee up-to-date information and a correct functionality
          </div>
        </div>
        <img className='self-center' src="./dazzle-seo-website-optimization.gif" alt="" />
      </div>

      <div className='bg-sky pt-52 xl:mt-52 relative flex justify-end flex-col md:flex-row m-auto' id='contact'>
        <img className='w-96 h-56 md:-scale-x-100 self-center md:self-start' src="./santi.gif" alt="" />
        <div className='flex lg:w-1/2 flex-col justify-center mx-12 sm:mr-12'>
          <div className='font-bold text-4xl'>Who are we?</div>
          <div className=''>
            At KoiPuniCode, we are passionate creators, innovators, and problem solvers dedicated to crafting exceptional web experiences. With a deep understanding of technology and a commitment to excellence, we specialize in building custom web applications tailored to meet the unique needs of our clients
            <div className='my-12 flex items-center justify-center sm:justify-start'>
              <div className='w-fit flex flex-col sm:flex-row items-center text-2xl font-bold self-center py-4 px-8 rounded bg-gradient-to-l to-emerald-300 from-emerald-500'>
                Contact us by
                <div className='flex'>
                  <a target="_blank" className='mx-2' href="https://api.whatsapp.com/send?phone=542984400833&text=Hi! I have the following inquiry ..."><img src="./3d-fluency-whatsapp-logo.png" alt="whatsapp logo" className='w-12 h-12' /></a>
                  or
                  <a target="_blank" className='mx-2' href="mailto: hello@koipunicode.com?subject=I have an inquiry  &body=Hi! My name is ... and I have the following inquiry ..."><img src="./3d-fluency-gmail-logo.png" alt="gmail logo" className='w-12 h-12' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-8 pb-6 px-4 md:pb-6 md:px-24 justify-between">
        <div className="flex">
          <img src="./KoiPuni_Isologo.png" alt="logo circle with s inside" className='w-12 h-12 self-center mx-2' />
          <div className='flex flex-col justify-center'>
            <div className='text-sm font-bold'>KoiPuni Code</div>
          </div>
        </div>
        <div className='mr-6 text-end sm:text-start text-sm self-center text-gray-500'>KoiPuni Code - 2024 All rights reserved</div>
      </div>
    </>
  )
}

export default App
