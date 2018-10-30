import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { View, Text, Button, FlatList } from 'react-native';


export default class Quiz extends React.Component {
  state = {
    questionInd: 0,
    score: 0,
  };

  _answerPicked = (isCorrect) => {
    const { questions } = this.props;
    const { questionInd, score, quizes } = this.state;

    const newScore = isCorrect ? score + 1 : score;
    const newQuestionInd = questionInd + 1;

    if (newQuestionInd == questions.length) {
      this.props.onComplete(newScore);
      return;
    };

    this.setState({
      questionInd: newQuestionInd,
      score: newScore
    });
  }

  render() {
    const { questions } = this.props;
    const { questionInd } = this.state;

    const question = questions[questionInd];

    return (
      <View
        style={{
          alignItems: 'center',
          margin: 5,
          padding: 5,
          backgroundColor: '#cdecff'
        }}
      >
        <Text
          style={{
            fontSize: 20
          }}
        >
          {questionInd + 1}/{questions.length}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 18 }}>{question.question}</Text>
        <View>
          {question.answers.map(({ correct, answer }, answerInd) => (
            <Button
              title={`${answerInd + 1}) ${answer}`}
              key={`ans:${questionInd}:${answerInd}`}
              onPress={() => this._answerPicked(correct)}
            >
              {answerInd + 1}) {answer}
            </Button>
          ))}
        </View>
      </View>
    );

  }
}
