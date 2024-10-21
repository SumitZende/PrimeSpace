import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Gapp } from "../Firbase";
import {
  updateUserInit,updateUserSuccess,updateUserFailure,
  deleteUserInit,deleteUserSuccess,deleteUserFailure,
  signOutUserFailure,signOutUserInit,signOutUserSuccess
} from "../redux/user/userSlice.js";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [success,setSuccess]=useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(Gapp);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.floor(progress));
      },
      (error) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserInit());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setSuccess(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

const handleDelete = async()=>{
  try {
    dispatch(deleteUserInit());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate('/signin')
      }
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut=async()=>{
  try {
    dispatch(signOutUserInit())
    const res = await fetch('/api/auth/signout')
    const data = await res.json();
    if(data.success===false ){
      dispatch(signOutUserFailure(data.message))
      return
    }
    else{
      dispatch(signOutUserSuccess(data))
    }
  } catch (error) {
    dispatch(signOutUserFailure(error.message))
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-serif text-center font-semibold text-3xl my-8 ">
        {" "}
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3  shadow-md"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 && fileUploadErr == false ? (
            <span className="text-green-700">Image upload successfull</span>
          ) : fileUploadErr ? (
            <span className="text-red-700">
              Error Image Upload (avatar must be a image less than 2mb)
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="name"
          className="border p-3 rounded-lg  shadow-md"
          defaultValue={currentUser.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg  shadow-md"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg  shadow-md"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg
                 uppercase p-3 hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "loading.." : "update"}
        </button>
        <Link 
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-85"
            to={'/create_Listing'}>
            Create lisitng
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer capitalize hover:underline"
        >
          delete account
        </span>
        <span 
          onClick={handleSignOut}
        className="text-red-700 cursor-pointer capitalize hover:underline">
          sign out
        </span>
      </div>
      <div className="mt-2">
        <p className='text-red-600' >
          {error ? error : ""}
        </p>
        <p className='text-green-600' >
          {success ? "Updated Succesfully!" : ""}
        </p>
      </div>
    </div>
  );
}
