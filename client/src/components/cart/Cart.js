
import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Divider } from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../context/Contextprovider";

const Cart = () => {


  const { id } = useParams("");
  // console.log(id)

  const history = useNavigate("");

  const { account, setAccount } = useContext(Logincontext);


  const [inddata, setIndedata] = useState("");
  console.log(inddata);


  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("no data available")
    } else {
      console.log("get data");
      setIndedata(data);
    }
  }

  useEffect(() => {
    setTimeout(getinddata, 1000);
    // getinddata();
  }, [id]);

  // add cart function
  const addtocart = async (id) => {
    // console.log(id);
    const checkResp = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inddata,
      }),
      //for sending cookies from frontend to backend for authentication we wright credentials include
      credentials: "include",
    });

    const data1 = await checkResp.json();
    console.log(data1);

    if (checkResp.status === 401 || !data1) {
      alert("User invalid");
    } else {
      // alert("data added in your cart");
      history("/buynow");
      setAccount(data1);
    }
  };


  return (

    <div className="cart_section">
      {inddata && Object.keys(inddata).length &&
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
              <button className="cart_btn2">Buy Now</button>
            </div>

          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
            <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
            <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>

            <div className="discount_box">
              <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
              <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
              <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
            </div>
            <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
          </div>
        </div>
      }



      {!inddata ? <div className="circle">
        <CircularProgress />
        <h2> Loading....</h2>
      </div> : ""}
    </div>
  )
}

export default Cart

