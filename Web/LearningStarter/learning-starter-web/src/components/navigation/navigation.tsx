import "./navigation.css";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import {
  Dropdown,
  Image,
  Menu,
  Icon,
  SemanticICONS,
  Container,
  Button,
  Modal,
  Header,
  Item,
} from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { MenuItemsGetDto, UserDto } from "../../constants/types";
import { logoutUser } from "../../authentication/authentication-services";
import { routes } from "../../routes/config";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppinCartContext";
import { CartItem } from "../shopping-cart/CartItem";
import axios from "axios";
import { BaseUrl } from "../../constants/env-vars";

type PrimaryNavigationProps = {
  user?: UserDto;
};

type NavigationItem = {
  text: string;
  icon?: SemanticICONS | undefined;
  hide?: boolean;
} & (
  | {
      nav: Omit<
        NavLinkProps,
        keyof React.AnchorHTMLAttributes<HTMLAnchorElement>
      >;
      children?: never;
    }
  | { nav?: never; children: NavigationItem[] }
);

//This is where the navigation buttons are defined.
//const navigate = useNavigate();
const DesktopNavigation = () => {
  const navigation: NavigationItem[] = useMemo(() => {
    return [
      {
        text: "Home",
        icon: "home",
        hide: false,
        nav: {
          to: routes.home,
        },
      },
      {
        text: "User",
        icon: "user",
        hide: false,
        nav: {
          to: routes.user,
        },
      },
      {
        text: "Order",
        icon: "coffee",
        hide: false,
        nav: {
          to: routes.order,
        },
      },
      {
        text: "Menu Items",
        children: [
          {
            text: "Menu",
            icon: "food",
            hide: false,
            nav: {
              to: routes.menuItems.list,
            },
          },
          {
            text: "Create",
            icon: "plus",
            hide: false,
            nav: {
              to: routes.menuItems.create,
            },
          },
          {
            text: "Update",
            icon: "settings",
            hide: false,
            nav: {
              to: routes.menuItems.update,
            },
          },
        ],
      },
    ];
  }, []);

  //This is where the navigation buttons are mapped over to produce the links and such.
  return (
    <Menu
      secondary
      role="navigation"
      className="desktop-navigation"
      size="large"
    >
      {navigation
        .filter((x) => !x.hide)
        .map((x, i) => {
          if (x.children) {
            return (
              <Dropdown
                key={i}
                trigger={
                  <span>
                    {x.icon && <Icon size="small" fitted name={x.icon} />}{" "}
                    {x.text}
                  </span>
                }
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  {x.children
                    .filter((x) => !x.hide)
                    .map((y) => {
                      return (
                        <Dropdown.Item
                          key={`${y.text}`}
                          as={NavLink}
                          to={y.nav?.to}
                        >
                          {y.icon && <Icon size="small" fitted name={y.icon} />}
                          {y.text}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            );
          }
          return (
            <Menu.Item key={i} as={NavLink} {...x.nav}>
              {x.icon && <Icon size="small" name={x.icon} />} {x.text}
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

//This defines the container for all the nav stuff at the top
export const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  user,
}) => {
  const { openCart, cartItems, cartQuantity, getCartItems } = useShoppingCart();

  const [open, setOpen] = React.useState(false);

  const [menuItems, setMenuItems] = useState<MenuItemsGetDto[]>();
  var menuItemsIds = getCartItems();

  return (
    <Menu secondary className="top-navigation">
      <Menu.Item
        as={user ? NavLink : ""}
        to={routes.home}
        className="logo-menu-item"
      >
        <Image size="mini" src={logo} alt="logo" className="logo" />
      </Menu.Item>

      {user && (
        <>
          <DesktopNavigation />
          <Menu.Menu position="right">
            <div>
              <br />
              <Link to={`/signup`}>
                <Button className="ui button">Sign Up</Button>
              </Link>
            </div>

            <Dropdown
              as="a"
              inverted
              style={{ marginLeft: "0.5em" }}
              item
              className="user-icon"
              trigger={
                <span
                  className="user-icon-initial"
                  title={`${user.firstName} ${user.lastName}`}
                >
                  {user.firstName.substring(0, 1).toUpperCase()}
                  {user.lastName.substring(0, 1).toUpperCase()}
                </span>
              }
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={async () => {
                    logoutUser();
                  }}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
                      ></CartItem>
                    );
                  })}
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            )}
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};
