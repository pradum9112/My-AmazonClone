
import { React, useState, useContext, useEffect } from 'react'
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Rightnavbar from "./Rightnavbar";
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from "../context/Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";




const Navbar = () => {


    const { account, setAccount } = useContext(Logincontext);
    // console.log(account);

    const history = useNavigate("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //for searching in data
    const [text, setText] = useState("");
    // console.log(text);

    //list dropdown
    const [liopen, setLiopen] = useState(true);

    //only for search
    const { products } = useSelector((state) => state.getproductsdata);

    const [dropen, setDropen] = useState(false);



    //given user are valid or not
    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("error in data of valid user");
        } else {
            console.log("data valid of user");
            setAccount(data);
        }
    };







    

    // for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data2 = await res2.json();

        if (res2.status !== 201) {
            console.log("error");
            // const error = new Error(res2.error);
            // throw error;
        } else {
            console.log("data valid log");
            //alert("logout");
            toast.success("user Logout 😃!", {
                position: "top-center",
            });
            history("/");
            setAccount(false);
        }
    };

    const getText = (iteams) => {
        setText(iteams);
        setLiopen(false);
    };

    // for drawer

    const handleopen = () => {
        setDropen(true);
    };

    const handledrClose = () => {
        setDropen(false);
    };


    //it call just after page loading
    useEffect(() => {
        getdetailsvaliduser();
    }, []);

    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    {/* here define the right header */}
                    <Drawer open={dropen} onClose={handledrClose}>
                        <Rightnavbar  logclose={handledrClose}  logoutuser={logoutuser}  />
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"><img src="./amazon_PNG25.png" alt="" /></NavLink>
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products" id="" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>
                        {/* now code for search filter only */}

                        {text && (
                            <List className="extrasearch" hidden={liopen}>
                                {products
                                    .filter((product) =>
                                        product.title.longTitle
                                            .toLowerCase()
                                            .includes(text.toLowerCase())
                                    )
                                    .map((product) => (
                                        <ListItem>
                                            <NavLink
                                                to={`/getproductsone/${product.id}`}
                                                onClick={() => setLiopen(true)}
                                            >
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))}
                            </List>
                        )}
                    </div>

                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>
                    <div className="cart_btn">
                        {account ? (
                            <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>

                        ) : (
                            <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                        )}

                        <ToastContainer />

                        <p>Cart</p>
                    </div>


                    {account ?
                        (<Avatar className="avtar2"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            {account.fname[0].toUpperCase()}</Avatar>) :
                        (<Avatar className="avtar"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                        </Avatar>
                        )}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? (
                                <MenuItem
                                    onClick={() => { handleClose(); logoutuser(); }}
                                >
                                    <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout</MenuItem>) : ("")
                        }
                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
