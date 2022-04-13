// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import Link from 'next/link'

export default function Layout({ children }) {
    return (
        <>
            {/* background with gradient */}
            <div
                className="flex flex-col min-h-screen
                           bg-gradient-to-r from-lime-300 to-blue-400"
            >

                {/* start of top navigation bar */}
                <div className="sticky top-0 z-50 mb-4">
                    <Navbar />
                </div>

                {/* margins */}
                <div className="flex flex-grow
                                m-8
                                justify-center">

                        {/* start of main content window */}
                        <div className="max-w-[1100px] w-full p-4
                                        bg-white rounded-md shadow-xl"
                        >
                            {/* back button to index -------------------------------------------------- */}
                            <div className='  
                                            mb-0
                                            flex items-center justify-left'
                            >
                                <Link href="/">
                                    <button type="button"
                                        className='px-5 py-2
                                                   text-sm leading-5 rounded-full font-semibold text-white
                                                   border rounded-lg
                                                   bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                                   focus:outline-none focus:ring focus:ring-blue-300'>
                                        <a>Back</a>
                                    </button>
                                </Link>
                            </div>

                            {/* main component -------------------------------------------------- */}

                            <main>{children}</main>

                    </div>

                </div>
                {/* start footer */}
                <Footer />
            </div>

        </>
    )
}