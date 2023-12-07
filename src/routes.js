import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import EventDisplay from "views/admin/marketplace/event";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUp from "views/auth/register";

const userLoggedData = JSON.parse(sessionStorage.getItem("userLoggedData"));

var routes = [];

if(userLoggedData.admin == false) {
routes = [
  {
    name: "Events",
    layout: "/admin",
    path: "/events",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignUp,
  },
  {
    name: "Event Info",
    layout: "/admin",
    path: "/event-info",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: EventDisplay,
  }
];
}
else {
  routes = [
    {
      name: "Main Dashboard",
      layout: "/admin",
      path: "/default",
      icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
      component: MainDashboard,
    },
    {
      name: "NFT Marketplace",
      layout: "/admin",
      path: "/nft-marketplace",
      icon: (
        <Icon
          as={MdOutlineShoppingCart}
          width='20px'
          height='20px'
          color='inherit'
        />
      ),
      component: NFTMarketplace,
      secondary: true,
    },
    {
      name: "Data Tables",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
      path: "/data-tables",
      component: DataTables,
    },
    {
      name: "Profile",
      layout: "/admin",
      path: "/profile",
      icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
      component: Profile,
    },
    {
      name: "Sign In",
      layout: "/auth",
      path: "/sign-in",
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignInCentered,
    },
    {
      name: "Sign Up",
      layout: "/auth",
      path: "/sign-up",
      icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
      component: SignUp,
    },
    {
      name: "RTL Admin",
      layout: "/rtl",
      path: "/rtl-default",
      icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
      component: RTL,
    },
  ];
}


export default routes;
