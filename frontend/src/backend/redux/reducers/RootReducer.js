const initialState = {
  token: "",
  default: { account: "none", category: "none" },
  username: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "tokenAdd":
      return {
        ...state,
        token: action.payload
      };
    case "tokenClear":
      return {
        ...state,
        token: ""
      };
    case "setDefault":
      return {
        ...state,
        default: action.payload
      };
    case "setUsername":
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};
