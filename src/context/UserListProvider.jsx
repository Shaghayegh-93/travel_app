import React, { createContext, useContext, useReducer } from "react";
const UserListContext = createContext();
const initialState = {
  userList: [],
};

function userListReducer(state, action) {
  switch (action.type) {
    case "formSubmitHandler":
      return {
        userList: [...state.userList, action.payload],
      };
    default:
      throw new Error("Unknown action");
  }
}
const UserListProvider = ({ children }) => {
  const [{ userList }, dispatch] = useReducer(userListReducer, initialState);

  return (
    <UserListContext.Provider value={{userList,dispatch}}>
      {children}
    </UserListContext.Provider>
  );
};

export default UserListProvider;

export function useUserList() {
  return useContext(UserListContext);
}
