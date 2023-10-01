
import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState();
  const auth = getAuth(app);
  //   console.log(app)
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const handleGithubSignIn=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const loggedInUser=result.user;
      console.log(loggedInUser);
      setUser(loggedInUser);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* user? logout: sign in */}

      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google Login</button>
          <button onClick={handleGithubSignIn}>Github Login</button>
        </div>
      )}
      {user && (
        <div>
          <h2>User: {user.displayName}</h2>
          <h3>Email: {user.email}</h3>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
