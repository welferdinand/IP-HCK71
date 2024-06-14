import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

export default function Homepage() {
  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");
  const [pageSize] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");

  let resetData = false;

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState({
    totalData: 0,
    totalPages: 1,
    dataPerPage: 0,
  });

  useEffect(() => {
    resetData = true;
  }, [selectedCategory, search]);

  const fetchData = async () => {
    try {
      let { data } = await axios({
        url: `http://localhost:3000/foods`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: {
            size: pageSize,
            number: currentPage,
          },
          search: search,
          filter: selectedCategory,
        },
      });
      let { totalData, totalPage, dataPerPage } = data;
      setPaginationOption(() => ({ totalData, totalPage, dataPerPage }));
      let newData = [];
      if (!resetData) {
        newData = [...foods, ...data.data];
      } else {
        newData = [...data.data];
      }
      resetData = false;
      setFoods(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async (id) => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:3000/carts",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitSearch = () => {
    // reset params when search data
    if (currentPage !== 1) {
      // reset the current page to 1
      // this will trigger the fetch_movie function from useEffect
      setCurrentPage(1);
    } else {
      // if the current page is already 1, just fetch the movie data
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage]);
  return (
    <>
      <Navbar />
      <section className="bg-white">
        <div className="container px-6 py-8 mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
              <SearchBar
                search={search}
                setSearch={setSearch}
                submitSearch={submitSearch}
              />
              <Filter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ml-5">
              <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                <p className="text-gray-500 ">Chinese Food</p>
                <div className="flex items-center"></div>
              </div>
              <InfiniteScroll
                dataLength={foods.length}
                next={() => {
                  setCurrentPage((previousCurrentPage) => {
                    return previousCurrentPage + 1;
                  });
                }}
                hasMore={true}
              >
                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {foods.map((food, idx) => {
                    return (
                      <div
                        className="flex flex-col items-center w-full max-w-lg mx-auto text-center"
                        key={idx}
                      >
                        <img
                          className="object-cover w-full rounded-md h-72 xl:h-80"
                          src={food.image}
                          alt="T-Shirt"
                        />
                        <h4 className="mt-2 text-lg font-medium text-gray-700">
                          {food.title}
                        </h4>
                        <p className="text-blue-500">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(food.price)}
                        </p>
                        <button
                          onClick={() => handleAddCart(food.id)}
                          className="flex items-end justify-center w-full px-2 py-2 mt-auto font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mx-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          <span className="mx-1">Add to cart</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
