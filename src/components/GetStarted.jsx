import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Getstarted = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
         
         <Link to="/dashboard" className="gold-btn-small ml-2 px-6 py-3 text-lg">Dashboard</Link>

        </>
      ) : (
        <SignInButton mode="modal">
           <Link  className="gold-btn-small ml-2 px-6 py-3 text-lg">Get Started</Link>
        </SignInButton>
      )}
    </div>
  );
};

export default Getstarted;
