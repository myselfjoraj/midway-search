# Midway Searching Algorithm

Welcome to the **Midway Searching Algorithm** project! This is a custom algorithm that performs a bidirectional search on a sorted array by first identifying the middle element, then searching both left and right from the middle element to find matching elements.

## Overview

The **Midway Searching Algorithm** is an efficient algorithm that starts searching from the middle of the array and simultaneously explores both left and right directions. This approach leverages the idea that the middle element divides the array into two halves, allowing us to search both sides of the array concurrently.

### Key Features
- **Bidirectional Search**: The search begins from the middle of the array and proceeds in both left and right directions.
- **Efficient Search**: By leveraging the sorted property of the array, we reduce unnecessary search iterations compared to traditional linear searches.
- **Simple and Elegant**: The algorithm is easy to implement and has a clear, logical structure.

---

## How It Works

1. **Find the Middle Element**: 
   - The algorithm first calculates the middle index of the array using the formula:  
     `middle_index = len(array) // 2`.
   - The middle element divides the array into two halves: left and right.

2. **Search Left and Right from Middle**: 
   - Starting from the middle element, the search proceeds left and right simultaneously, checking elements on both sides.
   - The search continues until the element is found or the array bounds are reached.

This algorithm is useful when you're dealing with large sorted arrays and want to reduce the amount of iteration compared to a standard linear search.

---

## Installation

Follow the instructions below to set up and run the Midway Searching algorithm on your local machine.

### Prerequisites
- **Python 3.x**
- **Flask** (For building the web interface)

### Steps to Install and Run:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/myselfjoraj/midway-search.git
   cd midway-search
   ```

2. **Create a Virtual Environment:**
   It's highly recommended to use a virtual environment to manage dependencies.
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**
   Install the required Python packages, including Flask:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask App:**
   Start the Flask web server by running:
   ```bash
   python app.py
   ```
   The app will be available at `http://localhost:5000/`.

---

## How to Use the Application

1. **Navigate to the Web Interface**:
   - Open your browser and go to `http://localhost:5000/`.

2. **Input Data**:
   - In the provided input box, enter a list of elements separated by commas (e.g., `1, 2, 3, 4, 5, 6`).
   
3. **Submit Data**:
   - Click the "Submit" button to send the array to the server.

4. **View Results**:
   - The application will display the original array in a table.
   - It will also highlight the found elements in green (using the `found-element` class) and display the indexes of the found elements below the table.

---

## Algorithm Description

### Midway Searching Algorithm (Conceptual Steps):
1. **Identify Middle Element**:  
   Calculate the middle index of the array and find the element at that index.
   
2. **Search in Both Directions**:  
   - From the middle, the algorithm checks the left and right elements for the target value.
   - Continue this bidirectional search to find matches efficiently.
   
3. **Stop at the Bounds**:  
   If the array bounds are reached or the target element is found, the search halts.

### Time Complexity:
- **Best Case**: O(1) when the middle element is the target.
- **Worst Case**: O(n) where `n` is the length of the array, if the target is located at the ends.

### Use Cases:
- **Search in Any Arrays**: Works best in any arrays, may it be number or alphabets.
- **Optimization**: Reduces the need for linear searches by using the array's structure.

---

## Example Usage

Let's say you have the following input array:  
`[2, 4, 6, 8, 10, 12, 14]`.

When you search for `10`, the algorithm will:
1. Start at the middle element (8).
2. Search in both directions (left and right) to find the element `10`.

The output will display the indexes of the found elements.

---

## Project Structure

```plaintext
midway-search/
├── app.py                       # Flask application to handle requests
├── Midway-Search-Algorithm.txt  # Algorithm explanation
├── search_algorithm.py          # Algorithm for searching bi-directionally
├── search_by_for_loop.py        # Algorithm for searching bi-directionally using simple for loop
├── search_by_while_loop.py      # Algorithm for searching bi-directionally using simple for loop
├── requirements.txt             # Python dependencies
├── templates/
│   └── index.html               # Frontend HTML file for user input and results display
│   └── style.css                # Frontend css file for designing
└── README.md                    # Project documentation
```


---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---