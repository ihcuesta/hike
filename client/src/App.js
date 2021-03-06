import React from "react";
import "typeface-montserrat";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Layout } from "./components/UI/Layout";
import { withAuthentication } from "./context/withAuthentication";
import { GlobalStyles } from "./components/styled/globalStyles";
import { NewRestaurant } from "./components/pages/NewRestaurant";
import { NewPlan } from "./components/pages/NewPlan";
import { AdminHiker } from "./components/pages/AdminHiker";
import { AdminRest } from "./components/pages/AdminRest";
import { RestaurantDetail } from "./components/pages/RestaurantDetail";
import { PlanDetail } from "./components/pages/PlanDetail";
import { Header } from "./components/UI/Header";
import { EditRestaurant } from "./components/pages/EditRestaurant";
import { EditPlan } from "./components/pages/EditPlan";
import { EditUser } from "./components/pages/EditUser";
import { LandingRest } from "./components/pages/LandingRest";
import { AboutUs } from "./components/pages/AboutUs";

import ScrollMemory from "react-router-scroll-memory";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export const App = withAuthentication(() => (
  <Router>
    <ScrollMemory />
    <GlobalStyles>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route path="/restaurant/new" component={NewRestaurant} />

        <Route path="/restaurant/:id/edit" component={EditRestaurant} />
        <Route path="/restaurant/:id" component={RestaurantDetail} />

        <Route path="/plan/new" component={NewPlan} />
        <Route path="/plan/:id/edit" component={EditPlan} />
        <Route path="/plan/:id" component={PlanDetail} />
        <Route path="/hiker/admin" component={AdminHiker} />
        <Route path="/owner/admin" component={AdminRest} />
        <Route path="/profile/edit" component={EditUser} />
        <Route path="/landing" component={LandingRest} />
        <Route path="/about-us" component={AboutUs} />
      </Switch>
    </GlobalStyles>
  </Router>
));

export default App;
