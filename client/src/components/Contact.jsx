import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landloard, setLandlord] = useState(null);
  const [message, setMessage] = useState();


  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.error);
        }
        setLandlord(data);
        console.log(`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landloard && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landloard.name}</span> for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-85"
          >
            send meassage
            
          </Link>
        </div>
      )}
    </>
  );
}
