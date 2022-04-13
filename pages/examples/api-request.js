import { useState, useEffect } from 'react';
import { connectToDatabase } from '../api/mongodb';
import { getMetars } from '../api/metars';

export default function Requests({ movies }) {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('../api/proxy/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);

    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                API Requests
            </h1>
            {/* three column, beginning of tablet size and above are row aligned, otherwise column */}
            <div className="w-full flex flex-col md:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                {/* main panel ----------------------------------------------------------------------- */}
                {/* this column is "fluid", so it grows in width as needed */}
                <div className='flex flex-col space-y-4'>
                    {/* Python api */}
                    <div className='text-justify'>
                        <h2 className="text-xl text-cyan-600 uppercase">python api through flask</h2>
                        <p className="bg-blue-200">
                            Current time is: {Date(currentTime)}
                        </p>
                    </div>

                    {/* metar api */}
                    <div className='text-justify'>
                        <h2 className="text-xl text-cyan-600 uppercase">python api through flask</h2>
                        <p className="bg-blue-200">
                            Current time is: {Date(currentTime)}
                        </p>
                    </div>

                    {/* Mongodb database */}
                    <div>
                        <h2 className="text-xl text-cyan-600 uppercase">Mongodb</h2>
                        <p>
                            first ten entries:
                        </p>
                        <ul>
                            {movies.map((movie) => (
                                <li>
                                    <h2 className="text-cyan-800 bg-gray-200 font-bold">{movie.title}</h2>
                                    <h3>Metacritic: {movie.metacritic}</h3>
                                    <p>Plot: {movie.plot}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

        </>
    )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(5)
        .toArray();

    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies)),
        },
    };
}


