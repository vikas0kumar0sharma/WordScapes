
function find(maze, words) {
     let newWords = [], str = "";
     for (let i = 0; i < words[0].length; i++) {
          if (words[0][i] == ' ') {
               str=str.toUpperCase();
               newWords.push(str);
               str = "";
          } else {
               str += words[0][i];
          }
     }
     str=str.toUpperCase();
     newWords.push(str);
     words = newWords;
     words.forEach((e) => {
          console.log(e);
     })

     let result = [];
     let root = buildTrie(words);

     for (let i = 0; i < maze.length; i++) {
          for (let j = 0; j < maze[i].length; j++) {
               let temp = [];
               dfs(root, i, j, result, temp, maze);
          }
     }
     if (result.length) console.log('found');
     else console.log('not found');
     return result;
}
function dfs(node, i, j, result, temp, maze) {
     if (node.word) {
          temp.forEach((e) => {
               result.push(e);
          })
          while (temp.length) {
               temp.pop();
          }
          node.word = null;
          return;
     }
     if (i < 0 || j < 0 || i >= maze.length || j >= maze[i].length) return;
     if (!node[maze[i][j]]) {
          return;
     }
     let c = maze[i][j];
     maze[i][j] = '$';
     let obj = [i, j];

     temp.push(obj);
     dfs(node[c], i + 1, j, result, temp, maze);
     dfs(node[c], i - 1, j, result, temp, maze);
     dfs(node[c], i, j + 1, result, temp, maze);
     dfs(node[c], i, j - 1, result, temp, maze);

     maze[i][j] = c;
     if (temp.length) temp.pop();
}

const buildTrie = (words) => {
     const root = {};
     for (const w of words) {
          let node = root;
          for (const c of w) {
               if (node[c] == null) node[c] = {};
               node = node[c];
          }
          node.word = w;
     }
     return root;
};

module.exports = find;
