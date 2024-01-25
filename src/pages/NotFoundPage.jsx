import React from "react";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

const NotFoundPage = () => {
  return (
    <div>
      <Layout>
        <Hero>
          <Banner title="404" subtitle=" PAGE NOT FOUND">
            <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in ">
              <Link to="/">RETURN HOME</Link>
            </button>
          </Banner>
        </Hero>
      </Layout>
    </div>
  );
};

export default NotFoundPage;
