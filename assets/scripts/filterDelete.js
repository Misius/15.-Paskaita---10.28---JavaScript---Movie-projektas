'use strict';
console.log('filterDelete.js');



const arr = [
    {id:1},
    {id:2},
    {id:3},
];

// istrinti el kurio id 2
arr.filter((obj) => obj.id !== 2);

console.log('arr.filter((obj) => obj.id !== 2); ===', arr.filter((obj) => obj.id !== 2));