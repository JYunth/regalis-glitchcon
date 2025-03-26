import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Getstarted = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
          <UserButton afterSignOutUrl="/" />
          <Link to="/dashboard" className="gold-btn-large ml-4">Dashboard</Link>
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="gold-btn-small">Get STarted</button>
        </SignInButton>
      )}
    </div>
  );
};

export default Getstarted;
