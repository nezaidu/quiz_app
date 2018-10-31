import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList } from 'react-native';

/**
 * Child component which receives list of questions, allows
 * to advance through them pressing on the one of answers.
 * When all of the questions were answered onComplete is fired
 * with number of right answers.
 */
export default class Quiz extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
  };

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
            fontSize: 16
          }}
        >
          Question {questionInd + 1} out of {questions.length}
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
