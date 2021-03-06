import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlipCard from "react-native-flip-card";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { currentCard, showResult } from "../actions/extraAction";
import { gray, red, teal, white, yellow } from "../utils/colors";

const { height } = Dimensions.get("window");

class Question extends Component {
  state = { flipCard: false };
  pressCheck = () => {
    const { dispatch, currentQuestion } = this.props;
    const question = currentQuestion && currentQuestion.question;
    const answer = currentQuestion && currentQuestion.answer;

    dispatch(currentCard());
    dispatch(showResult(question, true, answer));
  };
  pressClose = () => {
    const { dispatch, currentQuestion } = this.props;
    const question = currentQuestion && currentQuestion.question;
    const answer = currentQuestion && currentQuestion.answer;

    dispatch(currentCard());
    dispatch(showResult(question, false, answer));
  };

  render() {
    const {
      questions,
      currentQuestion,
      counter,
      navigation,
      deck,
    } = this.props;

    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={{ fontSize: 24, marginBottom: 8 }}>{`${counter + 1}/${
          questions.length
        }`}</Text>
        <FlipCard
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          alignHeight={true}
          style={{ height: hp("100%") }}
        >
          <View style={[styles.face, { flex: 1 }]}>
            <Text style={styles.text}>
              {`${
                currentQuestion && currentQuestion.question.length >= 360
                  ? currentQuestion &&
                    currentQuestion.question.substring(0, 360) + "..."
                  : currentQuestion && currentQuestion.question
              }`}
            </Text>
          </View>
          <View style={[styles.back, { flex: 1 }]}>
            <Text style={[styles.text, { color: white }]}>
              {`${
                currentQuestion && currentQuestion.answer.length >= 360
                  ? currentQuestion &&
                    currentQuestion.answer.substring(0, 360) + "..."
                  : currentQuestion && currentQuestion.answer
              }`}
            </Text>
          </View>
        </FlipCard>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: red }]}
            onPress={
              counter === questions.length
                ? navigation.navigate("Result")
                : this.pressClose
            }
          >
            <MaterialCommunityIcons
              name="close"
              size={30}
              style={{ color: white }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: teal }]}
            onPress={
              counter === questions.length
                ? navigation.navigate("Result", { deck })
                : this.pressCheck
            }
          >
            <MaterialCommunityIcons
              name="check"
              size={30}
              style={{ color: white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  face: {
    backgroundColor: yellow,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    width: wp("80%"),
    padding: 15,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  back: {
    backgroundColor: teal,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    width: wp("80%"),
    padding: 15,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  text: {
    color: gray,
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: wp("50%"),
    height: 110,
    marginBottom: 8,
  },
  addBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});

function mapStateToProps({ decks, counter }, { route }) {
  const { deck } = route.params;

  return {
    questions: decks[deck].questions,
    currentQuestion: decks[deck].questions[counter],
    counter,
  };
}

export default connect(mapStateToProps)(Question);
