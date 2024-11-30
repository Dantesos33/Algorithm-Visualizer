const arrayContainer = document.getElementById('arrayContainer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const generateArrayBtn = document.getElementById('generateArrayBtn');
const arrayInputsContainer = document.getElementById('arrayInputsContainer');
const leftLabel = document.getElementById('leftLabel');
const rightLabel = document.getElementById('rightLabel');

let array = [];
let target = 0;
let left = 0;
let right = -1;
let mid = -1;
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
        // input.placeholder = `${i + 1}`;
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

    // Show only elements between left and right indices
    for (let i = left; i <= right; i++) {
        const value = array[i];
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.textContent = value;

        // Highlight the left, right, and mid pointers
        if (i === left) {
            element.classList.add('highlight-left');
        }
        if (i === right) {
            element.classList.add('highlight-right');
        }
        if (i === mid) {
            element.classList.add('highlight-mid');
        }
        if (value === target && i === mid) {
            element.classList.add('highlight-target');
        }

        arrayContainer.appendChild(element);
    }
}

// Function to execute one step of binary search
function binarySearchStep() {
    if (left > right) {
        alert('Target not found in the array!');
        clearInterval(interval);
        return;
    }

    mid = Math.floor((left + right) / 2);

    // Check if mid is the target
    if (array[mid] === target) {
        alert(`Target ${target} found at index ${mid}`);
        clearInterval(interval);
    } else if (array[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }

    // Update the display after each step
    displayArray();
}

// Function to start the binary search animation
function startSearch() {
    if (!getArrayFromInputs()) return;

    target = parseInt(document.getElementById('target').value);
    if (isNaN(target)) {
        alert('Please enter a valid target.');
        return;
    }

    left = 0;
    right = array.length - 1;
    mid = -1;

    displayArray(); // Display the initial array
    interval = setInterval(binarySearchStep, 1500); // Slow down by increasing interval to 1.5 seconds
}

// Function to reset the array and the search state
function reset() {
    array = [];
    left = 0;
    right = -1;
    mid = -1;
    document.getElementById('numElements').value = '';
    document.getElementById('target').value = '';
    arrayInputsContainer.innerHTML = '';
    arrayContainer.innerHTML = '';
}

// Event listeners for the buttons
generateArrayBtn.addEventListener('click', generateArrayInputs);
startBtn.addEventListener('click', startSearch);
resetBtn.addEventListener('click', reset);
