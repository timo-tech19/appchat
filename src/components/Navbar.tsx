import { MouseEvent, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../helpers/useAuth";

function Navbar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [showSideNav, setShowSideNav] = useState(false);

  const handleClick = () => {
    signout();
    navigate("/signin");
  };

  const closeSideNav = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).id === "backdrop") setShowSideNav(false);
  };

  return (
    <>
      <div
        id='backdrop'
        className={`${
          showSideNav ? "fixed" : "hidden"
        } top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.3)]`}
        onClick={closeSideNav}
      >
        <nav className='bg-light w-1/2 h-full p-5'>
          <ul className='flex flex-col text-center'>
            <p className='mb-6'>Hello, {user?.displayName}</p>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary underline" : ""
                }
                to='/'
              >
                Feed
              </NavLink>
            </li>
            <li className='mt-2'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary underline" : ""
                }
                to='/chats'
              >
                Chats
              </NavLink>
            </li>
            <button
              onClick={handleClick}
              type='button'
              className='text-primary border-2 border-primary px-4 py-2 rounded-lg mt-4'
            >
              Log out
            </button>
          </ul>
        </nav>
      </div>

      <nav className='flex items-center justify-between px-10 py-5'>
        <div className='logo'>
          <h1 className='text-2xl font-medium'>
            <span>App</span>
            <span className='text-primary'>Chat</span>
          </h1>
        </div>
        <BiMenu
          className='md:hidden'
          size={"2em"}
          onClick={() => setShowSideNav(true)}
        />
        <ul className='hidden md:flex items-center'>
          <p className='mr-6'>Hello, {user?.displayName}</p>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary underline" : ""
              }
              to='/'
            >
              Feed
            </NavLink>
          </li>
          <li className='ml-6'>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary underline" : ""
              }
              to='/chats'
            >
              Chats
            </NavLink>
          </li>
          <button
            onClick={handleClick}
            type='button'
            className='text-primary border-2 border-primary px-4 py-2 rounded-lg ml-4'
          >
            Log out
          </button>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
