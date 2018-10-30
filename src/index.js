import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { View, Text, Button, FlatList } from 'react-native';

import Quiz from './Quiz';

const QUESTIONS_AMOUNT = 3;
const QUIZ_URL = `https://opentdb.com/api.php?amount=${QUESTIONS_AMOUNT}\
&category=24&difficulty=medium&type=multiple`;

const shuffleAnswers = ({ correct_answer, incorrect_answers, ...question }) => {
  let answers = incorrect_answers.map(a => ({
    correct: false,
    answer: a,
  }));

  return {
    ...question,
    answers: _.shuffle([{ correct: true, answer: correct_answer }, ...answers]),
  }
};


export default class QuizContainer extends React.Component {
  state = {
    startTime: null,
    score: null,
    timeToComplete: null,

    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await fetch(QUIZ_URL);
    let { results } = await response.json();

    results = results.map(shuffleAnswers);

    this.setState({ loading: false, quizes: results });
  }

  _startQuiz = () => {
    this.setState({ startTime: moment() });
  }

  _completeQuiz = (score) => {
    this.setState({
      score,
      startTime: null,
      timeToComplete: moment.duration(moment().diff(this.state.startTime)),
    });
  };

  render() {
    const {
      score,
      quizes,
      loading,
      startTime,
      timeToComplete,
    } = this.state;

    const isStarted = !!startTime;
    const isCompleted = !!timeToComplete;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f6fffe',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
        }}
      >
        {isStarted && (
          <Quiz questions={quizes} onComplete={this._completeQuiz} />
        )}
        {isCompleted && !isStarted && (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Thank you!</Text>
            <Text style={{ fontSize: 20, color: '#d5008f' }}>
              Your score: {score}
            </Text>
            <Text style={{ fontSize: 20 }}>
              Your time:
              {moment.utc(timeToComplete.asMilliseconds()).format('mm:ss')}
            </Text>
          </View>
        )}
        {!isCompleted && !isStarted && (
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            Would you like to take a "Politics Medium 10" quiz?
          </Text>
        )}
        {!isStarted && (
          <View style={{ alignItems: 'center' }}>
            <Button
              title={isCompleted ? "Repeat" : "Start Quiz"}
              disabled={loading}
              onPress={this._startQuiz}
            />
          </View>
        )}
      </View>
    )
  }
}
