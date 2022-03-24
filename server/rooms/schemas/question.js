const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const command = require('@colyseus/command');

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

//Commands
class AddQuestions extends command.Command {
  execute({ clientId, username }) {
    //Get list of questions, Will need tweaking to randomize
    // const questionList = await Question.findAll();
    //Map through questions list and create new array of question instances(schemas)
    // const mappedList = questionList.map((question) => {
    //   let temp = new QuestionSchema();
    //   temp.id = question.id;
    //   temp.difficulty = question.difficulty;
    //   temp.title = question.title;
    //   temp.question = question.question;
    //   temp.testSpecs = question.testSpecs;
    //   return temp;
    // });
    //Set gamestate questions to newly created Array of Question instances(schemas)
    // this.state.question = [...mappedList];
  }
}

module.exports = { QuestionSchema, AddQuestions };
