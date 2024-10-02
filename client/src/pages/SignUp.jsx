import { useState } from "react";
import {Link ,useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData,setFromData] = useState({})
    const [error,setError] =useState(null)
    const [loading,setLoading] =useState(false)
    const navigate=useNavigate()
    const handleChange=(e)=>{
      setFromData({
        ...formData,
        [e.target.id]:e.target.value,
      });

    }
  
    const handleSubmit=async (e)=>{
      e.preventDefault();
      try
      {
        setLoading(true)
        const res =  await fetch('api/auth/signup',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
          });
          const data = await res.json();
          if(data.success === false){
            setLoading(false)
            setError(data.message);
          }else{
            setLoading(false)
            setError(null)   
            navigate('/signin')
          }
      }
      catch(error){
          setLoading(false)
          setError(error.message)
        }
    }
    
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="name"
          placeholder="username"
          className="border p-3 rounded-lg shadow-md"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg shadow-md"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg shadow-md"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90
          disabled:opacity-80 shadow-md"
        >
          {loading ?'Loading...':'sign up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
        {error && <p className={`mt-5 ${error ?'text-red-500':'text-green-500'}`}>{error}</p>}
    </div>
  );
}
