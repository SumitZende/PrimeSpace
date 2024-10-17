import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Gapp } from "../Firbase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-serif text-center font-semibold text-3xl my-8 ">
        {" "}
        Profile
      </h1>
      <form className="flex flex-col gap-4">
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
        <p className='text-sm self-center'>
          {
            filePerc > 0 && filePerc < 100 ?(
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ):
            filePerc === 100 && fileUploadErr == false ?(
              <span className='text-green-700'>Image upload successfull</span>
            ):
            fileUploadErr ? (
              <span className='text-red-700'>Error Image Upload (avatar must be a image less than 2mb)</span>
            ):('')
          }
        </p>
        <input
          type="text"
          placeholder="username"
          id="name"
          className="border p-3 rounded-lg  shadow-md"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg  shadow-md"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg  shadow-md"
        />
        <button
          className="bg-slate-700 text-white rounded-lg
                 uppercase p-3 hover:opacity-90 disabled:opacity-75"
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer capitalize hover:underline">
          delete account
        </span>
        <span className="text-red-700 cursor-pointer capitalize hover:underline">
          sign out
        </span>
      </div>
    </div>
  );
}
