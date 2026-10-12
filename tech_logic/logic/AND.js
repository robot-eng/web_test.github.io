
// get input checkboxes and output circle element
const input1Checkbox = document.getElementById('input-1-checkbox');
const input2Checkbox = document.getElementById('input-2-checkbox');
const outputCircle = document.getElementById('output');
const input1Circle = document.getElementById('input-1');
const input2Circle = document.getElementById('input-2');
// function to update the output circle based on input values
function updateOutput() {
  // get the input values
  const input1Value = input1Checkbox.checked;
  const input2Value = input2Checkbox.checked;

  // simulate the logic gate
  const outputValue = (input1Value && input2Value);
  // set the output circle color based on the output value
  if (outputValue) {
    outputCircle.classList.add('active');
  } else {
    outputCircle.classList.remove('active');
  }

  // set the input 1
  // set the input 1 circle color based on the input 1 value
  if (input1Value) {
    input1Circle.classList.add('active');
    input1Circle.classList.add('input-1');
  } else {
    input1Circle.classList.remove('active');
    input1Circle.classList.remove('input-1');
  }
  if (input2Value) {
    input2Circle.classList.add('active');
    input2Circle.classList.add('input-2');
  } else {
    input2Circle.classList.remove('active');
    input2Circle.classList.remove('input-2');
  }
  const outputText = document.getElementById('output-text');
  outputText.textContent = 'The output AND logic gate is currently: ' + (outputValue ? 'true' : 'false');
}
// add event listener to simulate button
// const simulateButton = document.getElementById('simulate-button');
// simulateButton.addEventListener('click', updateOutput);
// document.getElementById('output-text').style.fontSize = "medium";
// add event listener to input checkboxes to update the output on change
input1Checkbox.addEventListener('change', updateOutput);
input2Checkbox.addEventListener('change', updateOutput);


