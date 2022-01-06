import React from "react";
import TermButton from "./TermButton";
import { terms } from "../utilities/times";
import { signInWithGoogle } from "../utilities/firebase";
import { useUserState, signOut } from "../utilities/firebase";

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const TermSelector = ({ term, setTerm }) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
      { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );
}

export default TermSelector