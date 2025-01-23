import React, { useEffect, useState } from "react";
import { useSearch } from "../../hooks/useSearch";

const SearchComponent = () => {
    const { setQuery } = useSearch();
    const [inputValue, setInputValue] = useState(""); // Local state for input value

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.length >= 3) {
                setQuery(inputValue);
            } else if (inputValue.length === 0) {
                setQuery("");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue, setQuery]);

    const handleClear = () => {
        setInputValue("");
        setQuery("");
    };

    return (
        <div className="relative w-full max-w-xs">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update local state
                placeholder="Search..."
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {inputValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label="Clear search"
                >
                    &#215;
                </button>
            )}
        </div>
    );
};

export default SearchComponent;
