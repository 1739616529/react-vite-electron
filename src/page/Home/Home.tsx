import logo from "src/logo.svg";
window.ipcRenderer.send( "test", "send page is Home. say hello electron" );
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
function App() {
    const { count, add_count, minus_count } = useStore()["RootStore"];

    return (
        <div className="bg-gray-800 h-screen text-center text-white text-2xl">
            <header className="App-header">
                <div className=" mb-16">
                    <img src={logo} className="w-96 animate-spin delay-1000 mx-auto" alt="logo" />
                </div>
                <p>Hello Vite + React!</p>
                <p>
                    count is: {count} &nbsp; &nbsp;
                    <button type="button" onClick={add_count} className="name">
                        add
                    </button>
                    &nbsp;
                    <button type="button" onClick={minus_count}>
                        minus
                    </button>
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {" | "}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}

export default observer( App );
