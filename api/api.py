import time
from flask import Flask

from bokeh.plotting import figure, show
# from bokeh.models import AjaxDataSource, CustomJS
from bokeh.embed import json_item

from math import cos, sin
import json

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/plot')
def plot():
    data = get_lissajous()

    fig = figure(title="Plot",
               width=500, height=500,
               toolbar_location="below",
              )

    fig.circle('x', 'y', source=data)
    # script, div = components(fig, INLINE)
    # fig.circle(data['x'], data['y'])
    # fig.circle([1,2,3], [1,2,3])

    return json.dumps(json_item(fig, "lissajous"))


def get_lissajous(a=5, b=4):
    A = 100
    B = 100
    delta = 3.14 / 2
    t=0

    x = []
    y = []

    # lissajous plot
    for i in range(0, 1000):
        t += 0.01
        #Apply Lissajous Parametric Equations
        x.append(A * sin(a*t + delta))
        y.append(B * sin(b*t))

    return {'x':x, 'y':y}
