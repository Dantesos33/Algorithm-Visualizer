const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArrayBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const arrayInputsContainer = document.getElementById('arrayInputsContainer');

let array = [];
let steps = [];
let stepIndex = 0;
let interval;

// Function to dynamically generate input fields for the array
function generateArrayInputs() {
    const numElements = parseInt(document.getElementById('numElements').value);

    if (isNaN(numElements) || numElements <= 0) {
        alert('Please enter a valid number of elements.');
        return;
    }

    arrayInputsContainer.innerHTML = ''; // Clear previous inputs

    // Generate input fields for the array
    for (let i = 0; i < numElements; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('array-element-input');
        arrayInputsContainer.appendChild(input);
        input.style.marginBottom = '1rem';
    }
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

    // Display the entire array
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.textContent = value;

        // Highlight the current part of the array being worked on (based on steps)
        if (steps[stepIndex]?.highlight && steps[stepIndex].highlight.includes(index)) {
            element.classList.add(steps[stepIndex].highlightClass);
        }

        arrayContainer.appendChild(element);
    });
}

// Merge Sort function that records the steps
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Record the split step for visualization
    steps.push({ array: [...arr], highlight: [], highlightClass: 'highlight-split' });

    // Recursively sort left and right
    return merge(mergeSort(left), mergeSort(right));
}

// Merge function that merges two sorted arrays
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge step-by-step, recording each merge step
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // If any elements remain in either array, add them
    result = result.concat(left.slice(leftIndex), right.slice(rightIndex));

    // Record the merge step for visualization
    steps.push({ array: result, highlight: [], highlightClass: 'highlight-merge' });

    return result;
}

// Function to start the Merge Sort and animate the process
function startMergeSort() {
    if (!getArrayFromInputs()) return;

    // Prepare the steps array
    steps = [];
    stepIndex = 0;

    // Clone the array and start the merge sort
    let clonedArray = [...array];

    // Start the merge sort, and record the steps
    mergeSort(clonedArray);

    // Visualize the merge sort steps with animation
    interval = setInterval(() => {
        if (stepIndex >= steps.length) {
            clearInterval(interval);
            return;
        }

        // Set the array state to the current step's array
        array = steps[stepIndex].array;

        // Highlight the array elements based on the current step
        displayArray();

        // Increment to move to the next step
        stepIndex++;
    }, 1000); // Delay each step for 1 second
}

// Function to reset the array and the state
function reset() {
    array = [];
    document.getElementById('numElements').value = '';
    arrayInputsContainer.innerHTML = '';
    arrayContainer.innerHTML = '';
}

// Event listeners for the buttons
generateArrayBtn.addEventListener('click', generateArrayInputs);
startBtn.addEventListener('click', startMergeSort);
resetBtn.addEventListener('click', reset);
