import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import items from "../../data";
import { useRoomList } from "../context/RoomListProvider";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import defaultBackgroundImage from "../assets/images/room-12.jpeg";

const SingleRoomPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { isLoading, roomList, getSingleRoom, room } = useRoomList();
  useEffect(() => {
    getSingleRoom(slug);
  }, [slug]);

  if (!room) return <p>choose a room</p>;
  return (
    <div>
      <Layout>
        <Hero
          backgroundImage={room[0]?.images && room[0].images[0]}

          
        >
          <Banner title={room[0]?.name}>
            <div className="flex w-full items-center justify-center gap-2 md:gap-4">
              <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in duration-300 w-1/2 ">
                <Link to="/rooms">BACK TO ROOMS</Link>
              </button>
              <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in duration-300 w-1/2">
                <Link to={`/rooms/${slug}/reservation`}>BOOk ROOM</Link>
              </button>
            </div>
          </Banner>
        </Hero>
        <div className="max-w-[1400px] flex items-center py-16 px-4 m-auto gap-10 flex-col">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20  ">
            {room[0]?.images
              .map((image) => <img className="" src={image} />)
              .slice(1, 4)}
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className=" md:w-2/4 flex flex-col">
              <h3>Details</h3>
              <p>{room[0]?.description}</p>
            </div>
            <div className="md:w-1/4 flex flex-col">
              <h3>Details</h3>
              <ul className="flex flex-col">
                <li>
                  <span>Price:</span>${room[0]?.price}
                </li>
                <li>
                  <span>Size:</span>
                  {room[0]?.size}
                </li>
                <li>
                  <span>Max Capacity:</span>
                  {room[0]?.capacity > 1
                    ? `${room[0]?.capacity} People`
                    : `${room[0]?.capacity} Person`}
                </li>
                <li>
                  {room[0]?.pets ? (
                    <span>Pets Allowed</span>
                  ) : (
                    <span>Pets Not Allowed</span>
                  )}
                </li>
                <li>
                  {room[0]?.breakfast && <span>Free Breakfast Included</span>}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3>Extras</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
              {room[0]?.extras.map((extra) => (
                <li>-{extra}</li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SingleRoomPage;
