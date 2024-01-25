import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const RoomListPage = () => {
  return (
    <div>
      <Layout>
         <Hero>
        <Banner title="OUR ROOMS">
          <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in ">
            <Link to="/">RETURN HOME</Link>
          </button>
        </Banner>
      </Hero>
      </Layout>
     
    </div>
  );
};

export default RoomListPage;
