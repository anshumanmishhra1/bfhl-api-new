const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(express.json());

const full_name = "anshuman_29072025";
const email = "anshuman1312.be22@chitkara.edu.com.in";
const roll_number = "ABCD123";

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function alternatingCapsReverse(str) {
  let result = '';
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let char = str[i];
    result += toggle ? char.toUpperCase() : char.toLowerCase();
    toggle = !toggle;
  }
  return result;
}

router.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let letterConcat = "";

    data.forEach(el => {
      if (isNumber(el)) {
        let num = parseInt(el);
        if (num % 2 === 0) even_numbers.push(el);
        else odd_numbers.push(el);
        sum += num;
      } else if (isAlphabet(el)) {
        alphabets.push(el.toUpperCase());
        letterConcat += el;
      } else {
        special_characters.push(el);
      }
    });

    res.status(200).json({
      is_success: true,
      user_id: full_name,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(letterConcat)
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong"
    });
  }
});

app.use('/api', router);

module.exports = app;
module.exports.handler = serverless(app);
