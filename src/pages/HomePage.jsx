import React from "react";
import Hero from "../components/Hero";
import Plan from "../components/Plan";
import Slider from "../components/Slider";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Services from "../components/Services";
import FeaturedRooms from "../components/FeaturedRooms";
import heroImage from "../assets/images/defaultBcg.jpeg";

const HomePage = () => {
  return (
    <div className="App">
      <Layout>
        <Hero backgroundImage={heroImage}>
          <Banner
            title="Luxurious Rooms"
            subtitle=" Delux Rooms Starting At $299"
          >
            <button className="py-2 font-medium  border-2 hover:bg-black hover:text-white transition ease-in duration-300 ">
              <Link to="/rooms">ROOMS</Link>
            </button>
          </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        <Plan />
        <Slider />
      </Layout>
    </div>
  );
};

export default HomePage;
