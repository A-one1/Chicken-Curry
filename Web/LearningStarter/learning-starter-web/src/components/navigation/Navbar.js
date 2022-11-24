import { click } from "@testing-library/user-event/dist/click";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/config";
import { Button as BUTTON } from "./button";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppinCartContext";
import "./navigation.css";
import {
  Dropdown,
  Image,
  Menu,
  Icon,
  Button,
  SemanticICONS,
  Container,
  Modal,
  Header,
  Item,
} from "semantic-ui-react";
import { MenuItemsGetDto, UserDto } from "../../constants/types";
import { logoutUser } from "../../authentication/authentication-services";
import { CartItem } from "../shopping-cart/CartItem";
import { BaseUrl } from "../../constants/env-vars";

function Navbar() {
  const history = useHistory();
  const menulist = () => {
    history.push(routes.menuItems.list);
  };
  const menucreate = () => {
    history.push(routes.menuItems.create);
  };
  const menuupdate = () => {
    history.push(routes.menuItems.update);
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const [button, setButton] = useState(true);

  const [total, setTotal] = useState(0);

  const toUSD = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const { openCart, cartItems, cartQuantity, getCartItems } = useShoppingCart();

  const [open, setOpen] = React.useState(false);

  const [secondOpen, setSecondOpen] = React.useState(false);

  // const [menuItems, setMenuItems] = useState<MenuItemsGetDto[]>();
  var menuItemsIds = getCartItems();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CURRY <i className="fab fa-typo3"></i>
          </Link>
          <div>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-items">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>

              {/* <li className="nav-items">
              <Link
                to={routes.menuItems.list}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Menu
              </Link>
            </li> */}
              <li className="nav-items">
                <div className="dropdown" style={{ marginTop: "2px" }}>
                  <Button
                    className="dropbtn"
                    style={{
                      color: "white",
                      fontSize: "1.2rem",
                      backgroundColor: "transparent",
                      
                    }}
                  >
                    Menu
                  </Button>

                  <div
                    className="dropdown-content"
                    style={{ backgroundColor: "#242424" }}
                  >
                    <a style={{ color: "white" }} onClick={menulist}>
                      <i className="food icon"></i>List
                    </a>
                    <a onClick={menucreate} style={{ color: "white" }}>
                      <i className="plus icon"> </i>Create
                    </a>
                    <a onClick={menuupdate} style={{ color: "white" }}>
                      <i className="settings icon"></i>Update
                    </a>
                  </div>
                </div>
              </li>

              <li className="nav-items">
                <Link
                  to={routes.menuItems.list}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  ORDER NOW
                </Link>
              </li>
              <li className="nav-items">
                <Link
                  to="/signup"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-items">
                {/* {button && <BUTTON buttonStyle="btn--outline" style={{backgroundColor: "transparent"}}>SIGN UP</BUTTON>} */}
                {cartQuantity > 0 && (
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <Button
                        onClick={openCart}
                        style={{
                          width: "4.5rem",
                          height: "4rem",
                          position: "relative",
                          background: "transparent",
                          color: "white",
                        }}
                        vairant="outline-primary"
                        className="ui circular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          fill="currentColor"
                        >
                          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                        </svg>
                        <div
                          className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                          style={{
                            color: "lightred",
                            width: "1.5rem",
                            height: "1.5rem",
                            position: "absolute",
                            bottom: 33,
                            right: 20,
                            transform: "translate(0%, 10%)",
                          }}
                        >
                          {cartQuantity}
                        </div>
                      </Button>
                    }
                  >
                    <Modal.Header>Your Cart</Modal.Header>
                    <Modal.Content>
                      {menuItemsIds.map((menuItem) => {
                        return (
                          <CartItem
                            id={menuItem.id}
                            quantity={menuItem.quantity}
                            setTotal={setTotal}
                            total={total}
                          ></CartItem>
                        );
                      })}
                    </Modal.Content>
                    <Modal.Actions>
                      Total:{total}
                      <Button
                        className="ui right labeled icon button"
                        color="black"
                        content="Cancel"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                        <i className="cancel icon"></i>
                      </Button>
                      <Button
                        content="Proceed"
                        labelPosition="right"
                        icon="checkmark"
                        onClick={() => setSecondOpen(true)}
                        positive
                      />
                    </Modal.Actions>
                    <Modal
                      onClose={() => setSecondOpen(false)}
                      open={secondOpen}
                      size="small"
                    >
                      <Modal.Header>Thank You</Modal.Header>
                      <Modal.Content>
                        <p>Order Placed Successfully</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content="All Done"
                          onClick={() => setOpen(false)}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Modal>
                )}
              </li>
              <li className="nav-items">
                <div className="dropdown">
                  <Button
                    className="dropbtn"
                    style={{
                      color: "white",
                      fontSize: "1.2rem",
                      backgroundColor: "transparent",
                      
                    }}
                  >
                    <i className="angle down icon"></i>
                  </Button>
                  <div
                    className="dropdown-content"
                    style={{ backgroundColor: "#242424", float:"right"}}
                  >
                    <a style={{ color: "white" }} href={routes.order}>
                      My Orders
                    </a>
                    <a style={{ color: "white" }} href={routes.user}>
                      Edit Profile
                    </a>
                    {/* <a style={{ color: "white" }} href={routes.contactus}>
                      Contact Us
                    </a> */}
                    <a
                      href={routes.menuItems.list}
                      style={{ color: "white" }}
                      onClick={async () => {
                        logoutUser();
                      }}
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
