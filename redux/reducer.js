import {
  LOGIN,
  LOADING,
  LOGIN_ERR,
  SET_TODO,
  SET_TODO_ERR,
  GET_TODOS,
  GET_TODOS_ERR,
  GET_TODOS_REQ,
  SET_TODO_REQ,
  GET_TASK_REQ,
  GET_TASK,
  GET_TASK_ERR,
  GET_DONE_REQ,
  GET_DONE,
  GET_DONE_ERR,
  GET_DONE_SCREEN_REQ,
  GET_DONE_SCREEN,
  GET_DONE_SCREEN_ERR,
  NO_DONE_REQ,
  NO_DONE,
  NO_DONE_ERR,
  NODONE_REQ,
  NODONE,
  NODONE_ERR,
} from "./action";

export const getTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TODOS_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case GET_TODOS_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};
export const getTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TASK_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_TASK:
      return {
        ...state,
        todo: action.payload,
        loading: false,
      };
    case GET_TASK_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};
export const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TODO_REQ:
      return {
        ...state,
        loading: true,
      };
    case SET_TODO:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case SET_TODO_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DONE_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_DONE:
      return {
        ...state,
        done: action.payload,
        loading: false,
      };
    case GET_DONE_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getDoneScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DONE_SCREEN_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_DONE_SCREEN:
      return {
        ...state,
        done: action.payload,
        loading: false,
      };
    case GET_DONE_SCREEN_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};
export const noDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case NO_DONE_REQ:
      return {
        ...state,
        loading: true,
      };
    case NO_DONE:
      return {
        ...state,
        nodone: action.payload,
        loading: false,
      };
    case NO_DONE_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getNodoneReducer = (state = {}, action) => {
  switch (action.type) {
    case NODONE_REQ:
      return {
        ...state,
        loading: true,
      };
    case NODONE:
      return {
        ...state,
        nodone: action.payload,
        loading: false,
      };
    case NODONE_ERR: {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    }
    default:
      return state;
  }
};
