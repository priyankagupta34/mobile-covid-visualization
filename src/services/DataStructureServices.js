export const DataStructureServices = {
    search,
    mergeSort
}

function search(completearray, chosenField, word) {
    const searchList = completearray.map(d => d[chosenField]);
    const resultList = [];
    for (let i = 0; i < searchList.length - 1; i++) {
        if (resultList.length <5 && (searchList[i].toLowerCase().search(word.toLowerCase()) === 0 || 
        searchList[i].toLowerCase()[(searchList[i].toLowerCase().search(word.toLowerCase()) - 1)] === ' ')) {
            resultList.push(completearray[i]);
        }
    }
    console.log('resultList', resultList);
    return resultList;
}


function mergeSort(arr, type) {
    let len = arr.length;
    if (len < 2)
        return arr;
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left, type), mergeSort(right, type), type);
}

function merge(left, right, type) {
    let result = [],
        lLen = left.length,
        rLen = right.length,
        l = 0,
        r = 0;
    while (l < lLen && r < rLen) {
        if (left[l][type] < right[r][type]) {
            result.push(left[l++]);
        }
        else {
            result.push(right[r++]);
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}
