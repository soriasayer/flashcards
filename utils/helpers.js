import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const textArray = [
  {
    info: "Swipe here for more instructions.",
  },
  {
    step: "Step 1",
    text: "On your computer go to sheets.google.com",
  },
  {
    step: "Step 2",
    text: "Create a new google sheet.",
  },
  {
    step: "Step 3",
    text:
      "Rename Sheets to the title that you'd like to give to the specific deck.",
  },
  {
    step: "Step 4",
    text: "On column A write Questions and on B write Answers.",
  },
  {
    step: "Step 5",
    text:
      'After finishing the questions and answers, click on "File" on menu bar.',
  },
  {
    step: "Step 6",
    text: 'On file menu click on "Publish to the web" option.',
  },
  {
    step: "Step 7",
    text:
      'In the open window click on "Start Publishing" button then "Ok" and close the window.',
  },
  {
    step: "Step 8",
    text: "Finally, copy the google sheet URL from the browser address bar.",
  },
  {
    step: "Step 9",
    text: "Send the URL to your phone for example via Facebook Messenger.",
  },
  {
    step: "Step 10",
    text: "Paste the URL into the following text box.",
  },
  {
    step: "Step 11",
    text: "Click on the following button.",
  },
  {
    step: "Step 12",
    text:
      "If the import is successful, you can find all your flash cards in the app.",
  },
  {
    step: "Note!",
    text:
      "Each sheet is considered as a Deck and each row in that sheet is considered as a flashcard. Hence you can import multiple decks in one import. You can import only 10 sheets at the same time.",
  },
];
