import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    const getDataFromStorage = JSON.parse(localStorage.getItem("userLogin"));
    if (!getDataFromStorage) {
      navigate("/login");
    }
  }, []);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleNavigation = (link) => {
    if (link.name === "Sign In") {
      navigate("/login");
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const getDataFromStorage = JSON.parse(localStorage.getItem("userLogin"));

  return (
    <>
      {
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
          {activeMenu && (
            <>
              <div className="flex justify-between items-center">
                <Link
                  to="/"
                  onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                >
                  <SiShopware /> <span>Admin Panel</span>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                    style={{ color: currentColor }}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>
              <div className="mt-10 ">
                {links.map((item) => (
                  <div key={item.title}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                      {item.title}
                    </p>
                    {item.links.map((link) => {
                      return (
                        <>
                          {
                            <NavLink
                              to={link.name}
                              key={link.name}
                              onClick={() => {
                                handleCloseSideBar, handleNavigation(link);
                              }}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? currentColor : "",
                              })}
                              className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                              }
                            >
                              {link.icon}
                              <span className="capitalize ">{link.name}</span>
                            </NavLink>
                          }
                        </>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      }
    </>
  );
};

export default Sidebar;
