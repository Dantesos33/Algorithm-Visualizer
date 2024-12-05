const arrayContainer = document.getElementById('arrayContainer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const generateArrayBtn = document.getElementById('generateArrayBtn');
const arrayInputsContainer = document.getElementById('arrayInputsContainer');

let array = [];
let target = 0;
let left = 0;
let right = -1;
let interval;

// Function to dynamically generate input fields for the array
function generateArrayInputs() {
    const numElements = parseInt(document.getElementById('numElements').value);

    if (isNaN(numElements) || numElements <= 0) {
        alert('Please enter a valid number of elements.');
        return;
    }

    arrayInputsContainer.innerHTML = ''; // Clear previous inputs

    // Generate input fields
    for (let i = 0; i < numElements; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('array-element-input');
        arrayInputsContainer.appendChild(input);
        input.style.marginBottom = '1rem';
    }

    // Set the right bound of the array
    right = numElements - 1;
}

// Function to get the array values from the input fields
function getArrayFromInputs() {
    const inputs = document.querySelectorAll('.array-element-input');
    array = Array.from(inputs).map(input => parseInt(input.value)).filter(value => !isNaN(value));
    if (array.length !== inputs.length) {
        alert('Please fill all the array input fields with valid numbers.');
        return false;
    }
    return true;
}

// Function to display the array elements
function displayArray() {
    arrayContainer.innerHTML = ''; // Clear the container

    // Show elements between left and right indices
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.textContent = value;

        // Highlight the left and right pointers
        if (i === left) {
            element.classList.add('highlight-left');
        }
        if (i === right) {
            element.classList.add('highlight-right');
        }

        arrayContainer.appendChild(element);
    }
}

// Function to execute one step of the two-pointer technique
function twoPointersStep() {
    if (left >= right) {
        alert('No valid pair found!');
        clearInterval(interval);
        return;
    }

    // Check if the sum of the two elements equals the target
    if (array[left] + array[right] === target) {
        alert(`Pair found: ${array[left]} + ${array[right]} = ${target}`);
        clearInterval(interval);
    } else if (array[left] + array[right] < target) {
        left++; // Move the left pointer to the right
    } else {
        right--; // Move the right pointer to the left
    }

    // Update the display after each step
    displayArray();
}

// Function to start the two-pointer animation
function startSearch() {
    if (!getArrayFromInputs()) return;

    target = parseInt(document.getElementById('target').value);
    if (isNaN(target)) {
        alert('Please enter a valid target.');
        return;
    }

    left = 0;
    right = array.length - 1;

    displayArray(); // Display the initial array
    interval = setInterval(twoPointersStep, 1500); // Slow down by increasing interval to 1.5 seconds
}

// Function to reset the array and the search state
function reset() {
    array = [];
    left = 0;
    right = -1;
    document.getElementById('numElements').value = '';
    document.getElementById('target').value = '';
    arrayInputsContainer.innerHTML = '';
    arrayContainer.innerHTML = '';
}

// Event listeners for the buttons
generateArrayBtn.addEventListener('click', generateArrayInputs);
startBtn.addEventListener('click', startSearch);
resetBtn.addEventListener('click', reset);
