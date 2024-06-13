import { Link } from 'react-router-dom'


export default function RegisterPage() {
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2 bg-gray-300  sm:rounded-lg">
              <h1 className="text-4xl sm:text-4xl text-gray-800  font-extrabold tracking-tight">
                Register Form
              </h1>
              <p className="text-normal text-lg sm:text-xl font-medium text-gray-600  mt-2">
                Fill in the form to create an account 
              </p>
            </div>
            <form className="p-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <label htmlFor="name" className="hidden">
                  Username
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Username"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400 0 text-black font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400  text-black font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Password
                </label>
                <input
                  type="password"
                  name="email"
                  id="email"
                  placeholder="Password"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-black font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="tel" className="hidden">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Phone Number"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400  text-black font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
              <button
                type="submit"
                className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
              >
                Submit
              </button>
              <Link
                to="/login"
                className="md:w-32 bg-gray-300 hover:bg-blue-dark text-black font-bold py-3 px-6 rounded-lg mt-3 hover:bg-gray-200 transition ease-in-out duration-300 text-center"
              >
                Go Back
              </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
