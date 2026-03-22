/**
 * LDU Decomposition Visualizer
 * Frontend JavaScript for matrix input, API communication, and step visualization
 */

// Global state
let currentStepIndex = 0;
let decompositionData = null;
let autoPlayInterval = null;
let matrixSize = 3;

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const decomposeBtn = document.getElementById('decomposeBtn');
const matrixSizeInput = document.getElementById('matrixSize');
const matrixInputContainer = document.getElementById('matrixInputContainer');
const resultsSection = document.getElementById('resultsSection');
const errorMessage = document.getElementById('errorMessage');

// Step navigation elements
const prevStepBtn = document.getElementById('prevStepBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const autoPlayBtn = document.getElementById('autoPlayBtn');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    generateBtn.addEventListener('click', generateMatrixInput);
    decomposeBtn.addEventListener('click', performDecomposition);
    prevStepBtn.addEventListener('click', showPreviousStep);
    nextStepBtn.addEventListener('click', showNextStep);
    autoPlayBtn.addEventListener('click', toggleAutoPlay);
    
    // Generate initial matrix
    generateMatrixInput();
});

/**
 * Generate N×N matrix input grid
 */
function generateMatrixInput() {
    matrixSize = parseInt(matrixSizeInput.value) || 3;
    
    if (matrixSize < 2 || matrixSize > 10) {
        showError('Matrix size must be between 2 and 10');
        return;
    }
    
    // Clear previous inputs
    matrixInputContainer.innerHTML = '';
    
    // Create table for matrix input
    const table = document.createElement('table');
    table.className = 'matrix-input-table';
    
    for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrixSize; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.value = i === j ? '1' : '0'; // Default to identity-like matrix
            input.id = `matrix-${i}-${j}`;
            input.placeholder = `a${i+1}${j+1}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    matrixInputContainer.appendChild(table);
    decomposeBtn.classList.remove('hidden');
    hideError();
    
    // Hide results if any
    resultsSection.classList.add('hidden');
}

/**
 * Get matrix values from input fields
 */
function getMatrixFromInputs() {
    const matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        const row = [];
        for (let j = 0; j < matrixSize; j++) {
            const value = parseFloat(document.getElementById(`matrix-${i}-${j}`).value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

/**
 * Perform LDU decomposition via API
 */
async function performDecomposition() {
    const matrix = getMatrixFromInputs();
    
    // Show loading state
    decomposeBtn.disabled = true;
    decomposeBtn.textContent = 'Decomposing...';
    hideError();
    
    try {
        const response = await fetch('/decompose', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix: matrix })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Decomposition failed');
        }
        
        // Store decomposition data
        decompositionData = data;
        currentStepIndex = 0;
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        showError(`Error: ${error.message}`);
    } finally {
        decomposeBtn.disabled = false;
        decomposeBtn.textContent = 'Decompose Matrix';
    }
}

/**
 * Display final L, D, U matrices
 */
function displayResults(data) {
    resultsSection.classList.remove('hidden');
    
    // Display final matrices
    displayMatrix(data.L, 'LMatrix');
    displayMatrix(data.D, 'DMatrix');
    displayMatrix(data.U, 'UMatrix');
    
    // Initialize step visualization
    currentStepIndex = 0;
    updateStepVisualization();
    buildTimeline(data.steps);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Display a matrix in a container
 */
function displayMatrix(matrix, containerId, highlightRow = null, highlightCol = null, pivotRow = null, pivotCol = null) {
    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            const value = matrix[i][j];
            cell.textContent = value === 0 ? '0' : value.toFixed(4);
            
            // Highlight pivot
            if (pivotRow !== null && pivotCol !== null && i === pivotRow - 1 && j === pivotCol - 1) {
                cell.classList.add('pivot');
            }
            // Highlight row/column being modified
            else if (highlightRow !== null && i === highlightRow - 1) {
                cell.classList.add('highlight');
            } else if (highlightCol !== null && j === highlightCol - 1) {
                cell.classList.add('highlight');
            }
            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    container.innerHTML = '';
    container.appendChild(table);
}

/**
 * Update step visualization
 */
function updateStepVisualization() {
    if (!decompositionData || !decompositionData.steps || decompositionData.steps.length === 0) {
        return;
    }
    
    const step = decompositionData.steps[currentStepIndex];
    
    // Update step number and description
    document.getElementById('stepNumber').textContent = `Step ${step.k}`;
    document.getElementById('stepDescription').textContent = step.description;
    
    // Display step matrices
    displayMatrix(
        step.L, 
        'stepLMatrix',
        null, 
        null,
        step.pivot_row,
        step.pivot_col
    );
    displayMatrix(
        step.D, 
        'stepDMatrix',
        null,
        null,
        step.pivot_row,
        step.pivot_col
    );
    displayMatrix(
        step.U, 
        'stepUMatrix',
        step.pivot_row,
        null,
        step.pivot_row,
        step.pivot_col
    );
    
    // Update navigation buttons
    prevStepBtn.disabled = currentStepIndex === 0;
    nextStepBtn.disabled = currentStepIndex === decompositionData.steps.length - 1;
    
    // Update timeline
    updateTimelineHighlight();
}

/**
 * Show previous step
 */
function showPreviousStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateStepVisualization();
    }
}

/**
 * Show next step
 */
function showNextStep() {
    if (decompositionData && currentStepIndex < decompositionData.steps.length - 1) {
        currentStepIndex++;
        updateStepVisualization();
    }
}

/**
 * Toggle auto-play animation
 */
function toggleAutoPlay() {
    if (autoPlayInterval) {
        // Stop auto-play
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.textContent = '▶ Auto-Play';
        prevStepBtn.disabled = false;
        nextStepBtn.disabled = false;
    } else {
        // Start auto-play
        autoPlayBtn.textContent = '⏸ Pause';
        
        // If at the end, restart from beginning
        if (currentStepIndex >= decompositionData.steps.length - 1) {
            currentStepIndex = 0;
        }
        
        autoPlayInterval = setInterval(() => {
            if (currentStepIndex < decompositionData.steps.length - 1) {
                currentStepIndex++;
                updateStepVisualization();
            } else {
                // Reached the end
                toggleAutoPlay();
            }
        }, 2000); // 2 seconds per step
    }
}

/**
 * Build step timeline
 */
function buildTimeline(steps) {
    const timeline = document.getElementById('stepTimeline');
    timeline.innerHTML = '';
    
    steps.forEach((step, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        if (index === currentStepIndex) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <strong>Step ${step.k}</strong>: ${step.description}
        `;
        
        item.addEventListener('click', () => {
            // Stop auto-play if running
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                autoPlayBtn.textContent = '▶ Auto-Play';
                prevStepBtn.disabled = false;
                nextStepBtn.disabled = false;
            }
            currentStepIndex = index;
            updateStepVisualization();
        });
        
        timeline.appendChild(item);
    });
}

/**
 * Update timeline highlight
 */
function updateTimelineHighlight() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index === currentStepIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    errorMessage.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}
