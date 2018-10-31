import _ from 'lodash';


export const shuffleAnswers = ({ correct_answer, incorrect_answers, ...question }) => {
  let answers = incorrect_answers.map(a => ({
    correct: false,
    answer: a,
  }));

  return {
    ...question,
    answers: _.shuffle([{ correct: true, answer: correct_answer }, ...answers]),
  }
};

export const unescapeText = (question) => {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  };

  return {
    ...question,
    question: question.question.replace(/&amp\;|&lt\;|&gt\;|&quot\;|&#039\;/g, m => map[m])
  }
}
