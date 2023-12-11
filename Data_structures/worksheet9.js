// Function to heafipy a subtree rooted with a node i which is an index in the array
/*
function maxHeapify(arr, n, i){
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]){
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]){
        largest = right;
    }

    if (largest !== i){
        [arr[i], arr[largest]] = [arr[largest], arr[i]]

        maxHeapify(arr, n, largest);
    }
}

function buildMaxHeap(arr){
    const n = arr.length;

    for(let i = Math.floor(n / 2) - 1; i >= 0; i--){
        maxHeapify(arr, n, i)
    }
}

// Tree-based Representation

class maxHeapNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

let rootNode = new maxHeapNode(4);
rootNode.left = new maxHeapNode(2);
rootNode.right = new maxHeapNode(8);

let heapArray = [];

function treeToArray(root){
    if (root === null) return;
    heapArray.push(root.value);
    treeToArray(root.left);
    treeToArray(root.right);
}

treeToArray(rootNode);
buildMaxHeap(heapArray);
console.log("Max heap (array-based):", heapArray);

// Array-Based Representation

let unsortedArray = [4, 2, 8, 5, 1, 7];

buildMaxHeap(unsortedArray);

console.log("Max Heap (array-based):", unsortedArray);


*/
/*
function heapSort(arr) {
    const n = arr.length;

    buildMaxHeap(arr);

    for(let i = n - 1; i > 0; i--){
        [arr[0], arr[i]] = [arr[1], arr[0]];

        maxHeapfiy(arr, i, 0);
    }
}

let unsortedArray = [4, 2, 8, 5, 1, 7];

console.log("Unsorted Array:", unsortedArray);

heapSort(unsortedArray);

console.log("Sorted Array:", unsortedArray);
*/
/*
function findNthLargest(arr, N){
    const n = arr.length;

    if(N > n || N <= 0){
        console.log("Invalid value of N")
        return;
    }
    buildMaxHeap(arr);

    for(let i = 1; i < N; i++){
        [arr[0], arr[n - i]] = [arr[n-1], arr[0]];
        maxHeapify(arr, n - i, 0);
    }
    return arr[0];
}

let unsortedArray = [4, 2, 8, 5, 1, 7];
let N = 3;

let nthLargest = findNthLargest(unsortedArray, N);
console.log(`The ${N}-th largest element is:`, nthLargest);
*/
/*
function findNthLargestSorting(arr, N){
    const n = arr.length;

    if (N > n || N <= 0){
        console.log("Invalid value of N");
        return;
    }

    arr.sort((a, b) => b - a);

    return arr[N - 1];
}

let unsortedArray = [4, 2, 8, 5, 1, 7];
let N = 3;

let nthLargestSorting = findNthLargestSorting(unsortedArray, N);
console.log(`The ${N}-th largest element is:`, nthLargestSorting);

*/
class Node {
    constructor(symbol, frequency){
        this.symbol = symbol;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

class PriorityQueue{
    constructor(){
        this.nodes = [];
    }

    enqueue(node){
        this.nodes.push(node);
        this.nodes.sort((a, b) => a.frequency - b.frequency);
    }

    dequeue(){
        return this.nodes.shift();
}
isEmpty(){
    return this.nodes.length === 0;
    }
}

function buildHuffmanTree(data){
    const frequencyMap = new Map();
    for (const symbol of data){
        PriorityQueue.enqueue(new Node(symbol, frequency));
    }

    while (PriorityQueue.nodes.length > 1){
        const left = PriorityQueue.dequeue();
        const right = PriorityQueue.dequeue();

        const mergedNode = new Node(null, left.frequency + right.frequency);
        mergedNode.left = left;
        mergedNode.right = right;

        PriorityQueue.enqueue(mergedNode)
    }

    return PriorityQueue.dequeue();
}

const inputSequence = "abracadabra";
const huffmanTree = buildHuffmanTree(inputSequence);
console.log(huffmanTree);