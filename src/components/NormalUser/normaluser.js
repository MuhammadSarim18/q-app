import './user.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getData } from '../../config/firebase'
import { getAuth, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";


function NormalUser() {

    const navigate = useNavigate()
    const auth = getAuth();
    // States-------.
    const [currentUser, setCurrentUser] = useState('')
    const [data, setData] = useState([])

    // Initialy-call-data.
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user ===> ', user);
            setCurrentUser(user.displayName)
        });
        getCompanyData()
    }, [])

    // get Company List function------.
    const getCompanyData = async () => {
        const companyList = await getData()
        let temp = [...companyList]
        setData(temp)
        console.log("temp ==>", temp)
    }

    // logout function.
    const logOut = async () => {
        try {
            const user = auth.currentUser;
            await signOut(auth)
            await deleteUser(user)
            console.log('signout success', 'User deleted')
        } catch (error) {
            console.log(error.message)
        }
    }

    // logout function.
    const logIn = async () => {
        navigate('/login')
    }

    // __________________________________________________________________________

    return (
        <>
            <div className="user-box">

                {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-3 fw-bold" to="/">Q-APP</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            {/* <!-- user detail --> */}
                            <div className="center">
                                <span className="px-2 py-2 fw-bold text-white">{currentUser ? `${currentUser}` : "Login please"}</span>
                                <span className="mx-2 fw-bold">{currentUser ? <button className="btn btn-primary fw-bold" onClick={logOut}>Sign Out</button> : <button className="btn btn-primary fw-bold" onClick={logIn}>Log In</button>}</span>
                            </div>

                        </div>
                    </div>
                </nav>

                {/* <!-- Main body --> */}
                <div className="all-flex py-4 px-4">
                    {data.map((item, i) => {
                        return (
                            <div className="card px-2 py-2 mx-2 my-2">
                                <div className="card-body flexbtw border-bottom">
                                    <span className="fs-3">Company{i + 1} : <b>{item.companyName}</b></span>
                                    <button className="fs-5 btn btn-primary mx-1">Details</button>
                                </div>
                                <div className="card-body flexbtw ">
                                    <span className="fs-5">Opening : <b>{item.openTime} AM</b></span>
                                    <span className="fs-5">Closing : <b>{item.closeTime} PM</b></span>
                                    <span className="fs-5">All Tokens : <b>{item.alltoken}</b></span>
                                    <span className="fs-5">Sold Tokens : <b>{0}</b></span>
                                </div>
                                <button className="fs-4 btn btn-sm btn-primary">BUY TOKEN</button>
                            </div>
                        )
                    })}
                </div>


            </div>
        </>
    )
}

export default NormalUser;