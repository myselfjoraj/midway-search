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