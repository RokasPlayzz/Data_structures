class AVLNode {
    constructor(key) {
        this.key = key;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    balanceFactor(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    insert(root, key) {
        if (!root) {
            return new AVLNode(key);
        }

        if (key < root.key) {
            root.left = this.insert(root.left, key);
        } else if (key > root.key) {
            root.right = this.insert(root.right, key);
        } else {
            // Duplicate keys are not allowed in this example
            return root;
        }

        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        const balance = this.balanceFactor(root);

        // Left Left Case
        if (balance > 1 && key < root.left.key) {
            return this.rotateRight(root);
        }

        // Right Right Case
        if (balance < -1 && key > root.right.key) {
            return this.rotateLeft(root);
        }

        // Left Right Case
        if (balance > 1 && key > root.left.key) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }

        // Right Left Case
        if (balance < -1 && key < root.right.key) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }

        return root;
    }

    search(root, key) {
        if (!root || root.key === key) {
            return root;
        }

        if (key < root.key) {
            return this.search(root.left, key);
        }

        return this.search(root.right, key);
    }

    delete(root, key) {
        if (!root) {
            return root;
        }

        if (key < root.key) {
            root.left = this.delete(root.left, key);
        } else if (key > root.key) {
            root.right = this.delete(root.right, key);
        } else {
            if (!root.left || !root.right) {
                const temp = root.left || root.right;
                root = null;
                return temp;
            }

            const temp = this.findMinValueNode(root.right);
            root.key = temp.key;
            root.right = this.delete(root.right, temp.key);
        }

        if (!root) {
            return root;
        }

        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        const balance = this.balanceFactor(root);

        // Left Left Case
        if (balance > 1 && this.balanceFactor(root.left) >= 0) {
            return this.rotateRight(root);
        }

        // Right Right Case
        if (balance < -1 && this.balanceFactor(root.right) <= 0) {
            return this.rotateLeft(root);
        }

        // Left Right Case
        if (balance > 1 && this.balanceFactor(root.left) < 0) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }

        // Right Left Case
        if (balance < -1 && this.balanceFactor(root.right) > 0) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }

        return root;
    }

    findMinValueNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    inorderTraversal(root) {
        if (root) {
            this.inorderTraversal(root.left);
            console.log(root.key);
            this.inorderTraversal(root.right);
        }
    }
}

// Example Usage
const avlTree = new AVLTree();
const keys = [9, 5, 10, 0, 6, 11, -1, 1, 2];

keys.forEach((key) => {
    avlTree.root = avlTree.insert(avlTree.root, key);
});

console.log("AVL Tree Inorder Traversal:");
avlTree.inorderTraversal(avlTree.root);

const searchKey = 10;
const searchResult = avlTree.search(avlTree.root, searchKey);
if (searchResult) {
    console.log(`Node with key ${searchKey} found in the AVL Tree.`);
} else {
    console.log(`Node with key ${searchKey} not found in the AVL Tree.`);
}

const deleteKey = 6;
avlTree.root = avlTree.delete(avlTree.root, deleteKey);
console.log(`AVL Tree Inorder Traversal after deleting ${deleteKey}:`);
avlTree.inorderTraversal(avlTree.root);
