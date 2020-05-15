const initialState = {
  token: "",
  default: { account: "none", category: "none" },
  user: { username: "", roles: [] },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "storeClear":
      return {
        ...initialState,
        default: state.default,
      };
    case "tokenAdd":
      return {
        ...state,
        token: action.payload,
      };
    case "tokenClear":
      return {
        ...state,
        token: "",
      };
    case "setDefault":
      return {
        ...state,
        default: action.payload,
      };
    case "setUsername":
      return {
        ...state,
        user: { ...state.user, username: action.payload },
      };
    case "setRoles":
      return {
        ...state,
        user: { ...state.user, roles: action.payload },
      };
    default:
      return state;
  }
};
