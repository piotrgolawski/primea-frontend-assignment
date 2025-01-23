import React from 'react';
import SearchComponent from "./components/Search/Search";
import List from "./components/List/List";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <div className="App w-4/5 mx-auto flex flex-col min-h-screen">
            <header className="App-header sticky top-[0] z-10 flex justify-center py-4 bg-white">
                <SearchComponent />
            </header>
            <div className="mt-[2%] flex-grow">
                <List />
            </div>

            <div className="sticky bottom-0 bg-white py-2 text-center">
                Piotr Goławski @ 2025
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
