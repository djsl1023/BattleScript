function testSpecs(specs) {
  return (
    `
  mocha.setup('bdd');
let expect = chai.expect;
let assert = chai.assert;
after(function(){
  let failResults = document.getElementsByClassName('test fail')
  if(failResults.length > 0){
    // for testing on local host
    window.parent.postMessage('false')
    // for deployment
    //window.parent.postMessage('false', "battlescript.onrender.com/")
  }
  else{
    // for testing on local host
    window.parent.postMessage('true')
  }
});` +
    specs +
    `mocha.run();`
  );
}

export default testSpecs;
