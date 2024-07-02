import React from "react";
// import { BsCurrencyDollar } from "react-icons/bs";
// import { GoPrimitiveDot } from "react-icons/go";
// import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  // earningData,
  // medicalproBranding,
  // recentTransactions,
  // weeklyStats,
  dropdownData,
  // SparklineAreaData,
  // ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
// import product9 from "../data/product9.jpg";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Profile = () => {
  const getDatafromstore = (JSON.parse(localStorage.getItem("userLogin")).userData);
  // const getArray = Object.entries(getDatafromstore)
  // const filterValues = getArray.filter(([i, _])=>{
  //   return i !== "password"
  // })
  // console.log(getArray);
  return (
    <div className="">
      {getDatafromstore ? (
        <div className="mt-5 ml-5 overflow-x-scroll ">
          <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                User database
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Details and informations about user.
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">First name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {getDatafromstore.first_name}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Last name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {getDatafromstore.last_name}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {getDatafromstore.email     }
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">status</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {(getDatafromstore.status)?"Active":"Inacitve"}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">About</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your
                    customers engaged with your social media accounts by posting
                    regularly yourself
                  </dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default Profile;
