function CArray(num) {
    this.data = [];
    this.pos = 0;
    this.num = num;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap =swap;
    this.bubbleSort = bubbleSort;
    this.selectionSort = selectionSort;
    this.insertionSort = insertionSort;
    this.data = Array.from({length : this.num}, (v, i) =>i);
    this.qsort = qsort;
    this.gaps = [5,3,1];
    this.shellSort = shellSort;
    this.shellSort1 = shellSort1;
    this.printTime= printTime;
    this.mergeSort =mergeSort;
    function setData() {
        for(let i = this.num -1; i>=0; i--) {
            this.data[i] = Math.floor(Math.random() * this.num + 1);
        }
    }
    function clear() {
        this.data = Array.from({length : this.num}, (v, i) =>0);
    }
    function insert(data) {
        this.data[pos++] = data;
    }
    function toString() {
        let len = this.data.length;
        let str = '';
        for(let i = 1; i< len+1; i++) {
            str += this.data[i-1] + ' ';
            if(i>0 && i % 10 === 0)
                str += '\n';
        }
        return str;
    }
    function swap(arr, index1, index2) {
        arr[index1] = arr[index1] + arr[index2];
        arr[index2] = arr[index1] - arr[index2];
        arr[index1] = arr[index1] - arr[index2];
    }
    function bubbleSort() {
        let arr = this.data.concat();
        let len = arr.length;
        for(let i = 0; i<len; i++) {
            for(let j = 0; j<len-i; j++) {
                if(arr[j] > arr[j+1])
                    this.swap(arr, j, j+1);
            }
        }
        return arr;
    }
    function selectionSort() {
        let arr = this.data.concat();
        const len = arr.length;
        for(let i = len-1; i>0; i--) {
            let max = arr[i];
            for(let j = 0; j < i; j++) {
                if(arr[j] > max) {
                    max = arr[j];
                    this.swap(arr, j, i);
                }
            }
        }
        return arr;
    }
    function insertionSort() {
        let arr = this.data.concat();
        const len = arr.length;
        for(let i = 1; i<len; i++) {
            // for(let j = 0; j<i; j++) {
            //     if(arr[i] < arr[j]) {
            //         this.swap(arr, i, j);
            //     }
            // }
            let j = i;
            const temp = arr[i];
            while(j>0 && arr[j-1] > temp) {
                arr[j] = arr[j-1];
                j--;
            }
            arr[j] = temp;
        }
        return arr;
    }
    function qsort(arr) {
        const len = arr.length;
        if(len <= 1) {
            return arr;
        } else {
            const lesser = [];
            const greater = [];
            const pivot = arr[0];
            for(let i = 1; i<len; i++) {
                if(arr[i]>pivot)
                    greater.push(arr[i]);
                else
                    lesser.push(arr[i]);
            }
            return qsort(lesser).concat(pivot, qsort(greater));
        }
    }
    function shellSort() {
        const arr = this.data.concat();
        const len =arr.length;
        const gaps = this.gaps;
        for(let g = 0; g<gaps.length; g++) {
            const gap = gaps[g];
            for(let i = gap; i<len; i++) {
                let j = i;
                const temp = arr[i];
                while(j>0 && arr[j-gap] > temp) {
                    arr[j] = arr[j-gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
            // console.log(arr.join(','));
        }
        return arr;
    }
    function shellSort1() {
        const arr = this.data.concat();
        const len =arr.length;
        const gaps = this.gaps;
        let h = 1;
        while(h<len/3) {
            h=3*h + 1;
        }
        while(h>=1) {
            const gap = h;
            for(let i = gap; i<len; i++) {
                let j = i;
                const temp = arr[i];
                while(j>0 && arr[j-gap] > temp) {
                    arr[j] = arr[j-gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
            h = (h-1)/3;
            // console.log(arr.join(','));
        }
        return arr;
    }
    function mergeSort() {
        const arr = this.data.concat();
        const len =arr.length;
        let step = 1;
        let left,right;
        while(step<len){
            left = 0;
            right = step;
            while(right+step<=len) {
                mergeArrays(arr, left, left + step, right, right + step);
                left = right + step;
                right = left + step;
            }
            if(right<arr.length)
                mergeArrays(arr, left, left + step, right, len);
            step *= 2;
        }
        return arr;
    }
    function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight){
        let rLen = stopRight - startRight + 1;
        let lLen = stopLeft - startLeft + 1;
        let rightArr = new Array(rLen);
        let leftArr = new Array(lLen);
        let k = startRight;
        for(let i = 0; i < (rLen - 1); i++) {
            rightArr[i] = arr[k];
            k++;
        }
        k = startLeft;
        for(let i = 0; i < (lLen - 1); i++) {
            leftArr[i] = arr[k];
            k++;
        }
        rightArr[rLen-1] = Infinity;
        leftArr[lLen-1] = Infinity;
        let m = 0;
        let n = 0;
        for(let k = startLeft; k < stopRight; k++) {
            if(leftArr[m] < rightArr[n]){
                arr[k] = leftArr[m];
                m++;
            }else{
                arr[k] = rightArr[n];
                n++;
            }
        }
    }
    function printTime(fn, label) {
        let start = new Date().getTime();
        fn.call(arr);
        let end = new Date().getTime();
        console.log(label + ': ', end - start);
    }
} 
let arr = new CArray(30000);
arr.setData();
// console.log(arr.toString());

arr.printTime(arr.bubbleSort, 'bubbleSort')

arr.printTime(arr.selectionSort, 'selectionSort')

arr.printTime(arr.insertionSort, 'insertionSort')

arr.printTime(arr.qsort.bind(arr, arr.data), 'qsort')

arr.printTime(arr.shellSort, 'shellSort')

arr.printTime(arr.shellSort1, 'shellSort1')

arr.printTime(arr.mergeSort, 'mergeSort')

// arr.printTime(() => {arr.data.sort()}, 'sort')
// console.log(arr.mergeSort().join(','));

// console.log(arr.toString());
