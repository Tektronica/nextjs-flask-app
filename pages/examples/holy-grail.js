import Link from 'next/link'
import Image from 'next/image'

export default function Grail() {
    return (
        <>
            <div className="w-full flex flex-col md:flex-row flex-wrap flex-nowrap py-4 flex-grow">
                
                {/* left ----------------------------------------------------------- */}
                <div className="md:w-[230px] min-w-[230px] flex-shrink flex-grow-0 px-4">
                    <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full h-full">
                        <ul className="flex md:flex-col overflow-hidden content-center justify-evenly">
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <Link className="truncate" href="#">
                                    <a>
                                        <Image src={"https://cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"} width="28" height="28" className="w-7 sm:mx-2 mx-4 inline" />
                                        <span className="hidden md:inline">Home</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <Link className="truncate" href="#">
                                    <a>
                                        <Image src={"https://cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg"} width="28" height="28" className="w-7 sm:mx-2 mx-4 inline" />
                                        <span className="hidden md:inline">Settings</span>
                                    </a>
                                </Link>
                            </li>

                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <Link className="" href="#">
                                    <a>
                                        <Image src={"https://cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg"} width="28" height="28" className="w-7 sm:mx-2 mx-4 inline" />
                                        <span className="hidden md:inline">Products</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <Link className="" href="#">
                                    <a>
                                        <Image src={"https://cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg"} width="28" height="28" className="w-7 sm:mx-2 mx-4 inline" />
                                        <span className="hidden md:inline">Reports</span>
                                    </a>
                                </Link>
                            </li>

                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <Link className="" href="#">
                                    <a>
                                        <Image src={"https://cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg"} width="28" height="28" className="w-7 sm:mx-2 mx-4 inline" />
                                        <span className="hidden md:inline">Integrations</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* center ----------------------------------------------------------- */}
                <div role="main" className="w-full flex-grow pt-1 px-3">
                    <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">The Holy Grail Layout</h1>
                    <p className="py-2">Are you in search of this? In terms of Web design, <a className="text-indigo-600" href="https://en.wikipedia.org/wiki/Holy_grail_(web_design)">the "holy grail" is
                        page layout</a> that has 3 columns. It is commonly desired and implemented, but for many years, the various ways in which it could be
                        implemented with available technologies all had drawbacks. Because of this, finding an optimal implementation was likened to searching
                        for the elusive Holy Grail.
                    </p><p className="py-2">
                        As of 2021, the Holy Grail layout is implemented using CSS Flexbox or CSS Grid display. For this example, we're using
                        the <a className="text-indigo-600" href="https://tailwindcss.com/">Tailwind CSS</a> utility framework. As part of it's default classes, Tailwind includes
                        <a className="text-indigo-600" href="https://tailwindcss.com/docs/flex-direction">Flexbox classes</a> which make this implementation possible. The holy grail
                        example is also responsive so that the layout stacks vertically on smaller mobile screens.
                    </p>
                    <p className="py-2">
                        Many web pages require a layout with multiple (often three) columns, with the
                        main page content in one column (often the center), and supplementary content such as menus
                        and advertisements in the other columns (sidebars). These columns commonly require separate
                        backgrounds, with borders between them, and should appear to be the same height no matter
                        which column has the tallest content. A common requirement is that the sidebars have a fixed width,
                        with the center column adjusting in size to fill the window (fluid or liquid layout).
                        Another requirement is that, when a page does not contain enough content to fill the screen,
                        the footer should drop to the bottom of the browser window instead of leaving blank space underneath.
                    </p>
                    <div className="flex p-3 bg-indigo-600 rounded text-white hidden md:flex">
                        <span className="flex-shrink overflow-hidden whitespace-nowrap">&lt;--------</span>
                        <div className="flex-grow flex-shrink-0 overflow-ellipsis text-center">This center column is "fluid" so it grows in width as needed!</div>
                        <span className="flex-shrink overflow-hidden whitespace-nowrap">--------&gt;</span>
                    </div>
                </div>

                {/* right ----------------------------------------------------------- */}
                <div className="md:w-[230px] min-w-[230px] w-fixed flex-shrink flex-grow-0 px-4">
                    <div className="flex flex-wrap md:flex-col px-2">
                        <div className="bg-gray-50 w-[200px] rounded-xl border mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 md:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                    <span className="block text-indigo-600">Made with Tailwind CSS!</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-100 w-[200px] rounded-xl mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 md:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                    <span className="block">Ready to dive in?</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-50 w-[200px] rounded-xl border mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 md:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                    <span className="block text-indigo-600">Play free at Codeply today.</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
            )
}
