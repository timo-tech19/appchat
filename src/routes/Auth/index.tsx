import { Navigate, Outlet, useLocation } from "react-router-dom";
import branding from "../../assets/images/branding.svg";
import useAuth from "../../helpers/useAuth";

function Auth() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return (
    <main className='flex h-screen'>
      <section className='flex-1 md:flex justify-center items-center hidden'>
        <div className='max-w-[600px] max-h-[430px] relative'>
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
