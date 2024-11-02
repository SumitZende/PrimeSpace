import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams();
    const [listing,setListings]=useState(null);
    const [error,setError]=useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const fetchListing = async ()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/getListings/${params.listingID}`);
                const data = await res.json();
                if(data.success === false ){
                    setError(true);
                    setLoading(false)
                    return;
                }
                setListings(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
            } 
        }
        fetchListing()
       
        
        
    },[params.listingID])  
  return (
   <main>
    {loading && <p className='text-center my-7 text-2xl'>Loading....</p>}
    {error && <p className='text-center my-7 text-2xl text-red-600'>Some Thing Went Wrong ...</p>}
    {listing && !loading && !error && (
  <div>
    <Swiper navigation>
      {listing.imageUrls.map((url) => (
        <SwiperSlide key={url}>
          <div
            className='h-[550px]'
            style={{
              background: `url(${url}) center no-repeat`,
              backgroundSize: 'cover',
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}
    

   </main>
  )
}
