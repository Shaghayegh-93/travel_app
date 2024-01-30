import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import RoomsInfo from "./components/RoomsInfo";
// import Rooms from "./components/Rooms";
import RoomListPage from "./pages/RoomListPage";
import SingleRoomPage from "./pages/SingleRoomPage";
import NotFoundPage from "./pages/NotFoundPage";
import RoomListProvider from "./context/RoomListProvider";

function App() {
  return (
    <RoomListProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="rooms" element={<RoomListPage />} />
          <Route path="rooms/:slug" element={<SingleRoomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </RoomListProvider>
  );
}

export default App;
