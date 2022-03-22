// notice that bond is defined in the global scope!
let bond = '007';

function oddJob() {
  let AgentinScope = bond === '007';
  let prediction = true;

  return AgentinScope === prediction;
}

function goldFinger(bond) {
  let AgentinScope = bond === '007';
  let prediction = false;

  return AgentinScope === prediction;
}

function scaramanga(target) {
  target = bond;

  let AgentinScope = bond === '007';
  let prediction = true;

  return AgentinScope === prediction;
}

function drNo() {
  let bond = 'Body Double';

  let AgentinScope = bond === '007';
  let prediction = false;

  return AgentinScope === prediction;
}

function jaws() {
  let agent = bond;
  bond = 'Body Double';

  let AgentinScope = agent === '007';
  let prediction = true;

  return AgentinScope === prediction;
}

function elChiffre() {
  let agent = bond;
  bond = 'Body Double';

  let AgentinScope = agent === '007';
  let prediction = false;

  return AgentinScope === prediction;
}
