import Image from 'next/image'

export default function NASA({ nasa }) {
    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                NASA Image of the Day
            </h1>

            {/* Description of the Day from NASA */}
            <h2 className="text-xl text-cyan-600 uppercase">description</h2>
            <p className='pb-2 text-justify'>
                {nasa['explanation']}
            </p>
            {/* Image of the Day from NASA */}
            <h2 className="text-xl text-cyan-600 uppercase">Image</h2>
            <div className="flex flex-fill justify-center">
                <Image
                    src={nasa['url']}
                    alt="Image of the Day"
                    height='500px' width='500px'
                />
            </div>
        </>
    )
}
export async function getServerSideProps() {
    // https://api.nasa.gov/planetary/apod?api_key=yhOhTEaMh7Bn0YtUOgKPO48pBBfFyezOcjHagvaP
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`
    const json_response = await fetch(url)
    const json_data = await json_response.json()
    console.log(json_data)
    return {
        props: { nasa: json_data }
    }
}