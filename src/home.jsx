import React, { useState } from 'react'; //imports useState for page switching
import { Music2 } from 'lucide-react';

//pages
import GuitarPage from './guitar';
import SingingPage from './singing';
//pages under guitar page
import ChordIdentifier from './chordIdentifier';
import ScalePractice from './scalePractice';

const AnimationStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-25px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .page-enter {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `}</style>
);

// This wrapper applies the animation every time the 'key' changes
const PageWrapper = ({ children }) => ( //children as in everything in between <PageWrapper></PageWrapper>
  <div className="page-enter w-full">
    {children}
  </div>
);

const Navbar = ({ onNavigate }) => { //Uses the onNavigate function created in Home
  return (
    <nav className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Button */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center text-xl font-bold text-purple-400 focus:outline-none transition duration-300 hover:text-purple-300"
            >
              <Music2 className="h-6 w-6 mr-2" />
              Musability
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-purple-200 hover:text-purple-400 transition-colors"
            >
              Home
            </button>
            
            {/* 2. THE GUITAR BUTTON (Fixed) */}
            <button 
              onClick={() => onNavigate('guitar')} 
              className="text-purple-200 hover:text-purple-400 transition-colors"
            >
              Guitar
            </button>
            
            <button 
              onClick={() => onNavigate('singing')} 
              className="text-purple-200 hover:text-purple-400 transition-colors"
            >
              Singing
            </button>
            
            <button
              onClick={() => onNavigate('songs')} 
              className="text-purple-200 hover:text-purple-400 transition-colors"
            >
              Songs
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative bg-gray-800 overflow-hidden"> {/*what does overflow-hidden mean */}
      <div className="max-w-7xl lg:ml-20"> {/*ask gemini about how the styling in these lines works*/}
        <div className="relative z-10 pb-8 bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-purple-200 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Extra practice with</span>{' '}
                <span className="block text-purple-400 xl:inline">Musability!</span>
              </h1>
              <p className="mt-3 text-base text-purple-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Practice makes perfect! This website is designed to help you with Guitar, and Vocals. (for now).
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-800 flex items-center justify-center">
        {/* Abstract Placeholder Graphic */}
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full flex items-center justify-center bg-gray-800">
           <div className="grid grid-cols-2 gap-4 p-8 opacity-80 transform -rotate-6">
              <div className="w-32 h-32 bg-purple-400 rounded-2xl"></div>
              <div className="w-32 h-32 bg-purple-400 rounded-full"></div>
              <div className="w-32 h-32 bg-purple-300 rounded-full"></div>
              <div className="w-32 h-32 bg-purple-500 rounded-2xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <span className="flex items-center text-xl font-bold mb-4">
              <Music2 className="h-6 w-6 mr-2 text-purple-400" />
              Musability
            </span>
            <p className="text-gray-400 text-sm">
              A tool to help your journey with Music!
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Practice!</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Guitar</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Singing</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">General Songs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-r-md text-white bg-purple-400 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-400">&copy; 2025 Musability, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home'); //function to switch pages

  return (
    <div className="h-screen bg-gray-900 overflow-y-auto [scrollbar-gutter:stable]">
      <AnimationStyles />

      {/* 1. Navbar is OUTSIDE the condition, so it stays visible everywhere */}
      <Navbar onNavigate={setCurrentPage} /> {/*creates the onNavigate function*/}

      <div key={currentPage}>
        {/* IF page is 'home', show the home stuff */}
        {currentPage === 'home' && (
          <PageWrapper>
            <Hero />
            <Footer />
          </PageWrapper>
        )}

        {currentPage === 'guitar' && (
          <PageWrapper>
            <GuitarPage 
              goBack={() => setCurrentPage('home')} //function goBack for pages (used for back arrow on website)
              onNavigate={setCurrentPage} //function to go into subpages within GuitarPage
            />
          </PageWrapper>
        )}

        {currentPage === 'singing' && (
          <PageWrapper>
            <SingingPage goBack={() => setCurrentPage('home')} />
          </PageWrapper>
        )}

        {/* pages under guitar */}
        {currentPage === 'chord-id' && (
          <PageWrapper>
            <ChordIdentifier goBack={() => setCurrentPage('guitar')} />
          </PageWrapper>
        )}

        {currentPage === 'scale-prac' && (
          <PageWrapper>
            <ScalePractice goBack={() => setCurrentPage('guitar')} />
          </PageWrapper>
        )}
      </div>
    </div>
  );
}