import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Gapp } from "../Firbase";
import { useDispatch } from "react-redux";
import { signInSucces } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(Gapp);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSucces(data));
      navigate("/");
    } catch (error) {
      console.log("not sign in whith google", error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-700 p-3 rounded-md text-white uppercase hover:opacity-75"
      onClick={handleGoogleClick}
    >
      Continue With Google
    </button>
  );
}
