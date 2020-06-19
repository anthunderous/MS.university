//jshint esversion:6

let input_data = [
  [0.55, 5.75, 66.02, 110, 4.1],
  [1.39, 3.75, 42.00, 91.99, 3.7],
  [1.89, 3.98, 65.99, 93.89, 4.3],
  [1.45, 3.02, 50.98, 97.90, 3.6],
  [1.89, 4.72, 47.34, 91.67, 4.5],
  [2.51, 6.98, 45.36, 95.08, 4],
  [0.89, 3.89, 49.99, 96.7, 3.9],
  [0.67, 4.1, 52.98, 98.99, 5],
  [0.56, 4.23, 56.77, 101.02, 3.4],
  [4.30, 4.56, 60.34, 91.91, 4.1]
];

let x1_array = [0.55, 1.39, 1.89, 1.45, 1.89, 2.51, 0.89, 0.67,0.56, 4.3],
x2_array = [5.75, 3.75, 3.98, 3.02, 4.72, 6.98, 3.89, 4.1, 4.23, 4.56],
x3_array = [66.02, 42, 65.99, 50.98, 47.34, 45.36, 49.99, 52.98, 56.77, 60.34],
x4_array = [110, 91.99, 93.89, 97.9, 91.67, 95.08, 96.7, 98.99, 101.02, 91.91],
y_array = [4.1, 3.7, 4.3, 3.6, 4.5, 4, 3.9, 5, 3.4, 4.1];

let math_expec = get_math_expectation(input_data),
  math_expec_x = math_expec.x,
  math_expec_y = math_expec.y[0],
  dispersion = get_dispersion(input_data, math_expec_x),
  covariance = get_covariance(input_data, math_expec_x, math_expec_y),
  correlation_coeff = get_correlation_coeff(input_data, math_expec_x, math_expec_y, covariance),
  sums = getSums(input_data),
  coeffs = get_coeffs(input_data, sums),
  Yt1 = get_Yt1(input_data, coeffs),
  general_dispersion = get_general_dispersion(input_data, math_expec_y),
  residual_dispersion = get_residual_dispersion(input_data, Yt1),
  determination_coeff = get_determination_coeff(general_dispersion, residual_dispersion);

function get_math_expectation(data) {
  let result = {
    "x": [0, 0, 0, 0],
    "y": [0]
  };
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      switch (j) {
        case data[i].length - 1:
          result.y[0] += data[i][j];
          break;
        default:
          result.x[j] += data[i][j];
      }
    }
  }

  for (let key1 in result) {
    result[key1].forEach(function (value2, key2) {
      result[key1][key2] = value2 / data.length;
      console.log(`Мат.ожидание для ${key1.toUpperCase()}${key2+1} = ${result[key1][key2].toFixed(3)}`);
    });
  }
  return result;
}

function get_dispersion(data, math_expec_x) {
  let result = [0, 0, 0, 0];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      result[j] += Math.pow(data[i][j] - math_expec_x[j], 2);
    }
  }
  result.forEach(function (value, key) {
    result[key] = value / (data.length - 1);
    console.log(`Дисперсия для Х${key+1} = ${result[key].toFixed(3)}`);
  });
  return result;
}

function get_covariance(data, math_expec_x, math_expec_y) {
  let result = [0, 0, 0, 0];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      result[j] += (data[i][j] - math_expec_x[j]) * (data[i][data[i].length - 1] - math_expec_y);
    }
  }
  result.forEach(function (value, key) {
    console.log(`Ковариация для Х${key+1}Y = ${result[key].toFixed(3)}`);
  });
  return result;
}

function get_correlation_coeff(data, math_expec_x, math_expec_y, covariance) {
  let result = [0, 0, 0, 0],
    sum1 = [0, 0, 0, 0],
    sum2 = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      sum1[j] += Math.pow(data[i][j] - math_expec_x[j], 2);
    }
    sum2 += Math.pow(data[i][data[i].length - 1] - math_expec_y, 2);
  }

  result.forEach(function (value, key) {
    result[key] = covariance[key] / (Math.sqrt(sum1[key] * sum2));
    console.log(`Коэффициент корреляции для Х${key+1} = ${result[key]}`);
  });
  return result;
}

function get_general_dispersion(data, math_expec_y) {

  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += Math.pow((data[i][input_data[i].length - 1] - math_expec_y), 2);
  }
  result = result / (data.length - 1);
  console.log(`Общая дисперсия = ${result.toFixed(4)}`);
  return result;
}

function get_residual_dispersion(data, Yt1) {
  let result = 0
  for (let i = 0; i < data.length; i++) {
    result += Math.pow((data[i][input_data[i].length - 1] - Yt1[i]), 2);
  }
  result = result / (data.length - 1);
  console.log(`Остаточная дисперсия = ${result.toFixed(4)}`);

  return result;
}

