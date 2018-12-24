function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.preOrder = preOrder;
    this.postOrder = postOrder;
    this.getMin = getMin;
    this.getMax = getMax;
    this.find = find;
    this.remove = remove;
    function insert(data) {
        let node = new Node(data,null,null);
        if(!this.root)
            this.root = node;
        else {
            let current = this.root;
            while(current) {
                if(data < current.data) {
                    if(!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else {
                    if(!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                }
            }
        }
    }
    function inOrder(node) {
        if(!node)
            return '';
        return inOrder(node.left) + ' ' + node.data + ' ' + inOrder(node.right);
    }
    function preOrder(node) {
        if(!node)
            return '';
        return node.data + ' ' + preOrder(node.left) + ' ' + preOrder(node.right);
    }
    function postOrder(node) {
        if(!node)
            return '';
        return postOrder(node.left) + ' ' + postOrder(node.right) + ' ' + node.data;
    }
    function getMin(root) {
        let current = root || this.root;
        while(current) {
            if(current.left)
                current = current.left;
            else
                return current.data;
        }
    }
    function getMax(root) {
        let current = root || this.root;
        while(current) {
            if(current.right)
                current = current.right;
            else
                return current.data;
        }
    }
    function find(data, root) {
        let current = root || this.root;
        while(current) {
            if(current.data === data)
                return current;
            else if(current.data < data)
                current = current.right;
            else
                current = current.left;
        }
    }
    function remove(data) {
        let parent = this.root;
        let type = '';
        let current = this.root;
        while(current) {
            if(current.data === data) {
                if(!type)
                    this.root = null;
                else {
                    parent[type] = null;
                }
            }
            else if(current.data < data)
                current = current.right;
            else
                current = current.left;
        }
    }
    function remove(data) {
        this.root = removeNode(this.root, data);
    }
    function removeNode(root, data) {
        if(root.data === data) {
            if(!root.left && !root.right)
                return null;
            else if(!root.left) {
                return root.right
            } else if(!root.right) {
                return root.left;
            } else {
                root.data = getMin(root.right);
                root.right = removeNode(root.right, root.data);
                return root;
            }
        } else if(root.data < data) {
            root.right = removeNode(root.right, data);
            return root;
        } else {
            root.left = removeNode(root.left, data);
            return root;
        }
    }
}
let bst = new BST();
// let list = [4,2,1,3,6,5,7];
let list = [23,45,16,37,3,99,22];
list.forEach((item) => {
    bst.insert(item);
})
// bst.remove(3);
console.log(JSON.stringify(bst,2,2));
// console.log(bst.inOrder(bst.root))
// console.log(bst.preOrder(bst.root))
// console.log(bst.postOrder(bst.root))
// console.log(bst.getMin())
// console.log(bst.getMax())
// console.log(bst.find(45))
