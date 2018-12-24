function binSearch(arr, data) {
    const len = arr.length;
    let min = 0;
    let max = len;
    let mid = Math.floor(max / 2);
    while(arr[mid] !== data) {
        if(arr[mid] < data) {
            min = mid+1;
        } else {
            max = mid-1;
        }
        mid = Math.floor((max-min) / 2) + min;
    }
    return mid;
}
let arr = [0,1,2,3,4,5,6,7,8,9,10,11];
arr.forEach((item) => {
    console.log(binSearch(arr, item));
});
