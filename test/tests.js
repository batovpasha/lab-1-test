'use strict';

//console.log('Passed all tests!');

const transpose = (matrix) => {
  const transposedMatrix = []
  matrix[0].forEach((el, i) => {
    const newRow = matrix.reduce((acc, val, j) => 
      (acc.push(matrix[j][i]), acc)
    , []);
    transposedMatrix.push(newRow);
  });
  return transposedMatrix;
};

const res = transpose(
  [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
);

console.log(res);
