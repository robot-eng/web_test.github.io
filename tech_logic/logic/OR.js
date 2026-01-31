// get input checkboxes and output circle element
const input3Checkbox = document.getElementById('input-3-checkbox');
const input4Checkbox = document.getElementById('input-4-checkbox');
const outputCircle1 = document.getElementById('output1');
const input3Circle = document.getElementById('input-3');
const input4Circle = document.getElementById('input-4');

// function to update the output circle based on input values
function updateOutput() {
  // get the input values
  const input3Value = input3Checkbox.checked;
  const input4Value = input4Checkbox.checked;

  // simulate the logic gate
  const outputValue1 = (input3Value || input4Value);

  // set the output circle color based on the output value
  if (outputValue1) {
    outputCircle1.classList.add('active');
  } else {
    outputCircle1.classList.remove('active');
  }

  // set the input circles' colors based on their respective values
  if (input3Value) {
    input3Circle.classList.add('active');
    input3Circle.classList.add('input-3');
    input4Circle.classList.remove('input-4');
  } else {
    input3Circle.classList.remove('active');
    input3Circle.classList.remove('input-3');
  }

  if (input4Value) {
    input4Circle.classList.add('active');
    input4Circle.classList.add('input-4');
    input3Circle.classList.remove('input-3');
  } else {
    input4Circle.classList.remove('active');
    input4Circle.classList.remove('input-4');
  }

  // update the output text
  const outputText1 = document.getElementById('output-text1');
  outputText1.textContent = 'The output OR logic gate is currently: ' + (outputValue1 ? 'true' : 'false');
}
// document.getElementById('output-text1').style.fontSize = "medium";
// add event listener to simulate button
// const simulateButton1 = document.getElementById('simulate-button1');
// simulateButton1.addEventListener('click', updateOutput);

// add event listener to input checkboxes to update the output on change
input3Checkbox.addEventListener('change', updateOutput);
input4Checkbox.addEventListener('change', updateOutput);
