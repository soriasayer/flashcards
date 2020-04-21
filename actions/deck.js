import { generateUID } from "../utils/helpers";
import {
  ADD_DECK,
  ADD_QUESTION,
  DELETE_DECK,
  EDIT_DECK,
  REMOVE_QUESTION,
  EDIT_QUESTION,
} from "./action";

export const addDeckTitle = (title) => {
  return {
    type: ADD_DECK,
    did: generateUID(),
    title,
  };
};

export const removeDeck = (did) => {
  return {
    type: DELETE_DECK,
    did,
  };
};

export const addQuestion = (did, question, answer) => {
  return {
    type: ADD_QUESTION,
    did,
    question,
    answer,
  };
};

export const removeQuestion = (did, qid) => {
  return {
    type: REMOVE_QUESTION,
    did,
    qid,
  };
};

export const editDeck = (did, title) => {
  return {
    type: EDIT_DECK,
    did,
    title,
  };
};

export const editQustion = (did, qid, question, answer) => {
  return {
    type: EDIT_QUESTION,
    did,
    qid,
    question,
    answer,
  };
};
