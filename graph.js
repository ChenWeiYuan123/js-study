function Graph(v) {
    this.v = v;
    this.edges = 0;
    this.adj = [];
    for(let i = this.v-1; i>=0; i--) {
        this.adj[i] = [];
        // this.adj[i].push('');
    }
    this.addEdge = function(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }
    this.show = function() {
        for(let i = 0; i < this.v; i++) {
            console.log(i + '->');
            for(let j = 0; j < this.v; j++) {
                if(this.adj[i][j] !== undefined) {
                    console.log(this.adj[i][j] + ' ')
                }
            }
        }
    }
    this.marked = [];
    for(let i =0; i < this.v; i++){
        this.marked[i] = false;
    }
    this.edgeTo = Array(this.v);

    this.dfs = function (i) {
        console.log(i);
        let len = this.adj[i].length;
        this.marked[i] = true;
        for(let j = 0; j<len; j++) {
            let v = this.adj[i][j];
            // console.log(v)
            if(v !== undefined && !this.marked[v]) {
                this.dfs(v);
            }
        }
    }
    this.dfs2 = function (i) {
        let stack = [i];
        while(stack.length){
            let i =stack.pop();
            console.log(i);
            let len = this.adj[i].length;
            this.marked[i] = true;
            for(let j = len; j>=0; j--) {
                let v = this.adj[i][j];
                // console.log(v)
                if(v !== undefined && !this.marked[v]) {
                    stack.push(v);
                }
            }
        }
    }
    this.topSort = function () {
        let stack = [];
        for(let i = 0; i < this.v; i++) {
            this.topSortHelper(i, stack);
        }
        console.log(stack);
    }
    this.topSortHelper = function (i, stack) {
        if(this.marked[i])
            return;
        this.marked[i] = true;
        console.log(i);
        let len = this.adj[i].length;
        for(let j = 0; j<len; j++) {
            let v = this.adj[i][j];
            // console.log(v)
            if(v !== undefined && !this.marked[v]) {
                this.topSortHelper(v, stack);
            }
        }
        stack.push(i);
    }
    this.bfs = function(i) {
        let queue = [i];
        while(queue.length) {
            let i =queue.shift();
            console.log(i);
            let len = this.adj[i].length;
            this.marked[i] = true;
            for(let j = 0; j<len; j++) {
                let v = this.adj[i][j];
                // console.log(v)
                if(v !== undefined && !this.marked[v]) {
                    queue.push(v);
                    this.edgeTo[v] = i;
                }
            }
            // console.log(queue)
        }
    }
    this.pathTo = function(from, to) {
        let path = [];
        for(let i = to; i !== from; i = this.edgeTo[i]) {
            path.unshift(i);
        }
        path.unshift(from);
        console.log(path);
    }
}
let g = new Graph(7);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 5);
g.addEdge(5, 6);
// g.show();
// Array.from({length: 5}, (v,i)=>i);
// g.bfs(0);
// console.log(g.edgeTo)
// g.pathTo(0,6);
g.topSort();
