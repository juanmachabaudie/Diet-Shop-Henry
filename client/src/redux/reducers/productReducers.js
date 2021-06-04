const initialState = {
  products: [],
  product: [],
  message: {},
  update: {},
  reviews: [],
  search: [],
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        search: action.payload
      }
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        message: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };

    case "PUT_PRODUCT":
      return {
        ...state,
        message: action.payload,
    };

    case "ADD_REVIEW":
      return {
        ...state,
        message: action.payload,
     
      };
      
    case "GET_REVIEWS_PRODUCT":
      return {
        ...state,
        reviews: action.payload
      }

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(prod => prod.uuid !== action.payload.uuid)
      } 
    
    default:
      return state;
  }
}
