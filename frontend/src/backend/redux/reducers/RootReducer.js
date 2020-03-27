export default (state, action) => {
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
    case "historyAdd":
      return {
        ...state,
        history: action.payload
      };
    default:
      return state;
  }
};
