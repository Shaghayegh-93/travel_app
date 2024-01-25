import React from "react";
import Hero from "../components/Hero";
import Offers from "../components/Offers";
import Plan from "../components/Plan";
import Slider from "../components/Slider";
import Layout from "../components/Layout";
import { Link, NavLink } from "react-router-dom";
import Banner from "../components/Banner";

const HomePage = () => {
  return (
    <div className="App">
      <Layout>
        <Hero>
          <Banner
            title="Luxurious Rooms"
            subtitle=" Delux Rooms Starting At $299"
          >
            <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in ">
              <Link to="/rooms">OUR ROOMS</Link>
            </button>
          </Banner>
        </Hero>
        <Offers />
        <Plan />
        <Slider />
      </Layout>
    </div>
  );
};

export default HomePage;
