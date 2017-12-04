export const keyBy = (arr, key) => {
    const obj = {};
    arr.forEach((item) => {
        obj[item[key]] = item;
    });
    return obj;
};


export const filter = (collection, predicate) => {
    const result = {};
    Object.entries(collection).forEach(([key, value]) => {
        if (predicate(value)) {
            result[key] = value;
        }
    });
    return result;
};
