import {
  ADD_DECK,
  ADD_QUESTION,
  DELETE_DECK,
  EDIT_DECK,
  REMOVE_QUESTION,
  EDIT_QUESTION,
} from "../actions/action";

export function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.did]: {
          id: action.did,
          title: action.title,
          questions: [],
        },
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.did]: {
          id: action.did,
          title: state[action.did].title,
          questions: [
            ...state[action.did].questions,
            {
              question: action.question,
              answer: action.answer,
            },
          ],
        },
      };

    case DELETE_DECK:
      const deckList = Object.keys(state)
        .map((deck) => state[deck])
        .filter((currentDeck) => currentDeck.id !== action.did);
      const newDeck = deckList.map((deck) => ({ [deck.id]: deck }));
      const filteredDeck = Object.assign({}, ...newDeck);
      return {
        ...filteredDeck,
      };

    case EDIT_DECK:
      if (action.title !== "") {
        return {
          ...state,
          [action.did]: {
            id: action.did,
            title: action.title,
            questions: state[action.did].questions,
          },
        };
      } else {
        return state;
      }

    case REMOVE_QUESTION:
      return {
        ...state,
        [action.did]: {
          id: action.did,
          title: state[action.did].title,
          questions: state[action.did].questions.filter(
            (question, id) => id !== action.qid
          ),
        },
      };

    case EDIT_QUESTION:
      const question =
        action.question === ""
          ? state[action.did].questions[action.qid].question
          : action.question;

      const answer =
        action.answer === ""
          ? state[action.did].questions[action.qid].answer
          : action.answer;

      const questions = state[action.did].questions.map((ques, id) => {
        if (id === action.qid) {
          return {
            question,
            answer,
          };
        } else {
          return ques;
        }
      });

      return {
        ...state,
        [action.did]: {
          id: action.did,
          title: state[action.did].title,
          questions,
        },
      };

    default:
      return state;
  }
}
