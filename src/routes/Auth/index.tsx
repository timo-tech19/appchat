import { Navigate, Outlet, useLocation } from "react-router-dom";
import branding from "../../assets/images/branding.svg";

function Auth() {
  const session = localStorage.getItem("session");
  const location = useLocation();

  if (session) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return (
    <main className='flex h-screen'>
      {/* <nav className='fixed w-screen'>
        <div className='container py-4'>
          <h1 className='text-3xl'>
            <span>App</span>
            <span className='text-primary'>Chat</span>
          </h1>
        </div>
      </nav> */}
      <section className='flex-1 flex justify-center items-center'>
        <div className='w-[600px] h-[430px] relative'>
          <h2 className='absolute top-10 left-10'>Post thougts</h2>
          <img className='w-full h-full' src={branding} alt='Branding' />
          <h2 className='absolute bottom-0 right-0'>Start conversations</h2>
        </div>
      </section>
      <section className='bg-primary flex flex-1 justify-center items-center'>
        <Outlet />
      </section>
    </main>
  );
}

export default Auth;
