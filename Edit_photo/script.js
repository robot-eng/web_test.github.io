const imageUpload = document.getElementById('image-upload');
const brightnessSlider = document.getElementById('brightness-slider');
const sharpnessSlider = document.getElementById('sharpness-slider');
const redSlider = document.getElementById('red-slider');
const greenSlider = document.getElementById('green-slider');
const blueSlider = document.getElementById('blue-slider');
const resetButton = document.getElementById('reset-button');
const imageContainer = document.getElementById('image-container');
let currentImage = null;
imageUpload.addEventListener('change', handleImageUpload);
brightnessSlider.addEventListener('input', updateSliderValue);
sharpnessSlider.addEventListener('input', updateSliderValue);
redSlider.addEventListener('input', updateSliderValue);
greenSlider.addEventListener('input', updateSliderValue);
blueSlider.addEventListener('input', updateSliderValue);
resetButton.addEventListener('click', resetSliders);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Uploaded Image';
        img.classList.add('uploaded-image');
        if (currentImage) {
            imageContainer.removeChild(currentImage);
        }
        imageContainer.appendChild(img);
        currentImage = img;
        updateImage();
    }
    reader.readAsDataURL(file);
}

function updateSliderValue() {
    const brightnessValue = document.getElementById('brightness-value');
    const sharpnessValue = document.getElementById('sharpness-value');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');

    brightnessValue.textContent = brightnessSlider.value;
    sharpnessValue.textContent = sharpnessSlider.value;
    redValue.textContent = redSlider.value;
    greenValue.textContent = greenSlider.value;
    blueValue.textContent = blueSlider.value;

    updateImage();
}

function updateImage() {
    if (!currentImage) {
        return;
    }

    const brightnessValue = parseInt(brightnessSlider.value);
    const sharpnessValue = parseInt(sharpnessSlider.value);
    const redValue = parseInt(redSlider.value);
    const greenValue = parseInt(greenSlider.value);
    const blueValue = parseInt(blueSlider.value);

    const brightnessPercentage = brightnessValue > 0 ? brightnessValue + 100 : 100 / (1 - brightnessValue / 100);
    const contrastPercentage = sharpnessValue > 0 ? sharpnessValue + 100 : 100 / (1 - sharpnessValue / 100);
    const redPercentage = redValue > 0 ? redValue + 100 : 100 / (1 - redValue / 100);;
    const greenPercentage = greenValue > 0 ? greenValue + 100 : 100 / (1 - greenValue / 100);;
    const bluePercentage = blueValue > 0 ? blueValue + 100 : 100 / (1 - blueValue / 100);;

    currentImage.style.filter = `brightness(${brightnessPercentage}%) contrast(${contrastPercentage}%)`;
    currentImage.style.filter += `saturate(${redPercentage}%)`;
    currentImage.style.filter += `saturate(${greenPercentage}%)`;
    currentImage.style.filter += `saturate(${bluePercentage}%)`;
}

function resetSliders() {
    brightnessSlider.value = 0;
    sharpnessSlider.value = 0;
    redSlider.value = 0;
    greenSlider.value = 0;
    blueSlider.value = 0;
}