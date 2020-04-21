import { Ionicons } from "@expo/vector-icons";
import React, { Component, Fragment } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { editDeck } from "../actions/deck";
import {
  restartQuestion,
  setScreenTitle,
  visibleModal,
} from "../actions/extraAction";
import { gray, lightGray, teal, white } from "../utils/colors";

class FlashCards extends Component {
  state = { newTitle: "" };

  handleOnPress = () => {
    const { dispatch, editedTitle } = this.props;
    const { newTitle } = this.state;

    dispatch(visibleModal(false));
    dispatch(editDeck(editedTitle, newTitle));

    this.setState({ newTitle: "" });
  };

  _renderModalContent = () => {
    const { textInput, dispatch } = this.props;
    return (
      <KeyboardAvoidingView style={styles.modalContent} behavior="padding">
        <TextInput
          autoFocus={true}
          maxLength={20}
          underlineColorAndroid="transparent"
          defaultValue={textInput}
          onChangeText={(text) => this.setState({ newTitle: text })}
          style={styles.input}
        />
        <View style={{ marginBottom: 10 }}>
          <TouchableHighlight
            style={styles.submitBtn}
            onPress={this.handleOnPress}
            underlayColor={teal}
          >
            <Text style={{ fontWeight: "700", fontSize: 18, color: white }}>
              Save
            </Text>
          </TouchableHighlight>
          <Button onPress={() => dispatch(visibleModal(false))} title="Close" />
        </View>
      </KeyboardAvoidingView>
    );
  };

  renderCard = () => {
    if (this.props.questions.length > 1) {
      return "Cards";
    } else if (this.props.questions.length === 0) {
      return "No cards";
    } else {
      return "Card";
    }
  };

  render() {
    const {
      id,
      title,
      questions,
      navigation,
      visible,
      dispatch,
      decks,
    } = this.props;
    return (
      <Fragment>
        <Modal
          onSwipeComplete={() => dispatch(visibleModal(false))}
          swipeDirection="left"
          isVisible={visible}
          backdropOpacity={0.3}
        >
          {this._renderModalContent()}
        </Modal>
        <TouchableHighlight
          style={[styles.container, { flex: 1 }]}
          onPress={() => {
            dispatch(setScreenTitle(title));
            dispatch(restartQuestion());
            questions.length === 0
              ? navigation.navigate("QuestionList", { deck: id })
              : navigation.navigate("Question", {
                  deck: decks[id] ? decks[id].id : null,
                });
          }}
        >
          <View style={styles.deckContainer}>
            <View style={styles.folderContainer}>
              <Ionicons
                name={Platform.OS === "ios" ? "ios-folder" : "md-folder"}
                size={60}
                style={{ color: teal }}
              />
            </View>
            <View style={{ alignSelf: "flex-start" }}>
              <Text style={styles.deckTitle}>{title}</Text>
              <Text style={styles.cards}>{`${
                questions.length
              } ${this.renderCard()}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    paddingTop: 10,
  },
  deckContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: white,
    width: wp("95%"),
    height: 90,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  folderContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 85,
  },
  deckTitle: {
    fontWeight: "bold",
    color: teal,
    fontSize: 18,
    marginBottom: 5,
  },
  cards: {
    fontWeight: "bold",
    color: lightGray,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    width: wp("85%"),
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: teal,
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    marginTop: Platform.OS === "android" ? 20 : 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: hp("35%"),
  },
  input: {
    width: wp("85%"),
    height: 50,
    backgroundColor: "#FAFAFA",
    borderBottomColor: teal,
    borderBottomWidth: 2,
    fontSize: 20,
    padding: 10,
    margin: 20,
    color: gray,
  },
});

function mapStateToProps({ visible, decks }) {
  return {
    decks,
    visible,
  };
}

export default connect(mapStateToProps)(FlashCards);
