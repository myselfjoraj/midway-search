import time
import sys
from search_algorithm import search


def measure_complexity(element, array):
    start_time = time.perf_counter()  # Start time

    initial_memory = sys.getsizeof(array)  # Memory usage before execution

    result, operations = search(element, array)  # Run the algorithm

    end_time = time.perf_counter()  # End time
    final_memory = sys.getsizeof(array)  # Memory usage after execution

    time_taken = (end_time - start_time) * 1000  # Convert to milliseconds
    memory_used = final_memory - initial_memory  # Compute memory usage
    

    print(f"Execution Time: {time_taken:.4f} ms")
    print(f"Memory Used: {memory_used} bytes")
    print(f"Actual O(N) Operations: {operations}")

    return result,operations,time_taken,memory_used