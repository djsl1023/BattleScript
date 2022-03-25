const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Question = db.define(
  'question',
  {
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    testSpecs: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

module.exports = Question;

Question.prototype.loadNewQuestions = async function (type = 'all') {
  let prevQuestions = [];
  let newQuestions = [];
  let numQuestions = 3;

  // function getRandomInt(min, max) {
  //   return Math.random() * (max - min) + min;
  // }
  let questionList;
  const sequelize = new Sequelize();
  switch (type) {
    // case 'easy':
    //   const sequelize = new Sequelize();
    //   questionList = await Question.findAll({
    //     where: { category: 'easy' },
    //     order: sequelize.random(),
    //     limit: numQuestions,
    //   });
    //   break;
    // case 'medium':
    //   questionList = await Question.findAll({
    //     where: { category: 'medium' },
    //   });
    //   break;
    // case 'hard':
    //   questionList = await Question.findAll({ where: { category: 'hard' } });
    //   break;
    default:
      questionList = await Question.findAll({
        order: sequelize.random(),
        limit: numQuestions,
      });
  }

  // while (newQuestions.length < 3) {
  //   if (prevQuestions.length > 0) {
  //     const randomInt = getRandomInt(0, questionList.length - 1);
  //     if (
  //       !prevQuestions.includes(questionList[randomInt].id) &&
  //       !newQuestions.includes(questionList[randomInt].id)
  //     ) {
  //       newQuestions.push(questionList[randomInt].id);
  //     } else {
  //       continue;
  //     }
  //   }
  // }
  return questionList;
};
