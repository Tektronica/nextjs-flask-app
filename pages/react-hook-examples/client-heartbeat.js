import { useState, useEffect } from 'react';

export default function Heartbeat() {
    // state indicates "the state" of the heartbeat
    const [state, setState] = useState(true);

    // state indicates whether the heartbeat is paused or not
    const [isActive, setIsActive] = useState(true)

    // toggles whether the heartbeat is paused or not
    function toggleActive() {
        setIsActive(!isActive);
    }

    function toggleState() {
        setState(!state);
    }

    // useEffect React Hook detects when isActive is true
    useEffect(() => {
        // if active, have
        if (isActive) {
            const interval = setInterval(() => { toggleState() }, 1000);
        }

        // After the React component unmounts, the interval is cleared
        // when using setInterval, imperative to clear the scheduled interval once the component unmounts
        return () => clearInterval(interval);

    }, [isActive, state]);

    return (
        <>
            <h1 className="text-4xl text-cyan-500 font-extrabold">
                Client Heartbeat
            </h1>
            <p className="pb-2 text-justify">
                The heartbeat effect will be used to demonstrate the uninterupted client environment while data is recieved from the flask backend.
                The effect uses the React hook <code>useEffect</code> to achieve the 'tick-tock' heartbeat.
                <code>useEffect</code> will do the job of <code>componentDidMount</code>, <code>componentDidUpdate</code> and <code>componentWillUnmount</code>.
                However, if <code>componentWillUnmount</code> is not handled properly using the <code>return</code>,
                then the effect hook will continue to run even if the component has been unmounted.
            </p>

            <pre className="mb-2 bg-sky-100 text-justify"><code className="language-javascriptreact">{
                `useEffect(() => {
    // do something
    return () => {
        // do cleanup stuff
    }
}, []);`
            }</code></pre>

            <p className="pb-2 text-justify">
                When employing <code>useEffect</code>, be sure to clean up any events that may continue to fire if the component is unmounted.
                In layman's terms, the client heartbeat will 'tick' and 'tock' to a unwaivering drum 'til the end of time unless there is a stop condition.
                When navigating to <code>/bokeh-project/client-heartbeat</code>,
                the components of the page become mounted to the DOM where in which the constant <code>interval</code> exists, which awaits the next update from <code>setInterval.</code>
                If the client decides to navigate away from this page, new components are mounted to the DOM while the old page becomes unmounted.
                Without a clear stop condition, even though the old components were unmounted, the interval effects in the previous component continue running.
            </p>
            <p className="pb-2 text-justify">
                Learn more by reading <a className="text-cyan-600" href="https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks" target="_blank">Build a React Timer Component Using Hooks</a> as well as from reading <a className="text-cyan-600" href="https://dev.to/trunghieu99tt/you-don-t-know-useeffect-4j9h" target="_blank">You don't know useEffect</a>!

            </p>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-4">
                    {/* displays the current state of the heartbeat */}
                    <div className="text-center p-4 uppercase border border-2 border-cyan-400 rounded">
                        <p>{state ? 'tick' : 'tock'}  </p>
                    </div>

                    {/* button for pausing heartbeat */}
                    <div className="">
                        <button type="button"
                            onClick={toggleActive}
                            className='px-5 py-2 w-40
                                       text-sm leading-5 rounded-full font-semibold text-white
                                       border rounded-lg
                                       bg-sky-700 hover:bg-sky-400 active:bg-sky-600
                                       focus:outline-none focus:ring focus:ring-blue-300'>
                            <a>{isActive ? 'Pause' : 'Start'}</a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};


