import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [carts, setCarts] = useState([
    {
      id: 0,
      UserId: 0,
      FoodId: 0,
      quantity: 0,
      status: false,
      Food: {
        id: 0,
        title: "",
        price: 0,
        image: "",
        category: "",
      },
    },
  ]);
  let [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let temp = 0;
      data.forEach((el) => {
        temp = temp + el.quantity * el.Food.price;
      });
      setTotalAmount(temp);
      setCarts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handlePaid(){
    try {
      const { data } = await axios({
          method: "POST",
          url: `http://localhost:3000/transactions/generate-token`,
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })
       console.log(data);
      window.snap.pay(data.midtransToken.token, {
          onSuccess: async function (result) {
              alert("payment success!"); console.log(result);
              await axios({
                  method: "PATCH",
                  url: `http://localhost:3000/transactions/payment`,
                  data: {
                      orderId: data.orderId
                  },
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              })

              navigate("/")
          },
          onPending: function (result) {
              alert("wating your payment!"); console.log(result);
          },
          onError: function (result) {
              alert("payment failed!"); console.log(result);
          },
          onClose: function () {
              alert('you closed the popup without finishing the payment');
          }
      })
  } catch (error) {
      console.error(error);
  }
  }

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {carts.map((el) => {
              return (
                <>
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={el.Food.image}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {el.Food.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {el.Food.category}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <h1 className="h-8 w-8 border bg-white text-center text-xs outline-none">
                            {el.quantity}
                          </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(el.Food.price)}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={async () => {
                              try {
                                await axios({
                                  method: "DELETE",
                                  url: `http://localhost:3000/carts/${el.id}`,
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                });
                                fetchData();
                                navigate("/cart");
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalAmount)}
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={handlePaid} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
