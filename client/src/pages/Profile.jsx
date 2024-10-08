import {useSelector} from 'react-redux';

export default function Profile() {
  const  {currentUser} = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'> 
      <h1 className='font-serif text-center font-semibold text-3xl my-8 '> Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3  shadow-md' 
              src={currentUser.avatar}
              alt='profile'  />
        <input type='text' placeholder='username' id='name'
                className='border p-3 rounded-lg  shadow-md'/>
        <input type='email' placeholder='email' id='email'
                className='border p-3 rounded-lg  shadow-md'/>
        <input type='password' placeholder='password' id='password'
                className='border p-3 rounded-lg  shadow-md'/>
        <button className='bg-slate-700 text-white rounded-lg
                 uppercase p-3 hover:opacity-90 disabled:opacity-75'>
                update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer capitalize hover:underline'>delete account</span> 
        <span className='text-red-700 cursor-pointer capitalize hover:underline'>sign out</span>
      </div>
    </div>
  )
}
