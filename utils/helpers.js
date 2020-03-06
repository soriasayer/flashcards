import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const NOTIFICATION_KEY = 'flashcards:notifications'

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return{
    title: 'Log your status!',
    body: "👋 don't forget to log your status for today!",
    ios: {
      sound: true,
      _displayInForeground: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelScheduledNotificationAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.setDate() +1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'minute',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const textArray = () => {
  return [
      {
        info: 'Swipe here for more instructions.',
      },
      {
        step: 'Step 1', 
        text: 'On your computer go to sheets.google.com',
      },
      {
        step: 'Step 2', 
        text: 'Create a new sheet.',
      },
      {
        step: 'Step 3', 
        text: "Rename Sheets to the title that you'd like to give for deck.",
      },
      {
        step: 'Step 4', 
        text: 'On column A write Questions and on B write Answers.',
      },
      {
        step: 'Step 5', 
        text: 'After finishing the list, copy the google sheet URL from the browser address bar.',
      },
      {
        step: 'Step 6', 
        text: 'Send the URL to your phone for example via Facebook Messenger.',
      },
      {
        step: 'Step 7', 
        text: 'Paste the URL into the following text box.',
      },
      {
        step: 'Step 8', 
        text: 'Click on the following button.',
      },
      {
        step: 'Step 9', 
        text: 'If the import is successful, you can find all your flash cards in the app.',
      },
      {
        step: 'Note!',
        text: "Each sheet is considered as a Deck and each row in that sheet is considered as a flashcard. Hence you can import multiple decks in one import. You can import only 10 sheets at the same time."
      },
  ]
}