import { useState, useEffect } from 'react';

export default function Home() {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('../api/proxy/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);

    return (
        <>
            {/* three column, beginning of tablet size and above are row aligned, otherwise column */}
            <div className="w-full flex flex-col md:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                {/* left panel ----------------------------------------------------------------------- */}
                <div className='min-w-[230px] md:w-[230px] w-full flex-shrink flex-grow-0 px-4
                                bg-red-300'
                >
                    <h2 className="md:text-2xl mb-4 font-extrabold">Left</h2>
                </div>

                {/* main panel ----------------------------------------------------------------------- */}
                {/* this column is "fluid", so it grows in width as needed */}
                <div className='w-full flex-grow pt-1 px-3
                                bg-green-200'
                >
                    <div className='text-justify'>

                        <p className="text-center bg-blue-200">
                            Hello! The current time is {currentTime}
                        </p>

                        <p>Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.
                            To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar. Click Insert and then choose the elements you want from the different galleries.
                            Themes and styles also help keep your document coordinated. When you click Design and choose a new Theme, the pictures, charts, and SmartArt graphics change to match your new theme. When you apply styles, your headings change to match the new theme.
                            o, in the new Reading view. You can collapse parts of the document and focus on the text you want. If you need to stop reading before you reach the end, Word remembers where you left off - even on another device.
                        </p>
                    </div>
                </div>

                {/* right panel ------------------------------------------------------------------- */}
                <div className='min-w-[230px] md:w-[230px] w-full flex-shrink flex-grow-0 px-2
                                bg-blue-300'
                >
                    <h1>Right</h1>
                    <p>The quick brown fox jumped over the lazy dog</p>

                </div>
            </div>
        </>
    )
}