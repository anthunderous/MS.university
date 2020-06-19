function dydt=ex21(x,y);
dydt = zeros(2,1);
dydt(1)=y(2);
dydt(2)=-y(1)-2*sin(2*x);