import { React, useState } from 'react'
import "./signup_signin.css";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {

  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });

  // console.log(udata);

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value
      }
    })
  }

  const senddata = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = udata;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, email, mobile, password, cpassword
      })
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      toast.error("Invalid Details😞!", { position: "top-center" });
    } else {
      setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
      toast.success("Registration Successfully done🤩!", { position: "top-center" });
    }

  }


  return (
    <div>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method='POST'>
              <h1>sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your name</label>
                <input type="text"
                  onChange={adddata}
                  value={udata.fname}
                  name="fname"
                  id="fname" />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text"
                  onChange={adddata}
                  value={udata.email}
                  name="email"
                  id="email" />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile</label>
                <input type="text"
                  onChange={adddata}
                  value={udata.mobile}
                  name="mobile"
                  id="mobile" />
              </div>
              <div className="form_data">
                <label htmlFor="">Password</label>
                <input type="password"
                  onChange={adddata}
                  value={udata.password}
                  name="password"
                  id="password"
                  placeholder='At least 6 character' />
              </div>
              <div className="form_data">
                <label htmlFor="cpassword">Password Again</label>
                <input type="password"
                  onChange={adddata}
                  value={udata.cpassword}
                  name="cpassword"
                  id="password" />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
              <div className="signin_info">
                <p>Already have a account?</p>
                <NavLink to="/login"> Sign in</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </div>
  )
}

export default SignUp
