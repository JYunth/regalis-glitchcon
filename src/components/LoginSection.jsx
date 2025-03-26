import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const LoginSection = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
          <UserButton afterSignOutUrl="/" />
          <Link to="/dashboard" className="gold-btn-small ml-4">Dashboard</Link>
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="gold-btn-small">Login</button>
        </SignInButton>
      )}
    </div>
  );
};

export default LoginSection;
