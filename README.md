# LDU Decomposition Visualizer

An interactive, educational web application that performs LDU (Lower-Diagonal-Upper) matrix decomposition with step-by-step visualization.

## Features

- **Manual LDU Decomposition**: Performs LDU decomposition algorithm manually (no NumPy built-in functions)
- **Step-by-Step Visualization**: See each step of the decomposition process
- **Interactive Timeline**: Navigate through steps with Previous/Next buttons
- **Auto-Play Animation**: Automatically cycle through steps
- **Modern UI**: Clean, responsive design with smooth animations
- **Matrix Size**: Support for 2×2 to 10×10 matrices

## What is LDU Decomposition?

LDU decomposition factors a square matrix **A** into three matrices:

**A = L × D × U**

Where:
- **L**: Lower triangular matrix with 1s on the diagonal (stores multipliers)
- **D**: Diagonal matrix (contains pivot values)
- **U**: Upper triangular matrix with 1s on the diagonal (normalized upper triangular)

## Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Setup Steps

1. **Install dependencies**:
   ```bash
   pip install flask numpy
   ```

2. **Run the application**:
   ```bash
   cd ldu_app
   python app.py
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5000`

## Project Structure

```
ldu_app/
├── app.py                 # Flask backend with LDU decomposition algorithm
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── style.css         # Modern CSS styling
│   └── script.js         # Frontend JavaScript logic
└── README.md             # This file
```

## How to Use

1. **Enter Matrix Size**: Select the size of your matrix (N×N, where N is between 2 and 10)

2. **Generate Matrix**: Click "Generate Matrix" to create an N×N input grid

3. **Enter Values**: Fill in the matrix values (default is an identity-like matrix)

4. **Decompose**: Click "Decompose Matrix" to perform LDU decomposition

5. **Explore Steps**: 
   - Use "Previous" and "Next" buttons to navigate through steps
   - Click "Auto-Play" to automatically cycle through steps
   - Click on any step in the timeline to jump to that step

## Algorithm Details

The LDU decomposition is performed without pivoting:

1. **Forward Elimination**: Eliminate entries below the diagonal to create an upper triangular matrix
2. **Store Multipliers**: Save elimination multipliers in the L matrix
3. **Extract Diagonals**: Store pivot values in the D matrix
4. **Normalize U**: Divide rows of U by their diagonal elements to get 1s on the diagonal

### Limitations

- **No Pivoting**: The algorithm doesn't handle zero pivots. If a zero pivot is encountered, an error will be shown.
- **Matrix Size**: Limited to 2×2 through 10×10 matrices for optimal performance and visualization.

## Example

For a 3×3 matrix:

```
A = [[4, 3, 2],
     [2, 1, 1],
     [1, 2, 1]]
```

The decomposition produces:
- **L**: Lower triangular matrix with multipliers
- **D**: Diagonal matrix with pivot values
- **U**: Upper triangular matrix normalized to have 1s on diagonal

## Technologies Used

- **Backend**: Python, Flask, NumPy (for array storage only)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
- **Deployment**: Can be run locally or deployed to platforms like Render, Railway, or Heroku

## License

This project is open source and available for educational purposes.

## Future Enhancements

- LaTeX math rendering for better mathematical notation
- Gaussian elimination animation
- Export PDF step reports
- Pivoting support for better numerical stability
- Larger matrix support with performance optimizations