function get_determination_coeff(general_dispersion, residual_dispersion) {
  let result = 1 - (residual_dispersion / general_dispersion);
  console.log(`Коэффициент детерминации = ${result.toFixed(4)}`);
  console.log("т.е. в 0.34% случаев изменения х приводят к изменению y. Другими словами - точность подбора уравнения регрессии - низкая. Остальные 99.66% изменения Y объясняются факторами, не учтенными в модели (а также ошибками спецификации).");
  

  return result;
}

function getSums(input) {
  let sums = {
    "Y": 0,
    "X1": 0,
    "X2": 0,
    "X3": 0,
    "X4": 0,
    "X1^2": 0,
    "X1*Y": 0,
    "X2^2": 0,
    "X2*Y": 0,
    "X3^2": 0,
    "X3*Y": 0,
    "X4^2": 0,
    "X4*Y": 0
  };
  for (let i = 0; i < input.length; i++) {
    sums.Y += input[i][input_data[i].length - 1];
    sums.X1 += input[i][0];
    sums.X2 += input[i][1];
    sums.X3 += input[i][2];
    sums.X4 += input[i][3];

    sums["X1^2"] += Math.pow(input[i][0], 2);
    sums["X1*Y"] += input[i][0] * input[i][input_data[i].length - 1];

    sums["X2^2"] += Math.pow(input[i][1], 2);
    sums["X2*Y"] += input[i][1] * input[i][input_data[i].length - 1];

    sums["X3^2"] += Math.pow(input[i][2], 2);
    sums["X3*Y"] += input[i][2] * input[i][input_data[i].length - 1];

    sums["X4^2"] += Math.pow(input[i][3], 2);
    sums["X4*Y"] += input[i][3] * input[i][input_data[i].length - 1];
  }
  return sums;
}

function get_coeffs(input, sums) {
  let result = {
    "b": (sums.Y * sums["X^2"] - sums["X*Y"] * sums.X1) / (input.length * sums['X^2'] - Math.pow(sums.X1, 2)),
    "a": (input.length * sums["X*Y"] - sums.Y * sums.X1) / (input.length * sums["X^2"] - Math.pow(sums.X1, 2))
  }
  console.log(`Коэффициент а = ${result.a.toFixed(2)}`);
  console.log(`Коэффициент b = ${result.b.toFixed(2)}`);
  return result;
}

function get_Yt1(input, coeffs) {
  let result = [];
  for (let i = 0; i < input.length; i++) {
    result.push((coeffs.a * input[i][0] + coeffs.b).toFixed(4));
  }
  console.log("Yt = ", result);
  return result;
}

function get_F(input, coeffs) {
  result = 0;
  for (let i = 0; i < input.length; i++) {
    result += Math.pow((input[i][input_data[i].length - 1] - coeffs.b - coeffs.a * input[i][0]), 2);
  }
  result = result.toFixed(2);
  // console.log(`Fx1 = ${result}`);
  return result;
}
// let F = get_F(input_data, coeffs);
// let q = (Math.sqrt((F / input_data.length))).toFixed(2);
// let S = (q / Math.cos(Math.atan(coeffs.a))).toFixed(2);

// get_gaps(input_data, coeffs, S);

function get_gaps(data, coeffs, S) {
  let result = [
    [],
    [],
    []
  ];
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    result[0][i] = (coeffs.a * data[i][0] + coeffs.b - S).toFixed(2);
    result[1][i] = (coeffs.a * data[i][0] + coeffs.b + +S).toFixed(2);

    if (data[i][data[i].length - 1] >= result[0][i] && data[i][data[i].length - 1] <= result[1][i]) {
      result[2][i] = "+";
    } else {
      result[2][i] = "-";
      count++;
    }
  }
  console.log(result);
  return result;
}

function get_multiple_coeffs(data, sums, math_expec){
//  let result = [0,0,0,0];
//  result[0] = ((data.length * sums['X*Y']-(sums.X1*sums.Y))(data.length * sums['X2^2']-(sums.X2*sums.X2)-
//  (data.length*sums['X2*Y']-(sums.Y*sums.X1)))
}

function sum(array){
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    result+=element;
  }
  return result;
}

function sum_cross_matrix(array1, array2){
  // let result = 0;
  // for (let i = 0; i < array1.length; i++) {
  //   const el1 = array1[i];
  //   const el2 = array2[i];
  //   result+=el1*el2;
  // }
  // return result;
}

// console.log(transposeArray([x1_array,x2_array,x3_array,x4_array], 10));
function transposeArray(array, arrayLength){
  var newArray = [];
  for(var i = 0; i < array.length; i++){
      newArray.push([]);
  };

  for(var i = 0; i < array.length; i++){
      for(var j = 0; j < arrayLength; j++){
          newArray[j].push(array[i][j]);
      };
  };

  return newArray;
}
// get_r(input_data, math_expec_y, Yt1);

// function get_r (data, math_expec_y, Yt){
//   let sum1 = 0, sum2 = 0;
//   for(let i=0;i<data.length;i++){
//     sum1+=Math.pow((Yt[i]-math_expec.y),2);
//     sum2+=Math.pow((data[i][data[i].length-1]-math_expec_y),2);
//   }

//   result = sum1/sum2;
// }
console.log((input_data));

console.log(math.transpose(input_data));
