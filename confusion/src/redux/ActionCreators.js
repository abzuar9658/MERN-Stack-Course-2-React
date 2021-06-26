import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

export const fetchDishes = () => async (dispatch) => {
  dispatch(dishesLoading(true));

  try {
    const res = await axios.get(`${baseUrl}dishes`);
    console.log(res.data);
    dispatch(addDishes(res.data));
  } catch (error) {
    dispatch(dishesFailed(error.message));
  }
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}comments`);
    dispatch(addComments(res.data));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => async (dispatch) => {
  dispatch(promosLoading());

  try {
    const res = await axios.get(`${baseUrl}promotions`);
    dispatch(addPromos(res.data));
  } catch (error) {
    dispatch(promosFailed(error.message));
  }
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment =
  (dishId, rating, author, comment) => async (dispatch) => {
    const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
    };
    newComment.date = new Date().toISOString();

    try {
      const config = {
        headers: {
          ContentType: `application/json`,
          credentials: "same-origin",
        },
      };
      const res = await axios.post(`${baseUrl}comments`, newComment, config);
      if (res.status === 201) {
        return dispatch(addComment(res.data));
      } else throw new Error(`Error ${res.status}: ${res.statusText}`);
    } catch (error) {
      console.log(`post comments: ${error.message}`);
      alert(`Your comment could not be posted\n Error: ${error.message}`);
    }
  };

export const fetchLeaders = () => async (dispatch) => {
  dispatch(leadersLoading());

  try {
    const res = await axios.get(`${baseUrl}leaders`);
    dispatch(addLeaders(res.data));
  } catch (error) {
    dispatch(leadersFailed(error.message));
  }
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addFeedback = (feedback) => ({
  type: ActionTypes.POST_FEEDBACK,
  payload: feedback,
});

export const postFeedback = (body) => async (dispatch) => {
  const newFeeback = body;
  newFeeback.date = new Date().toISOString();

  try {
    const config = {
      headers: {
        ContentType: `application/json`,
        credentials: "same-origin",
      },
    };
    const res = await axios.post(`${baseUrl}feedback`, newFeeback, config);
    console.log(res);
    if (res.status === 201) {
      return dispatch(addFeedback(res.data));
    } else throw new Error(`Error ${res.status}: ${res.statusText}`);
  } catch (error) {
    alert(`Your feedback could not be posted\n Error: ${error.message}`);
  }
};
