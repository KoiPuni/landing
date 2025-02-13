import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css'
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { t, i18n } = useTranslation();
  const [animateMirror, setAnimateMirror] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const changeState = () => {
    setAnimateMirror(true)
    setTimeout(() => {
      setAnimateMirror(false); // Update state after 5 seconds
    }, 2000); // 4000 milliseconds = 4 seconds
  };

  // Add language toggle function
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  // Add this useEffect to check localStorage on component mount
  useEffect(() => {
    const submitted = localStorage.getItem('formSubmitted');
    if (submitted) {
      setHasSubmitted(true);
    }
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    try {
      const response = await fetch('http://localhost:3000/api/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        // Set localStorage and state to prevent further submissions
        localStorage.setItem('formSubmitted', 'true');
        setHasSubmitted(true);
      } else {
        setStatus(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('Error sending message');
    } finally {
      setIsSubmitting(false); // End loading regardless of outcome
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    changeState()
  }, [])


  return (
    <ErrorBoundary>
      <Helmet>
        <title>KoiPuni Code - Web Development Solutions</title>
        <meta name="description" content="Professional web development services specializing in modern web applications. Based in Argentina with global reach." />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KoiPuni Code - Web Development Solutions" />
        <meta property="og:description" content="Professional web development services specializing in modern web applications." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://koipunicode.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KoiPuni Code - Web Development Solutions" />
        <meta name="twitter:description" content="Professional web development services specializing in modern web applications." />
        <meta name="twitter:image" content="/logo.png" />
        
        {/* Keywords and additional meta */}
        <meta name="keywords" content="web desarrollo, desarrollo de software, sistemas web, React, NextJS, Argentina, Cipolletti, Río Negro, desarrollo full-stack" />
        <meta name="author" content="KoiPuni Code" />
        <link rel="canonical" href="https://koipunicode.com" />
        
        {/* Social links */}
        <link rel="me" href="https://github.com/KoiPuniCode" />
        <link rel="me" href="https://www.linkedin.com/company/koipunicode" />
      </Helmet>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <div className="overflow-x-hidden min-w-screen">
          <div className='tech-bg'>
            <div className="relative pt-6 px-6 z-10 flex flex-row justify-between items-center">
              <div className="flex items-center">
                <img src="./logo.png" alt="logo circle with s inside" className="w-12 h-12 mx-2" />
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold">KoiPuni Code</div>
                  <div className='text-sm max-w-40'>{t('header.slogan')}</div>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  onClick={toggleLanguage}
                  className="mr-4 px-3 py-1 rounded-md bg-emerald-200 hover:bg-emerald-300"
                >
                  {i18n.language === 'en' ? 'ES' : 'EN'}
                </button>
              </div>
            </div>

            <div className='px-6 pt-12 max-w-3xl m-auto flex flex-col justify-start relative z-10'>
              <h1 className='break-normal text-6xl text-center font-bold transition-all mb-4' onMouseEnter={changeState}>
                {t('hero.we')} <span className={`${animateMirror && 'animate-mirror'} transition-all inline-block`}>{t('hero.build')}</span> <span className={`${animateMirror && 'animate-mirror'} transition-all inline-block`}>{t('hero.cool')}</span>
                <span className='bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent hover:from-emerald-500 hover:to-emerald-700 transition-colors'> {t('hero.webApps')}</span>
              </h1>
              <p className='text-center max-w-2xl mx-auto text-gray-700 text-lg'>{t('hero.description')}</p>
              <div className='flex flex-col sm:flex-row gap-4 items-center justify-center my-12'>
                <a href='#contact' className='w-fit text-2xl font-bold py-4 px-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white hover:from-emerald-500 hover:to-emerald-700 transition-colors shadow-lg hover:shadow-xl'>{t('hero.getInTouch')}</a>
                <a href='https://wa.me/5492984400833' target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-lg font-semibold text-emerald-600 hover:text-emerald-700 transition-colors'>
                  <img src="./whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6" />
                  {t('contact.whatsapp')}
                </a>
              </div>
            </div>
          </div>
          <div className="py-24 px-6 bg-gradient-to-br from-emerald-50 to-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">{t('projects.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Medical App Project */}
                <div className="bg-gradient-to-br from-[#00e5ff]/10 to-[#ff1493]/10 rounded-3xl p-6 hover:shadow-xl transition-all">
                  <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="./medritte.png" 
                      alt="MeDritte" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/20 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#00e5ff] to-[#ff1493] bg-clip-text text-transparent">
                    {t('projects.medritte.title')}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {t('projects.medritte.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 text-sm">
                      {t('projects.medritte.tech.next')}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#ff1493]/10 text-[#ff1493] border border-[#ff1493]/20 text-sm">
                      {t('projects.medritte.tech.nest')}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 text-sm">
                      {t('projects.medritte.tech.postgres')}
                    </span>
                  </div>
                </div>

                {/* 3D Collaboration Tool */}
                <div className="bg-gradient-to-br from-[#ff1493]/10 to-[#00e5ff]/10 rounded-3xl p-6 hover:shadow-xl transition-all">
                  <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="./koi3dsync.png" 
                      alt="Koi3DSync" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff1493]/20 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#ff1493] to-[#00e5ff] bg-clip-text text-transparent">
                    {t('projects.koi3dsync.title')}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {t('projects.koi3dsync.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-[#ff1493]/10 text-[#ff1493] border border-[#ff1493]/20 text-sm">
                      {t('projects.koi3dsync.tech.threejs')}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 text-sm">
                      {t('projects.koi3dsync.tech.react')}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#ff1493]/10 text-[#ff1493] border border-[#ff1493]/20 text-sm">
                      {t('projects.koi3dsync.tech.websocket')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">{t('services.title')}</h2>
              
              <div className="grid md:grid-cols-3 gap-12">
                {/* Design Service */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-emerald-100">
                  <img className='w-32 h-32 mx-auto mb-6' src="./beam-web-design-program-on-laptop-screen.gif" alt="Web Design" />
                  <h3 className='font-bold text-2xl mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent'>{t('services.design.title')}</h3>
                  <p className="text-gray-700">
                    {t('services.design.description')}
                  </p>
                </div>

                {/* Server Service */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-emerald-100">
                  <img className='w-32 h-32 mx-auto mb-6' src="./isometric-server.gif" alt="Server Solutions" />
                  <h3 className='font-bold text-2xl mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent'>{t('services.server.title')}</h3>
                  <p className="text-gray-700">
                    {t('services.server.description')}
                  </p>
                </div>

                {/* SEO Service */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-emerald-100">
                  <img className='w-32 h-32 mx-auto mb-6' src="./dazzle-seo-website-optimization.gif" alt="SEO Optimization" />
                  <h3 className='font-bold text-2xl mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent'>{t('services.seo.title')}</h3>
                  <p className="text-gray-700">
                    {t('services.seo.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-24 px-6 bg-gradient-to-br from-emerald-50 to-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                {t('testimonials.title')}
              </h2>
              <p className="text-center text-gray-600 mb-16">{t('testimonials.subtitle')}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Laura's Testimonial */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      LP
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-xl">{t('testimonials.laura.name')}</h3>
                      <p className="text-emerald-600">{t('testimonials.laura.role')}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic">
                    "{t('testimonials.laura.text')}"
                  </blockquote>
                </div>

                {/* Estefania's Testimonial */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      ES
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-xl">{t('testimonials.estefania.name')}</h3>
                      <p className="text-emerald-600">{t('testimonials.estefania.role')}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic">
                    "{t('testimonials.estefania.text')}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div id="contact" className="tech-bg py-24 relative">
            <div className="max-w-3xl mx-auto px-6">
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-12 text-center">{t('contact.title')}</h2>
                
                {hasSubmitted ? (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center">
                    <h3 className="text-2xl font-bold text-emerald-600 mb-4">{t('contact.thankYou')}</h3>
                    <p className="text-gray-700 mb-6">{t('contact.alreadySubmitted')}</p>
                    <a 
                      href='https://wa.me/5492984400833' 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors'
                    >
                      <img src="./whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5" />
                      {t('contact.reachWhatsapp')}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="name">{t('contact.name')}</label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">{t('contact.email')}</label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2" htmlFor="message">{t('contact.message')}</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold hover:from-emerald-500 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.submitting')}
                        </span>
                      ) : (
                        t('contact.submit')
                      )}
                    </button>
                    {status && (
                      <div className="mt-4 text-center font-medium">
                        <p className={status.includes('success') ? 'text-green-600' : 'text-red-600'}>
                          {status}
                        </p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="tech-bg mt-44 py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-12 text-gray-800">{t('about.title')}</h2>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('about.description1')}
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('about.description2')}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                        {t('about.values.title')}
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 mr-3"></span>
                          <span className="text-gray-700">{t('about.values.innovation')}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-blue-400 mr-3"></span>
                          <span className="text-gray-700">{t('about.values.quality')}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-purple-400 mr-3"></span>
                          <span className="text-gray-700">{t('about.values.userCentric')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-6 pb-6 px-6 md:px-24 gap-8 md:gap-4">
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-8">
              <div className="flex flex-col items-center md:items-start gap-8 md:flex-row">
                <div className="flex">
                  <img src="./logo.png" alt="logo circle with s inside" className='w-12 h-12 self-center mx-2' />
                  <div className='flex flex-col justify-center'>
                    <div className='text-sm font-bold'>KoiPuni Code</div>
                    <div className="text-xs text-emerald-600 font-medium">{t('footer.global')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center md:text-left">
                  <address className="text-sm text-gray-600 not-italic">
                    <div className="font-medium mb-1">{t('footer.legal')}</div>
                    1209 Mountain Road PL NE STE R<br />
                    Albuquerque, NM
                  </address>
                  <address className="text-sm text-gray-600 not-italic">
                    <div className="font-medium mb-1">{t('footer.operations')}</div>
                    Cipolletti<br />
                    Río Negro, Argentina
                  </address>
                </div>
              </div>
            </div>
            <div className='text-center md:text-right text-sm text-gray-500'>{t('footer.rights')}</div>
          </div>
        </div>
        </>
      )}
    </ErrorBoundary>
  )
}

export default App
