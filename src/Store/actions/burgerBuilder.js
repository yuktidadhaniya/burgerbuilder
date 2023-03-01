import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        'https://react-my-burger-a1af7-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then((response) => {
        console.log('response', response);
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(fetchIngredientsFailed());
      });
  };
};
