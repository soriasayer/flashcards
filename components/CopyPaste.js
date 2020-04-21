import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  YellowBox,
} from "react-native";
import { teal, gray, lightGray, white } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { addDeckTitle, addQuestion } from "../actions/deck";
import Carousel from "react-native-snap-carousel";
import { textArray } from "../utils/helpers";

class CopyPaste extends Component {
  state = {
    inputText: "",
  };

  handleOnPress = () => {
    const { dispatch, navigation } = this.props;
    const { inputText } = this.state;

    try {
      const resourceUrl = inputText;
      const spreadsheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(
        resourceUrl
      )[1];
      const sheetId = new RegExp("[#&]gid=([0-9]+)").exec(resourceUrl)[1];

      for (let step = 1; step < 11; step++) {
        const fetchParam = `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/${step}/public/full?alt=json`;

        fetch(fetchParam)
          .then((data) => data.json())
          .then((json) => {
            let deckTitle = addDeckTitle(json.feed.title["$t"]);
            let deckId = deckTitle.did;
            dispatch(deckTitle);
            let questions = [];
            let answers = [];
            json.feed.entry.map((entry, index) => {
              if (index % 2 === 0) {
                questions.push(entry.content["$t"]);
              } else {
                answers.push(entry.content["$t"]);
              }
            });
            questions.forEach((question, index) => {
              dispatch(addQuestion(deckId, question, answers[index]));
            });
          });
      }

      navigation.navigate("Decks");
      this.setState({ inputText: "" });
      console.disableYellowBox = true;
    } catch (e) {
      Alert.alert(
        "Error!",
        "Import was not successull! Please paste the URL here or send an email to soriasayer@gmail.com for solving this problem.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => this.setState({ inputText: "" }) },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const data = textArray;

    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>
          Please read the following instructions carefully.
        </Text>
        <Carousel
          enableSnap={true}
          layout={"tinder"}
          slideStyle={{ alignSelf: "center" }}
          ref={(c) => {
            this._carousel = c;
          }}
          data={data}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.carouselContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {item.info}
              </Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {item.step}
              </Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
          sliderWidth={305}
          itemWidth={305}
        />
        <KeyboardAvoidingView
          style={{ justifyContent: "center", alignItems: "center" }}
          behavior="padding"
        >
          <TextInput
            style={styles.input}
            value={this.state.inputText}
            placeholder="Paste URL"
            onChangeText={(text) => {
              this.setState({ inputText: text });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleOnPress}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: white }}>
              Import
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: white,
    fontSize: 18,
    padding: 5,
  },
  carouselContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: teal,
    borderRadius: 3,
    height: wp("70%"),
    shadowRadius: 5,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: gray,
    textAlign: "center",
    width: 300,
    height: 60,
  },
  input: {
    width: wp("85%"),
    height: 50,
    backgroundColor: "#FAFAFA",
    borderBottomColor: teal,
    borderBottomWidth: 2,
    fontSize: 18,
    padding: 8,
    margin: 10,
  },
  button: {
    width: wp("85%"),
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal,
    borderRadius: 5,
    margin: 30,
  },
});

export default connect()(CopyPaste);
