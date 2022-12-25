import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Navigate,
  } from "react-router-dom";
  import { authentication } from "./firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { useEffect, useState } from "react";
  import Home from "../components/Home";
  import Login from "../components/Login";
  import Company from "../components/Company";
  import ComToken from "../components/CompTokens";
  
  export default function Router() {
    const [authUser, setAuthUser] = useState(false);
  
    useEffect(() => {
      // check user login or not
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          setAuthUser(true);
          console.log(user);
        } else {
          setAuthUser(false);
        }
      });
    }, []);
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route
            path="/"
            element={
              authUser == false ? (
                <Login />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            }
          />
          <Route
            path="/home"
            element={authUser ? <Home /> : <Navigate to="/" replace={true} />}
          />
          <Route path="/home/company" element={<Company />} />
          <Route path="/home/company/:tokenId/:userId" element={<ComToken />} />
        </>
      )
    );
  
    return <RouterProvider router={router} />;
  }
  