

export default function ExampleLayout() {

    return (
        <>
            {/* three column, beginning of tablet size and above are row aligned, otherwise column */}
            <div className="w-full flex flex-col md:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow sm:divide-x sm:divide-gray-300">

                {/* left panel ----------------------------------------------------------------------- */}
                <div className='mb-4 min-w-[230px] md:w-[230px] w-full
                flex-shrink flex-grow-0 px-4
                m-2'
                >
                    <h2 className="md:text-2xl mb-4 pl-4 pr-4
                                   font-extrabold text-center
                                   bg-gray-200 rounded-xl">
                        Left
                    </h2>

                    {/* ordered list */}
                    <ol className="mb-4 md:space-y-2 md:pl-4 md:list-decimal flex md:flex-col
                                   overflow-hidden content-center justify-evenly">

                        <li className="p-2 hover:bg-red-300 rounded border bg-white">
                            First
                        </li>
                        <li className="p-2 hover:bg-orange-300 rounded border bg-white">
                            Second
                        </li>
                        <li className="p-2 hover:bg-yellow-300 rounded border bg-white">
                            Third
                        </li>
                        <li className="p-2 hover:bg-lime-300 rounded border bg-white">
                            Fourth
                        </li>
                        <li className="p-2 hover:bg-blue-300 rounded border bg-white">
                            Fifth
                        </li>
                        <li className="p-2 hover:bg-indigo-300 rounded border bg-white">
                            Sixth
                        </li>
                    </ol>
                </div>


                {/* main panel ----------------------------------------------------------------------- */}
                {/* this column is "fluid", so it grows in width as needed */}
                <div className='w-full flex-grow pt-1 px-3 mb-4'>

                    <h2 className="md:text-2xl mb-4 pl-4 pr-4
                                   font-extrabold text-center
                                   bg-gray-200 rounded-xl">
                        Center
                    </h2>

                    <div className='text-justify'>
                        <h2 className="md:text-4xl pr-4 text-indigo-600 font-extrabold">
                            Frankenstein IV
                        </h2>
                        <p>
                            It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost
                            amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless
                            thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle
                            was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open;
                            it breathed hard, and a convulsive motion agitated its limbs.
                        </p>
                        <p className="mt-4">
                            It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost
                            amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless
                            thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle
                            was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open;
                            it breathed hard, and a convulsive motion agitated its limbs.
                        </p>
                    </div>
                </div>

                {/* right panel ------------------------------------------------------------------- */}
                <div className='mb-4 min-w-[230px] md:w-[230px] w-full flex-shrink flex-grow-0 px-2'
                >
                    <h2 className="md:text-2xl mb-4 pl-4 pr-4
                                   font-extrabold text-center
                                   bg-gray-200 rounded-xl">
                        Right
                    </h2>

                    <p>The quick brown fox jumped over the lazy dog</p>

                    {/* cards */}
                    <div className="flex flex-wrap
                                    mb:flex-col md:space-y-4
                                    justify-center">

                        <div className="bg-gray-50 w-[200px] rounded-xl border border-black w-full">
                            <h1 className="text-xl font-bold text-center">Card One</h1>
                        </div>
                        <div className="bg-gray-50 w-[200px] rounded-xl border border-black w-full">
                            <h1 className="text-xl font-bold text-center">Card Two</h1>
                        </div>
                        <div className="bg-gray-50 w-[200px] rounded-xl border border-black w-full">
                            <h1 className="text-xl font-bold text-center">Card Three</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}