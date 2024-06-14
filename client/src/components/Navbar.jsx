import { Link } from "react-router-dom";

export default function Navbar() {
    const handleLogout = () => {
        localStorage.clear()
    }
  return (
    <nav
      id="header"
      className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-gray-200 dark:bg-gray-800"
    >
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg
            className="fill-current text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-200 pt-4 md:pt-0">
              <li>
                <a
                  className="inline-block no-underline hover:text-white font-medium text-lg py-2 px-4 lg:-ml-2"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <Link
                  className="inline-block no-underline hover:text-white font-medium text-lg py-2 px-4 lg:-ml-2"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              <li>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div className="auth flex items-center w-full md:w-full">
            <Link className="bg-red-600 text-gray-200  p-2 rounded  hover:bg-red-500 hover:text-gray-100" to='/login' onClick={handleLogout}>
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
