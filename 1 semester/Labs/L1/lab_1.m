clear, clc, close all
x1 = [0.55 1.39 1.89 1.45 1.89 2.51 0.89 0.67 0.56 4.30];
x2 = [5.75 3.75 3.98 3.02 4.72 6.98 3.89 4.10 4.23 4.56];
x3 = [66.02 42.00 65.99 50.98 47.34 45.36 49.99 52.98 56.77 60.34];
x4 = [110.00 91.99 93.89 97.90 91.67 95.08 96.70 98.99 101.02 91.91];
y = [4.1 3.7 4.3 3.6 4.5 4.0 3.9 5.0 3.4 4.1];
yt = [4.0352 4.0548 4.0666 4.0563 4.0666 4.0811 4.0431 4.0380 4.0354 4.1230];

mx1 = mean(x1)
mx2 = mean(x2)
mx3 = mean(x3)
mx4 = mean(x4)
my = mean(y)

vr1 = var(x1)
vr2 = var(x2)
vr3 = var(x3)
vr4 = var(x4)

cv1 = cov(x1,y)
cv2 = cov(x2,y)
cv3 = cov(x3,y)
cv4 = cov(x4,y)


corrcoef(x1,y)
corrcoef(x2,y)
corrcoef(x3,y)
corrcoef(x4,y)
x = 0:0.01:5;
a = 0.02;
b= 4.02;
regstats(y,x1,'linear')
X = [x1',x2',x3',x4'];
glmfit(X,y)

y = a*x+b;
plot(x,y, 'r',x1,yt,'b*')

