
export default function addRowExample() {
    const headers = ['id', 'context', 'data']
    const data = ['first_id', 'first_context', 'first_data']
    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Dynamic innerHTML
            </h1>
            <p className="pb-2 text-justify">
                Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.
                JavaScript <code>fetch</code> is an alternative method for creating HTTP requests in JavaScript.
                There is a different model in which the client takes a more active role. In this model, the client issues a request to the server and the server responds with a web page, but unlike the previous case, not all the page data is HTML, there is also sections of the page with code, typically written in Javascript.
            </p>
            <p className="pb-2 text-justify">
                Server-Sent Events (SSE) is a standard that enables Web servers to push data in real time to clients.
            </p>

            {/* Python api */}
            <div className="flex justify-center">
                <button type="button"
                    onClick={() => { add_row() }}
                    className='px-5 py-2
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-300 hover:bg-sky-700 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                    <a>Click Me!</a>
                </button>
            </div>
            
            <Table children={{ 'headers': headers, 'data': data }} />
        </>
    )
}

// ADD NEW ROW --------------------------------------------------------------------------------------------
function add_row() {
    const table = document.getElementById('test_table');

    // create new row
    var row = table.insertRow(-1)
    row.className = "flex w-full"

    // method for scrolling to the bottom of a child
    // var table_body = document.getElementById('test_table_body')
    // scrollToBottom(table_body)

    // populate the new row with a content cells
    var idx = 0
    var blank_data = { 'id': 'new_id', 'event': 'context', 'data': 'value' }
    Object.entries(blank_data).forEach(([k, v]) => {
        var cell = row.insertCell(idx)
        cell.className = "border-dashed border-t border-gray-200 userId w-1/5";
        cell.innerHTML = '<span class="text-gray-700 px-6 py-3 flex items-center">' + v + '</span>'
        idx += 1
    });
};

// TABLE COMPONENT ------------------------------------------------------------------------------------------
const Table = ({ children }) => {
    const headers = children.headers
    const data = children.data

    return (
        <>
            <div className="pt-8">
                <div className="rounded-md p-2 bg-white shadow-lg">
                    <table id="test_table" className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">

                        {/* mapped table headers */}
                        <thead className="bg-gray-100 sticky top-0 border-b border-gray-200 text-gray-600 font-bold">
                            <tr className="flex text-left w-full">
                                {headers.map((header, index) => {
                                    return <th key={index} className="px-6 py-2 w-1/5 tracking-wider uppercase text-xs">
                                        {header}
                                    </th>
                                })}
                            </tr>
                        </thead>

                        {/* mapped table preloaded data passed as server prop on mount */}
                        <tbody id="test_table_body" className="bg-grey-600 flex flex-col justify-between overflow-y-scroll w-full">
                            <tr className="flex w-full">
                                {data.map((value, index) => {
                                    return (
                                        <td key={index} className="border-dashed border-t border-gray-200 userId w-1/5">
                                            <span className="text-gray-700 px-6 py-3 flex items-center">
                                                {value}
                                            </span>
                                        </td>
                                    )
                                })}
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

// SCROLL TO BOTTOM OF CHILD TABLE ------------------------------------------------------------------------------------------
// // https://stackoverflow.com/a/33193694/3382269
// // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
// function scrollToBottom({table_body_id}) {
//     table_body_id.scrollTop = table_body_id.scrollHeight - table_body.clientHeight;
// }