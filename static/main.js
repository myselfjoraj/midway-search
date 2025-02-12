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

        function hideStep(stepId) {
            document.getElementById(stepId).classList.remove("show");
        }


        function highlightNext(data1) {
            // Remove previous highlights
            if (left >= 0) cells[left].classList.remove('found-element');
            if (right < cells.length) cells[right].classList.remove('found-element');

            left--;  // Move left
            right++; // Move right

            if (left >= 0) cells[left].classList.add('found-element');
            if (right < cells.length) cells[right].classList.add('found-element');

            if (left >= 0 || right < cells.length) {
                setTimeout(() => highlightNext(data1), 500);// Delay for next step
            } else {
                setTimeout(() => {
                    // Clear the last highlights
                    if (left + 1 < cells.length && cells[left + 1]) cells[left + 1].classList.remove('found-element');
                    if (right - 1 >= 0 && cells[right - 1] ) cells[right - 1].classList.remove('found-element');
                    
                    console.log("op--->>",data1);

                    cells.forEach((cell, index) => {
                        if (data1.indexes.includes(index)) {
                            cell.classList.add('found-element');
                        }
                    });

                    setTimeout(() => {
                        document.getElementById("step3").classList.add("show");
                        setTimeout(() => {
                            document.getElementById("result").classList.add("show");
                            showStep("complexity", 500);
                        }, 500);
                    }, 500);

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
                hideStep("step1");
                hideStep("step2");
                hideStep("step3");
                hideStep("result");
                hideStep("complexity");
                mid_ele = Math.floor(items.length/2);
                addContents((items[mid_ele]),items[mid_ele-1],items[mid_ele+1],data.indexes,searchValue,data.time,data.space,data.operations);
                //document.getElementById('indexResults').removeAttribute('');
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

                // setTimeout(() => {
                //     cells.forEach((cell, index) => {
                //         if (data.indexes.includes(index)) {
                //             cell.classList.add('found-element');
                //         }
                //     });
                // }, ((operations / 2) * 500));

                startAnimation(data);



                /*
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
                */



            })
            .catch(error => {
                console.error('Error-found-in-request:', error);
            });


            function startAnimation(data){

                setTimeout(() => {
                    document.getElementById("step1").classList.add("show");
                    setTimeout(() => {
                        cells[mid].classList.add('mid-element');
                    }, 1500);
    
                    setTimeout(() => {
                        cells[mid].classList.remove('mid-element');

                        setTimeout(() => {
                            document.getElementById("step2").classList.add("show");
                            setTimeout(()=>highlightNext(data), 1000);
                        }, 1500);
                    }, 2000);
                }, 1000);
            }

            function addContents(mid_element,left_element,right_element,indexes,given_element,tc,memory,operations){
                document.getElementById("mid-element-td").innerText = "" + mid_element;
                document.getElementById("left-element-td").innerText = "" + left_element;
                document.getElementById("right-element-td").innerText = "" + right_element;
                document.getElementById("step3-text").innerText = "Store the index(es) found in a list ["+ indexes +"] and return";
                document.getElementById("given-element").innerText = "" + given_element;
                document.getElementById("step4-text").innerText = given_element+" is found at index(es) " + indexes + "";
                document.getElementById("execution-text").innerText = "Execution Time : "+ tc +" ms";
                document.getElementById("memory-text").innerText = "Memory Used : "+ memory +" bytes";
                document.getElementById("time-comp-text").innerText = "Time Complexity(O(N)) : "+ operations;
            }
    });
});