import propTypes from "prop-types";

export default function SearchBar({ search, setSearch, submitSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    submitSearch(search);
  };
  return (
    <form className="input-group" onSubmit={handleSearch} role="search">
      <div className="flex items-center max-w-md mx-auto bg-gray-200">
        <div className="w-full">
          <input
            type="search"
            className="w-full px-4 py-2 text-gray-800 focus:outline-none"
            placeholder="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"      
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  search: propTypes.string,
  setSearch: propTypes.func,
  submitSearch: propTypes.func,
};
