import numpy as np
import scipy as sp
import math
from scipy.integrate import odeint
import matplotlib.pyplot as plt

def g(y, x):
    y0 = y[0]
    y1 = y[1]
    y2 = 80*math.exp(x)*math.cos(x)-6*y1 - 10*y0
    return y1, y2


init = 4.0, 10.0
x = np.linspace(0,2,100)
sol=odeint(g, init, x)
print(sol)
plt.plot(x, sol[:,0], color='b')
x = np.linspace(0,-2,100)
sol=odeint(g, init, x)
plt.plot(x, sol[:,0], color='b') 
plt.show()
