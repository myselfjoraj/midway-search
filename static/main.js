document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitButton').addEventListener('click', function () {

        const inputValue = document.getElementById('itemsInput').value;
        const searchValue = document.getElementById('itemSearch').value;
        const items = inputValue.split(',').map(item => item.trim());

        const table = document.getElementById('resultTable');
        table.innerHTML = ''; // Clear previous table content

        let currentRow = document.createElement('tr'); // Create the first row
        table.appendChild(currentRow);

        for (let i = 0; i < items.length; i++) {
            const newTd = document.createElement('td');
            newTd.textContent = items[i];
            currentRow.appendChild(newTd);

            // After every 10 items, start a new row
            if ((i + 1) % 10 === 0 && i !== items.length - 1) {
                currentRow = document.createElement('tr');
                table.appendChild(currentRow);
            }
        }
        document.getElementById('resultTable').removeAttribute('hidden');

        // Animate highlighting from the middle outwards
        const cells = document.querySelectorAll('#resultTable td');
        if (cells.length === 0) return;

        let mid = Math.floor((cells.length - 1) / 2); // Find middle index
        let left = mid, right = mid; // Start expanding from middle


        function showStep(stepId, delay) {
            setTimeout(() => {
                document.getElementById(stepId).classList.add("show");
            }, delay);
        }


        function highlightNext(data) {
            // Remove previous highlights
            if (left >= 0) cells[left].classList.remove('found-element');
            if (right < cells.length) cells[right].classList.remove('found-element');

            left--;  // Move left
            right++; // Move right

            if (left >= 0) cells[left].classList.add('found-element');
            if (right < cells.length) cells[right].classList.add('found-element');

            if (left >= 0 || right < cells.length) {
                setTimeout(highlightNext, 500); // Delay for next step
            } else {
                setTimeout(() => {
                    // Clear the last highlights
                    if (left + 1 < cells.length) cells[left + 1].classList.remove('found-element');
                    if (right - 1 >= 0) cells[right - 1].classList.remove('found-element');
                }, 500);
            }
        }



        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: items, searchValue: searchValue })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById('indexResults').removeAttribute('hidden');
                const indexPositions = data.indexes.join(', ');
                const operations = data.operations;
                console.log("operations ------>> " + operations);
                if (indexPositions.length == 1) {
                    document.getElementById('indexResults').innerText = 'Element found at index position: ' + indexPositions;
                } else if (indexPositions.length > 0) {
                    document.getElementById('indexResults').innerText = 'Element found at index positions: ' + indexPositions;
                } else {
                    document.getElementById('indexResults').innerText = 'Element not found!';
                }

                const cells = document.querySelectorAll('#resultTable td');

                setTimeout(() => {
                    cells.forEach((cell, index) => {
                        if (data.indexes.includes(index)) {
                            cell.classList.add('found-element');
                        }
                    });
                }, ((operations / 2) * 500));







                // Show steps one by one with delays
                showStep("step1", 1000);  // Show Step 1 after 1 second

                setTimeout(() => {
                    cells[mid].classList.add('mid-element');
                }, 1500);

                setTimeout(() => {
                    cells[mid].classList.remove('mid-element');
                }, 2000);



                showStep("step2", 3000);  // Show Step 2 after 3 seconds
                setTimeout(highlightNext(data), 3500);

                showStep("step3", 5000);  // Show Step 3 after 5 seconds


                showStep("result", 7000); // Show Result after 7 seconds


                showStep("complexity", 9000); // Show Complexity after 9 seconds



            })
            .catch(error => {
                console.error('Error-found-in-request:', error);
            });
    });
});