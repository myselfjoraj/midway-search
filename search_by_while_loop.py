def search(element, a, n):
    mid = n // 2
    step = 1
    while True:

        forward = mid + step
        backward = mid - step

        if forward == n:
            break

        if backward == -1:
            break

        if a[backward] == element:
            return backward

        if a[forward] == element:
            return forward

        step = step + 1

    return -2


n = int(input("Enter the size of array : "))
a = []
for i in range(n):
    b = int(input("Enter the element : "))
    a.append(b)

element = int(input("Enter the element to be searched : "))

print("Input array is : ", a)

print(f"Element found at :", search(element, a, n))