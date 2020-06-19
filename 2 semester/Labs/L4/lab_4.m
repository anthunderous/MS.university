y0=[1 1];
xspan=[pi 10];
[X,Y]=ode45('ex21', xspan,y0);
plot(X,Y);

syms y(x) x;
eqn =diff(y,x,2)+y(x)==-2*sin(2*x);
dsolve(eqn)