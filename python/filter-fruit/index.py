def filter_fruits(fruits: list[str]) -> list[str]:
    types = []

    for fruit in fruits:
        [type, price] = fruit.split(" ")
        if int(price) > 15:
            types.append(type)

    return types


def simple_filter_fruits(fruits: list[str]) -> list[str]:
    return list(
        map(
            lambda x: x.split(" ")[0],
            filter(
                lambda x: int(x.split(" ")[1]) > 15,
                fruits,
            ),
        )
    )


def advance_filter_fruits(fruits: list[str]) -> list[str]:
    types = []

    for fruit in fruits:
        [type, price] = fruit.split(" ")
        if int(price) > 15:
            types.append({"type": type, "price": int(price)})

    return types


print(
    simple_filter_fruits(
        ["apple 10", "banana 3", "grape 15", "orange 5", "cherry 30", "blueberry 25"]
    )
)
