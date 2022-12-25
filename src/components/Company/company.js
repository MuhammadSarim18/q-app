import './company.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { db, getData } from '../../config/firebase'


function Company() {
  // states.
  const [companyName, setCompanyName] = useState('')
  const [companySince, setCompanySince] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [alltoken, setAlltoken] = useState(0)
  const [tokenTime, setTokenTime] = useState(0)
  const [data, setData] = useState([])


  // initially-call-data.
  useEffect(() => {
    getCompanyData()
    console.log('data==>', data)
  }, [])


  // getCompanyList function------.
  const getCompanyData = async () => {
    const companyList = await getData()
    let temp = [...companyList]
    setData(temp)
    console.log("temp ==>", temp)
  }


  // GetDetail function.
  const getDetail = async () => {
    if (companyName !== '' && companySince !== '' && openTime !== '' && closeTime !== '' && companyAddress !== '' && alltoken !== '' && tokenTime !== '') {
      // Add-Company-detail-In-Firestore.
      const companyId = `${auth.currentUser.uid}${Date.now()}`;
      const docRef = await setDoc(doc(db, "Company", companyId), {
        companyName, companySince, openTime, closeTime, companyAddress, alltoken, tokenTime
      });
      // console for debugging.
      console.log('docRef==', docRef, ' companyName==', companyName, ' companySince==', companySince, ' openTime==', openTime, ' closeTime==', closeTime, ' companyAddress==', companyAddress, ' alltoken==', alltoken, ' tokenTime==', tokenTime)
    }
    else {
      alert('please write some detail!');
    }
  }


  return (
    <>
      <div className="company-box">

        {/* <!-- Navbar --> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3 fw-bold" to="/">Q-APP</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              {/* <!-- Button trigger modal --> */}
              <button className="size-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal"><span className="mx-2"><img src={require('../../images/plus-icon.png')} alt="plus-icon" className="size-2" /></span><span className="mx-2 fw-bold">CREATE COMPANY</span></button>
            </div>
          </div>
        </nav>

        {/* <!-- Modal --> */}
        <div className="modal fade bg-dark" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="detailModalLabel">Company Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <label htmlFor="inp-1" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="inp-1" placeholder='Enter Company Name' onChange={(e) => { setCompanyName(e.target.value) }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inp-2" className="col-sm-2 col-form-label">Since</label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id="inp-2" placeholder='Company Since' onChange={(e) => { setCompanySince(e.target.value) }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inp-3" className="col-sm-2 col-form-label">Opening</label>
                  <div className="col-sm-10">
                    <input type="time" className="form-control" id="inp-3" placeholder='Enter Certificates (Max 3 Images)' onChange={(e) => { setOpenTime(e.target.value) }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inp-4" className="col-sm-2 col-form-label">Closing</label>
                  <div className="col-sm-10">
                    <input type="time" className="form-control" id="inp-4" placeholder='Enter Company Timings' onChange={(e) => { setCloseTime(e.target.value) }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inp-5" className="col-sm-2 col-form-label">Address</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="inp-5" placeholder='Enter Company Address' onChange={(e) => { setCompanyAddress(e.target.value) }} />
                  </div>
                </div>

                <div className="border border-secondary rounded py-2 px-2">
                  <span className="fs-5 fw-5 px-2 border-secondary border-bottom">Add Tokens</span>
                  <input type="number" className="form-control my-2" id="inp-6" placeholder='No of Tokens' onChange={(e) => { setAlltoken(e.target.value) }} />
                  <input type="number" className="form-control my-2" id="inp-7" placeholder='Per Token Time' onChange={(e) => { setTokenTime(e.target.value) }} />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={getDetail}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main-Container */}
        <div className="all-flex py-4 px-4">
          {data.map((item) => {
            return (
              <div className="card px-2 py-2 mx-2 my-2">
                <div className="card-body flexbtw border-bottom">
                  <span className="fs-3">Company : <b>{item.companyName}</b></span>
                  <div className="size-1">
                    <button className="fs-5 btn btn-primary mx-1">Update Token</button>
                    <button className="fs-5 btn btn-danger mx-1">Delete Company</button>
                  </div>
                </div>
                <div className="card-body flexbtw ">
                  <span className="fs-5">All Tokens : <b>{item.alltoken}</b></span>
                  <span className="fs-5">Per Token Time : <b>{item.tokenTime} minutes</b></span>
                  <span className="fs-5">Tokens Sold : <b>{0}</b></span>
                  <span className="fs-5">Tokens Used : <b>{0}</b></span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Company;
