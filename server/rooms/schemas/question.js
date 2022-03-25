const schema = require('@colyseus/schema');
const Sequelize = require('sequelize');
const Schema = schema.Schema;
const command = require('@colyseus/command');
// const {
//   models: { Question },
// } = require('../../db');
const Question = require('../../db/models/Question');
const db = require('../../db');
//Schema
class QuestionSchema extends Schema {
  constructor() {
    super();
    this.id;
    this.difficulty = '';
    this.title = '';
    this.question = '';
    this.testSpecs = '';
    this.solution = ``;
  }
}
schema.defineTypes(QuestionSchema, {
  id: 'number',
  difficulty: 'string',
  title: 'string',
  question: 'string',
  testSpecs: 'string',
  solution: 'string',
});

async function getQuestions() {
  let questionList = await Question.findAll({
    // order: [['id', Sequelize.literal('RANDOM')]],
    order: [Sequelize.literal('RANDOM()')],
    limit: 3,
  });
  return questionList;
}
//Commands

class insertQuestion extends command.Command {
  execute({ roundNumber, questions }) {
    console.log(roundNumber);
    let currQuestion = questions[roundNumber - 1];
    let temp = new QuestionSchema();
    temp.id = currQuestion.id;
    temp.difficulty = currQuestion.difficulty;
    temp.title = currQuestion.title;
    temp.question = currQuestion.question;
    temp.testSpecs = currQuestion.testSpecs;
    this.state.question = temp;
  }
}
class AddQuestions extends command.Command {
  async execute() {
    // Get list of questions, Will need tweaking to randomize
    // const sequelize = new Sequelize(url, opts);
    let numQuestions = 3;

    let questionList = await Question.findAll({
      // order: [['id', Sequelize.literal('RANDOM')]],
      order: [Sequelize.literal('RANDOM()')],
      limit: 3,
    });
    // console.log(
    //   'questionList',
    //   questionList[0].id,
    //   questionList[1].id,
    //   questionList[2].id,
    //   questionList[3].id
    // );
    // Map through questions list and create new array of question instances(schemas)
    const mappedList = questionList.map((question) => {
      let temp = new QuestionSchema();
      temp.id = question.id;
      temp.difficulty = question.difficulty;
      temp.title = question.title;
      temp.question = question.question;
      temp.testSpecs = question.testSpecs;
      return temp;
    });
    // Set gamestate questions to newly created Array of Question instances(schemas)
    console.log('Question List', mappedList[0].title);
    console.log('Question List', mappedList[1].title);
    console.log('Question List', mappedList[2].title);
    // console.log('Question List', mappedList[3].title);

    // this.state.question = [...mappedList];
  }
}

module.exports = { QuestionSchema, AddQuestions, getQuestions, insertQuestion };
