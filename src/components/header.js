import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { resetProducts, searchProducts } from "../store/ProductSlice";
import { Link } from "react-router-dom";
import Basket from "./basket";
import { Button, Menu } from "@mui/material";
function Header() {
  const [searcText, setSearcText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    search(searcText);
  }, [searcText]);
  async function search(text) {
    dispatch(resetProducts());
    if (text.trim()) {
      dispatch(searchProducts(text));
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-brand ">
      <div className="container mx-auto p-3 flex justify-between gap-3 flex-wrap">
        <Link to="/">
          <h1 className="text-white text-2xl font-extrabold">Eteration</h1>
        </Link>
        <div className="flex-1 lg:ml-24 md:px-5 relative order-3 md:order-2  md:mt-0">
          <IoSearchOutline
            className="absolute md:left-6 left-1  top-1/2 -translate-y-1/2"
            size={20}
          />
          <input
            onChange={(e) => setSearcText(e.target.value)}
            className="bg-white p-1 pl-7 md:w-[40%] min-w-[285px] sm:min-w-[300px] w-full"
          />
        </div>
        <div className="flex flex-wrap justify-items-center order-2 md:order-3 gap-x-5">
          <div>          
            <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className=" flex gap-x-2 items-center"
          >
            <BsBag size={20} color="white" />
            <span className="text-white">177.000&#x20BA;</span>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Basket />
          </Menu>
          </div>

          <div className=" flex gap-x-2 items-center">
            <CiUser size={20} color="white" />
            <span className="text-white">Kerem</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
