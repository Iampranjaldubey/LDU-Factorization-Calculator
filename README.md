# 🧮 MathLab – LDU Decomposition Visualizer

An interactive, educational web application for performing **LDU (Lower-Diagonal-Upper) matrix decomposition** with step-by-step visualization.

Built as part of **MathLab**, a modern platform for exploring linear algebra concepts through interactive tools.

---

## 🚀 Live Workflow

```
Landing Page → Select Tool → LDU Calculator → Step-by-Step Visualization
```

---

## ✨ Features

### 🔹 Core Functionality

* **Manual LDU Decomposition**

  * Fully implemented algorithm (no built-in decomposition functions)
* **Step-by-Step Visualization**

  * Observe each transformation in the matrix
* **Interactive Timeline**

  * Navigate using Previous / Next controls
* **Auto-Play Mode**

  * Animate the decomposition process

---

### 🎨 User Experience

* Modern **glassmorphism UI**
* Smooth animations and transitions
* Responsive design (desktop + mobile)
* Interactive landing page with tool navigation

---

### 📐 Matrix Support

* Matrix sizes from **2×2 up to 10×10**
* Dynamic grid input system

---

## 🧠 What is LDU Decomposition?

LDU decomposition factors a square matrix **A** into:

```
A = L × D × U
```

Where:

* **L (Lower Triangular Matrix)**
  Contains elimination multipliers (diagonal = 1)

* **D (Diagonal Matrix)**
  Stores pivot values

* **U (Upper Triangular Matrix)**
  Normalized so diagonal elements are 1

---

## ⚙️ Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Backend     | Python, Flask                     |
| Frontend    | HTML5, CSS3, JavaScript (Vanilla) |
| Math Engine | NumPy (array handling only)       |
| UI Design   | Custom animations, glassmorphism  |

---

## 📁 Project Structure

```
project/
│
├── app.py
│
├── templates/
│   ├── landing/
│   │   └── index.html        # Landing page (entry point)
│   ├── calculator/
│       └── index.html        # LDU calculator UI
│
├── static/
│   ├── landing/
│   │   ├── style.css
│   │   └── script.js
│   ├── calculator/
│       ├── style.css
│       └── script.js
│
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites

* Python 3.7+
* pip

---

### 1️⃣ Install dependencies

```bash
pip install flask numpy
```

---

### 2️⃣ Run the application

```bash
python app.py
```

---

### 3️⃣ Open in browser

```
http://127.0.0.1:5000/
```

---

## 🧑‍💻 How to Use

1. Open the **landing page**
2. Click **"Open LDU Decomposition Tool"**
3. Select matrix size (2–10)
4. Enter matrix values
5. Click **Decompose**
6. Explore steps:

   * Previous / Next buttons
   * Auto-play animation
   * Timeline navigation

---

## ⚙️ Algorithm Overview

The implementation follows a **manual decomposition pipeline**:

1. **Forward Elimination**

   * Convert matrix into upper triangular form

2. **Store Multipliers**

   * Save elimination factors in **L**

3. **Extract Diagonal**

   * Store pivot elements in **D**

4. **Normalize U**

   * Scale rows so diagonal becomes 1

---

## ⚠️ Limitations

* No pivoting (fails on zero pivots)
* Matrix size limited to 10×10 for performance
* Numerical stability not optimized

---

## 🔮 Future Enhancements

* ✅ Partial / full pivoting support
* 📊 Gaussian elimination visualization
* 📄 Export step-by-step results as PDF
* 🧾 LaTeX rendering for equations
* ⚡ Performance optimization for larger matrices
* 🌐 Full deployment with public access

---

## 🎯 Key Highlights (Resume Points)

* Designed and implemented **custom LDU decomposition algorithm**
* Built a **full-stack Flask application** with structured routing
* Developed **interactive step visualization system**
* Created a **modern UI with animation-driven UX**
* Applied **linear algebra concepts to real-world visualization**

---

## 📜 License

Open-source project for educational and demonstration purposes.

---

## 👨‍💻 Author

**Pranjal Dubey**
B.Tech Computer Science
Sitare University

---

💡 *This project is part of a broader vision to build an interactive mathematics learning platform (MathLab).*
