import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const LoginSection = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
          <UserButton afterSignOutUrl="/" />
          
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
