"""
LDU Decomposition Web Application
Flask backend with manual LDU decomposition algorithm
"""

from flask import Flask, render_template, request, jsonify
import numpy as np
import copy

app = Flask(__name__, static_folder='static', template_folder='templates')

def ldu_decomposition(A):
    """
    Perform LDU decomposition manually (without pivoting)
    
    A = L * D * U where:
    - L: lower triangular matrix with 1s on diagonal
    - D: diagonal matrix (pivot values)
    - U: upper triangular matrix with 1s on diagonal
    
    Returns: (L, D, U, steps)
    """
    n = len(A)
    
    # Initialize matrices
    # L: starts as identity, stores multipliers below diagonal
    L = [[1.0 if i == j else 0.0 for j in range(n)] for i in range(n)]
    
    # U: copy of A, will become upper triangular with 1s on diagonal
    U = copy.deepcopy(A)
    
    # D: will store pivot values
    D = [[0.0 for _ in range(n)] for _ in range(n)]
    
    # Steps for visualization
    steps = []
    step_num = 0
    
    # Forward elimination to get U (upper triangular)
    # and build L (multipliers) simultaneously
    for k in range(n):
        # Check for zero pivot
        if abs(U[k][k]) < 1e-10:
            raise ValueError(f"Zero pivot encountered at position ({k+1}, {k+1}). LDU decomposition not possible without pivoting.")
        
        # Store pivot in D
        pivot_value = U[k][k]
        D[k][k] = pivot_value
        
        # Description for this step
        if k == 0:
            description = f"Step {k+1}: Starting with pivot a₁₁ = {pivot_value:.4f}"
        else:
            description = f"Step {k+1}: Eliminating below diagonal at row {k+1}, pivot a₍{k+1}₎₍{k+1}₎ = {pivot_value:.4f}"
        
        # Eliminate entries below pivot in column k
        for i in range(k + 1, n):
            # Calculate multiplier
            multiplier = U[i][k] / U[k][k]
            
            # Store multiplier in L (below diagonal)
            L[i][k] = multiplier
            
            # Eliminate: subtract multiplier * row k from row i
            for j in range(k, n):
                U[i][j] -= multiplier * U[k][j]
        
        # Snapshot current state
        step_num += 1
        steps.append({
            "k": k + 1,
            "description": description,
            "pivot_row": k + 1,
            "pivot_col": k + 1,
            "pivot_value": pivot_value,
            "L": copy.deepcopy(L),
            "D": copy.deepcopy(D),
            "U": copy.deepcopy(U)
        })
    
    # Now normalize U to have 1s on diagonal (extract diagonal to D)
    # D already has the pivots, now divide each row of U by its diagonal element
    for k in range(n):
        if abs(D[k][k]) < 1e-10:
            raise ValueError("Zero diagonal element in D. Cannot normalize U.")
        
        # Divide row k of U by diagonal element to get 1 on diagonal
        pivot = D[k][k]
        for j in range(k, n):
            U[k][j] /= pivot
    
    # Final step showing normalized U
    step_num += 1
    steps.append({
        "k": n + 1,
        "description": f"Final: Normalized U to have 1s on diagonal",
        "pivot_row": None,
        "pivot_col": None,
        "pivot_value": None,
        "L": copy.deepcopy(L),
        "D": copy.deepcopy(D),
        "U": copy.deepcopy(U)
    })
    
    return L, D, U, steps

@app.route('/')
def landing():
    return render_template('landing/index.html')

@app.route('/ldu')
def ldu():
    return render_template('ldu-calculator/index.html')


@app.route('/decompose', methods=['POST'])
def decompose():
    """
    API endpoint for LDU decomposition
    Expects JSON: {"matrix": [[...], [...], ...]}
    Returns JSON: {"L": [...], "D": [...], "U": [...], "steps": [...]}
    """
    try:
        data = request.get_json()
        
        if not data or 'matrix' not in data:
            return jsonify({"error": "Matrix data not provided"}), 400
        
        matrix = data['matrix']
        n = len(matrix)
        
        # Validate matrix
        if n < 2 or n > 10:
            return jsonify({"error": "Matrix size must be between 2 and 10"}), 400
        
        if any(len(row) != n for row in matrix):
            return jsonify({"error": "Matrix must be square"}), 400
        
        # Convert to float
        matrix = [[float(matrix[i][j]) for j in range(n)] for i in range(n)]
        
        # Perform LDU decomposition
        L, D, U, steps = ldu_decomposition(matrix)
        
        # Round values for cleaner output
        def round_matrix(M):
            return [[round(M[i][j], 6) for j in range(n)] for i in range(n)]
        
        L = round_matrix(L)
        D = round_matrix(D)
        U = round_matrix(U)
        
        # Round step matrices too
        for step in steps:
            step["L"] = round_matrix(step["L"])
            step["D"] = round_matrix(step["D"])
            step["U"] = round_matrix(step["U"])
            if step["pivot_value"] is not None:
                step["pivot_value"] = round(step["pivot_value"], 6)
        
        return jsonify({
            "L": L,
            "D": D,
            "U": U,
            "steps": steps
        })
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
