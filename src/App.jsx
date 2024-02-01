import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import RoomsInfo from "./components/RoomsInfo";
// import Rooms from "./components/Rooms";
import RoomListPage from "./pages/RoomListPage";
import SingleRoomPage from "./pages/SingleRoomPage";
import NotFoundPage from "./pages/NotFoundPage";
import RoomListProvider from "./context/RoomListProvider";
import ReservationPage from "./pages/ReservationPage";
import UserListProvider from "./context/UserListProvider";
import  { Toaster } from "react-hot-toast";
import Rooms from "./components/Rooms";
import GallerPage from "./pages/GallerPage";


function App() {
  return (
    <UserListProvider>
      <RoomListProvider>
        <Toaster />

        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="rooms" element={<RoomListPage />} />
            <Route path="rooms/:slug" element={<SingleRoomPage />} />
            <Route
              path="rooms/:slug/reservation"
              element={<ReservationPage />}
            />
            <Route path="gallery" element={<GallerPage/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </RoomListProvider>
    </UserListProvider>
  );
}

export default App;
