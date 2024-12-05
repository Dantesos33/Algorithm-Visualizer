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

        // Highlight the pivot, current element, and sorted elements
        if (steps[stepIndex]?.highlight && steps[stepIndex].highlight.includes(index)) {
            element.classList.add(steps[stepIndex].highlightClass);
        }

        arrayContainer.appendChild(element);
    });
}

// Quick Sort function that records the steps
function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);

        // Record the step for pivot highlighting
        steps.push({ array: [...arr], highlight: [pi], highlightClass: 'highlight-pivot' });

        // Recursively sort the left and right subarrays
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Partition function that places the pivot at the correct position
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    // Move elements smaller than pivot to the left
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }

    // Place the pivot element at the correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Record the array state after the partition
    steps.push({ array: [...arr], highlight: [i + 1], highlightClass: 'highlight-partition' });

    return i + 1;
}

// Function to start the Quick Sort and animate the process
function startQuickSort() {
    if (!getArrayFromInputs()) return;

    // Prepare the steps array
    steps = [];
    stepIndex = 0;

    // Clone the array and start the quick sort
    let clonedArray = [...array];

    // Start the quick sort, and record the steps
    quickSort(clonedArray, 0, clonedArray.length - 1);

    // Visualize the quick sort steps with animation
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
startBtn.addEventListener('click', startQuickSort);
resetBtn.addEventListener('click', reset);
