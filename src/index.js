import React from 'react';
import moment from 'moment';
import { View, Text, Button, FlatList } from 'react-native';

import Quiz from './Quiz';
import { shuffleAnswers, unescapeText, formatDuration } from './utils';

const QUESTIONS_AMOUNT = 10;
const QUIZ_URL = `https://opentdb.com/api.php?amount=${QUESTIONS_AMOUNT}\
&category=24&difficulty=medium&type=multiple`;


/**
Main component of the application. Prepares list of questions for the app,
renders quiz component, tracks how much time was spent on quiz.
**/
export default class QuizContainer extends React.Component {
  state = {
    questions: [],

    score: null,
    loading: false,
    startTime: null,
    timeToComplete: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await fetch(QUIZ_URL);
    let { results } = await response.json();

    results = results.map(shuffleAnswers);
    results = results.map(unescapeText);

    this.setState({ loading: false, questions: results });
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
      questions,
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
          <Quiz
            questions={questions}
            onComplete={this._completeQuiz}
          />
        )}
        {isCompleted && !isStarted && (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>
              Thank you!
            </Text>
            <Text style={{ fontSize: 20, color: '#d5008f' }}>
              Your score: {score}
            </Text>
            <Text style={{ fontSize: 20 }}>
              Your time:&nbsp;
              {formatDuration(timeToComplete, 'mm:ss')}
            </Text>
          </View>
        )}
        {!isCompleted && !isStarted && (
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            Welcome to
            <Text style={{ color: '#d5008f' }}>
              &nbsp;Politics Medium 10
            </Text>
            &nbsp;quiz!
          </Text>
        )}
        {!isStarted && (
          <View style={{ alignItems: 'center' }}>
            <Button
              title={isCompleted ? "Play again" : "Start Quiz"}
              disabled={loading}
              onPress={this._startQuiz}
            />
          </View>
        )}
      </View>
    )
  }
}
