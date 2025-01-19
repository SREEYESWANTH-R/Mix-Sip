import {Outlet} from 'react-router-dom'

export default function AdminAuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground ">
            <h1 className="text-4xl text-white font-extrabold tracking-tight"> Welcome to Mix&Sip</h1>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>     
        <Outlet/>
      </div>
    </div>
  )
}
