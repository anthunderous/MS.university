let input_data_x = [
  [1, 0.55, 5.75, 66.02, 110],
  [1, 1.39, 3.75, 42.00, 91.99],
  [1, 1.89, 3.98, 65.99, 93.89],
  [1, 1.45, 3.02, 50.98, 97.90],
  [1, 1.89, 4.72, 47.34, 91.67],
  [1, 2.51, 6.98, 45.36, 95.08],
  [1, 0.89, 3.89, 49.99, 96.7],
  [1, 0.67, 4.1, 52.98, 98.99],
  [1, 0.56, 4.23, 56.77, 101.02],
  [1, 4.30, 4.56, 60.34, 91.91]
];

let input_data_y = [
  [4.1],
  [3.7],
  [4.3],
  [3.6],
  [4.5],
  [4],
  [3.9],
  [5],
  [3.4],
  [4.1]
];


function getCoeffs(input_data_x, input_data_y) {
  let input_data_xt = math.transpose(input_data_x),
    matrix_xtx = math.multiply(input_data_xt, input_data_x),
    matrix_xty = math.multiply(input_data_xt, input_data_y),
    matrix_inv = math.inv(matrix_xtx),
    result = math.multiply(matrix_inv, matrix_xty);
  console.log(result);
  return result;
}
getCoeffs(input_data_x, input_data_y);
