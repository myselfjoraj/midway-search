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
