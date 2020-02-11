function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

export default function createDecks(deckTitle, questionText, answerText) {
    return {
        [deckTitle]:{
            title: deckTitle,
            questions : [
                {
                    questionId: generateUID(),
                    question: questions,
                    answer: answerText,
                }
            ]
        }
    }
}

