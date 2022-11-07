import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { OrderPage } from "../pages/order-page/order-page";
import { MenuItemsCreatePage } from "../pages/menu-items/menu-items-create";
import { MenuItemListPage } from "../pages/menu-items/menu-items-list";
import { MenuItemsUpdatePage } from "../pages/menu-items/menu-items-update";
import { UpdatePage } from "../pages/menu-items/update";
import { RegisterPage } from "../pages/signup-page/sign-up";

//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: `/user`,
  order: `/order`,
  signup:`/signup`,
  menuItems: {
    create: `/menu-items/create`,
    list: `/menu-items/list`,
    update: `/menu-items/update/`,
    updateOne: `/menu-items/update/:id`,
    
  },
};

//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
  const user = useUser();
  return (
    <>
      {/* The page wrapper is what shows the NavBar at the top, it is around all pages inside of here. */}
      <PageWrapper user={user}>
        <Switch>
          {/* When path === / render LandingPage */}
          <Route path={routes.home} exact>
            <LandingPage />
          </Route>
          {/* When path === /iser render UserPage */}
          <Route path={routes.user} exact>
            <UserPage />
          </Route>
          <Route path={routes.order} exact>
            <OrderPage />
          </Route>
          {/* Going to route "localhost:5001/" will go to homepage */}
          <Route path={routes.root} exact>
            <Redirect to={routes.home} />
          </Route>
          <Route path={routes.menuItems.list}>
            <MenuItemListPage />
          </Route>
          <Route path={routes.menuItems.create}>
            <MenuItemsCreatePage />
          </Route>
          <Route path={routes.menuItems.updateOne}>
            <UpdatePage />
          </Route>
          <Route path={routes.menuItems.update}>
            <MenuItemsUpdatePage />
          </Route>
          <Route path={routes.signup}>
            <RegisterPage />
          </Route>

          {/* This should always come last.  
            If the path has no match, show page not found */}
          <Route path="*" exact>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
};
