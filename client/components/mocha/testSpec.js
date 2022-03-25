function testSpecs(specs) {
  return (
    `
  mocha.setup('bdd');
let expect = chai.expect;
let assert = chai.assert;
after(function(){
  let failResults = document.getElementsByClassName('test fail')
  if(failResults.length > 0){
    //will be heroku link later
    parent.postMessage('false', "http://localhost:8080")
  }
  else{
    //will be heroku link later
    parent.postMessage('true', "http://localhost:8080")
  }
});` +
    specs +
    `mocha.checkLeaks();
mocha.run();`
  );
}

export default testSpecs;
