import React from 'react'

export default function ToogleButton({ isCollapsed, toggleCollapse }) {
  return (

    <div className='absolute -right-2 top-8'>
      <button
        className='hidden md:block cursor-pointer group relative'
        onClick={toggleCollapse}
      >
        {/* Main button container */}
        <div className={`
              relative flex items-center justify-center
              transition-all duration-700 ease-in-out
              ${isCollapsed
            ? 'w-10 h-10 rounded-full'
            : 'w-14 h-10 rounded-l-full rounded-r-none'
          }
              bg-white border-2 border-[#1E90FF]
               hover:shadow-2xl
              hover:scale-110 active:scale-95
              overflow-hidden
          `}>
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF] to-[#1E90FF]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-[#1E90FF] animate-ping opacity-0 group-hover:opacity-100"></div>

          {/* Icon with custom styling */}
          <div className="relative z-10 flex items-center">
            <div className={`
                      transition-all duration-500 ease-out
                      ${isCollapsed ? 'rotate-0' : 'rotate-180'}
                  `}>
              <svg
                className="w-5 h-5 text-[#1E90FF] group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Status indicator dots */}
          <div className={`
                  absolute -bottom-1 -right-1 w-3 h-3 rounded-full
                  transition-all duration-500
                  ${isCollapsed
              ? 'bg-green-400 scale-100'
              : 'bg-orange-400 scale-75'
            }
              `}></div>
        </div>


      </button>
    </div>
  )
}
