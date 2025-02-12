def search(element, array):
    size = len(array)
    mid = size // 2
    index = []

    operations = 0
    if array[mid] == element:
        index.append(mid)

    for i in range(1, size):

        f_ward = mid + i
        b_ward = mid - i
        operations += 2 

        if b_ward > -1 and array[b_ward] == element:
            index.append(b_ward)

        if f_ward < size and array[f_ward] == element:
            index.append(f_ward)

    return index, operations
