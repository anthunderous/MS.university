const mathjs = require("mathjs");
Number.prototype.round = function(fix) {
  return Math.round(this * Math.pow(10, fix)) / Math.pow(10, fix);
};
// const Y = [[95.23, 91.93],
// 					[96.50, 94.80],
// 					[92.45, 92.10],
// 					[99.50, 91.90],
// 					[95.10, 94.80],
// 					[90.30, 99.60],
// 					[95.60, 94.90],
// 					[98.02, 98.48]];
const Y = [
  [80.23, 90.93],
  [86.5, 85.8],
  [82.45, 82.1],
  [89.5, 90.9],
  [85.1, 84.8],
  [90.3, 89.6],
  [85.6, 85.9],
  [88.02, 88.48]
];
const X = [
  [1, -1, -1, -1],
  [1, 1, -1, -1],
  [1, -1, 1, -1],
  [1, 1, 1, -1],
  [1, -1, -1, 1],
  [1, 1, -1, 1],
  [1, -1, 1, 1],
  [1, 1, 1, 1]
];
const N = Y.length; // amount of tests
const n = X[0].length - 1; // amount of factors
const M = Y[0].length; //amount of parallel tests

const Xt = mathjs.transpose(X);
const Yavg = Y.map(arr => {
  return (
    arr.reduce((sum, val) => {
      return sum + val;
    }) / M
  ).toFixed(2);
});
const B = mathjs
  .multiply(mathjs.multiply(mathjs.inv(mathjs.multiply(Xt, X)), Xt), Yavg)
  .map(val => {
    return +val.toFixed(2);
  });
const S2 = Yavg.map((avg, i) => {
  return (
    (1 / (M - 1)) *
    mathjs.sum(
      Y[i].map(val => {
        return Math.pow(val - avg, 2);
      })
    )
  ).toFixed(2);
});
const G = (mathjs.max(S2) / mathjs.sum(S2)).toFixed(2);
const Gt = 0.6798;
const S02 = (1 / N) * mathjs.sum(S2);
const Sb2 = S02 / N;
const T = B.map(val => {
  return (Math.abs(val) / Sb2).toFixed(2);
});
const YY = mathjs.multiply(X, mathjs.transpose(B));
console.log(B);
console.log(X);
const Tt = 2.31;
const Sad2 =
  (M / (N - n - 1)) *
  mathjs.sum(
    Yavg.map(val => {
      return Math.pow(val - YY, 2);
    })
  );
const F = Sad2 / S02;
const Ft = 3.84;
console.log(`Y = ${Yavg}`);
console.log(`YY = ${YY}`);
console.log(`B = ${B}`);
console.log(`S^2 = ${S2}`);
console.log(`G = ${G}, Gt = ${Gt}`);
G < Gt
  ? console.log("Критерий Кохрена: дисперсия однородна")
  : console.log("Критерий Кохрена: дисперсия неоднородна");
console.log(`S0^2 = ${S02}`);
console.log(`Sb^2 = ${Sb2}`);
T.forEach((val, i) => {
  if (val > Tt) {
    console.log(
      `Критерий Стьюдента: условие значимости коэффициентов для коэффициента ${i} выполняется`
    );
  } else {
    console.log(
      `Критерий Стьюдента: условие значимости коэффициентов для коэффициента ${i} не выполняется`
    );
  }
});
F < Ft
  ? console.log("Критерий Фишера: модель адекватна")
  : console.log("Критерий Фишера: модель неадекватна");
