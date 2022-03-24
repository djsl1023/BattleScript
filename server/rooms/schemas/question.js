const schema = require('@colyseus/schema');
const Schema = schema.Schema;

class QuestionSchema extends Schema {
  constructor() {
    super();
    this.id;
    this.difficulty = '';
    this.title = '';
    this.question = '';
    this.testSpecs = '';
  }
}
schema.defineTypes(QuestionSchema, {
  id: 'number',
  difficulty: 'string',
  title: 'string',
  question: 'string',
  testSpecs: 'string',
});

module.exports = QuestionSchema;
