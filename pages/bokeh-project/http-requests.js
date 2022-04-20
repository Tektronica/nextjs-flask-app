
export default function axiosExample({ getResponse, postResponse, patchResponse, putResponse, deleteResponse }) {

    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                HTTP Requests
            </h1>
            <p className="pb-2 text-justify">
                Take web apps with real-time content, like live game scores, stock prices, or notifications on Twitter, for example. In these cases, the user doesn’t control when the information is being updated, and thus, does not know when to make a request. Yet the information displayed in the app is always new and up-to-date.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
            </p>

            {/* HTTP request types */}
            <div className='text-justify'>
                <h2 className="text-xl text-cyan-600 uppercase">HTTM Methods</h2>
                <div className="flex justify-center">
                    <div className="flexgrid grid-1 text-left">
                        {/* request div */}
                        <div className=''>
                            {getResponse}
                        </div>
                        <div className=''>
                            {postResponse}
                        </div>
                        <div className=''>
                            {patchResponse}
                        </div>
                        <div className=''>
                            {putResponse}
                        </div>
                        <div className=''>
                            {deleteResponse}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const data_list = await getMethodResponse()

    return {
        props: {
            getResponse: data_list[0],
            postResponse: data_list[1],
            patchResponse: data_list[2],
            putResponse: data_list[3],
            deleteResponse: data_list[4]
        }
    }
}

// GET -----------------------------------------------------------------
async function getPost() {
    // Fetch json response
    // explicit in content type unnecessary
    const res = await fetch('http://localhost:3000/api/echo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // extract json
    const data_object = await res.json()

    return JSON.parse(JSON.stringify(data_object.data))
}

// ALL HTTP METHODS -----------------------------------------------------
async function getMethodResponse() {
    // list of fetch methods used in the HTTP call
    const method_list = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']

    // initialize empty list to append HTTP responses to
    const data_list = Array.apply(null, Array(method_list.length)).map(function () { })

    // iterator for returning response for each fetch method
    for (var i = 0, method; method = method_list[i]; i++) {

        // Fetch json response using absolute address (relative paths don't work here)
        const res = await fetch('http://localhost:3000/api/echo', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // extract json
        const data_object = await res.json()

        // pull out data from json
        const data = JSON.parse(JSON.stringify(data_object.data))

        // append the response to the 
        data_list[i] = data
    }

    // return all responses once loop has completed
    return data_list
}
