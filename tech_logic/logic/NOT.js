// get input checkbox and output circle element
const input7Checkbox = document.getElementById('input-7-checkbox');
const outputCircle3 = document.getElementById('output3');
const input7Circle = document.getElementById('input-7');

// function to update the output circle based on input value
function updateOutput() {
  // get the input value
  const input7Value = input7Checkbox.checked;

  // simulate the logic gate
  const outputValue3 = !input7Value;

  // set the output circle color based on the output value
  if (outputValue3) {
    outputCircle3.classList.add('active');
  } else {
    outputCircle3.classList.remove('active');
  }

  // set the input circle color based on the input value
  if (input7Value) {
    input7Circle.classList.add('active');
  } else {
    input7Circle.classList.remove('active');
  }

  // update the output text
  const outputText3 = document.getElementById('output-text3');
  outputText3.textContent = 'The output NOT logic gate is currently: ' + (outputValue3 ? 'true' : 'false');
}
// document.getElementById('output-text3').style.fontSize = "medium";
// add event listener to simulate button
// const simulateButton3 = document.getElementById('simulate-button3');
// simulateButton3.addEventListener('click', updateOutput);

// add event listener to input checkbox to update the output on change
input7Checkbox.addEventListener('change', updateOutput);
