import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className='flex items-center justify-between px-10 py-5'>
      <div className='logo'>
        <h1 className='text-2xl font-medium'>
          <span>App</span>
          <span className='text-primary'>Chat</span>
        </h1>
      </div>
      <ul className='flex'>
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
      </ul>
    </nav>
  );
}

export default Navbar;
