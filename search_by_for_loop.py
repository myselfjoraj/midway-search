def search(element, array):
    size = len(array)
    mid = size // 2

    for i in range(size):

        f_ward = mid + i
        b_ward = mid - i

        if f_ward < size and array[f_ward] == element:
            return f_ward

        elif b_ward > -1 and array[b_ward] == element:
            return b_ward

    return -2


n = int(input("Enter the size of array : "))
a = []
for i in range(n):
    b = int(input("Enter the element : "))
    a.append(b)

element = int(input("Enter the element to be searched : "))

print("Input array is : ", a)

print(f"Element found at :", search(element, a))
