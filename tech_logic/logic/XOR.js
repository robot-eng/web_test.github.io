const input5Checkbox = document.getElementById('input-5-checkbox');
const input6Checkbox = document.getElementById('input-6-checkbox');
const outputCircle2 = document.getElementById('output2');
const input5Circle = document.getElementById('input-5');
const input6Circle = document.getElementById('input-6');

function updateOutput() {
  const input5Value = input5Checkbox.checked;
  const input6Value = input6Checkbox.checked;

  const outputValue2 = (input5Value ^ input6Value);

  if (outputValue2) {
    outputCircle2.classList.add('active');
  } else {
    outputCircle2.classList.remove('active');
  }

  if (input5Value) {
    input5Circle.classList.add('active');
    input5Circle.classList.add('input-5');
  } else {
    input5Circle.classList.remove('active');
    input5Circle.classList.remove('input-6');
  }
  if (input6Value) {
    input6Circle.classList.add('active');
    input6Circle.classList.add('input-5');
  } else {
    input6Circle.classList.remove('active');
    input6Circle.classList.remove('input-6');
  }
  const outputText2 = document.getElementById('output-text2');
  outputText2.textContent = 'The output XOR logic gate is currently: ' + (outputValue2 ? 'true' : 'false');
}
// document.getElementById('output-text2').style.fontSize = "medium";
// const simulateButton2 = document.getElementById('simulate-button2');
// simulateButton2.addEventListener('click', updateOutput);

input5Checkbox.addEventListener('change', updateOutput);
input6Checkbox.addEventListener('change', updateOutput);