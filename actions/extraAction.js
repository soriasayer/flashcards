import {
  CURRENT_CARD,
  RESTART_QUIZ,
  QUESTION_RERSULT,
  CLEAR_RERSULT,
  VISIBLE_MODAL,
  SCREEN_TITLE,
  EDIT_MODE,
  ON_EDIT,
  ON_ADD,
} from "./action";

export const currentCard = () => {
  return {
    type: CURRENT_CARD,
  };
};

export const restartQuestion = () => {
  return {
    type: RESTART_QUIZ,
  };
};

export const showResult = (question, isTtrue, answer) => {
  return {
    type: QUESTION_RERSULT,
    question,
    isTtrue,
    answer,
  };
};

export const cleanResult = () => {
  return {
    type: CLEAR_RERSULT,
  };
};

export const visibleModal = (isVisible) => {
  return {
    type: VISIBLE_MODAL,
    isVisible,
  };
};

export const quizModal = (editable) => {
  return {
    type: EDIT_MODE,
    editable,
  };
};

export const setScreenTitle = (title) => {
  return {
    type: SCREEN_TITLE,
    title,
  };
};

export const onEdit = (edit) => {
  return {
    type: ON_EDIT,
    edit,
  };
};

export const onAdd = (add) => {
  return {
    type: ON_ADD,
    add,
  };
};
