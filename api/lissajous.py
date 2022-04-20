from math import cos, sin
from datetime import datetime
import time
import threading

# static serve of Bokeh Plots
from bokeh.plotting import figure
from bokeh.embed import json_item
from bokeh.models import ColumnDataSource, Range1d

# custom inline options for Bokeh
from bokeh.resources import INLINE
from bokeh.models import AjaxDataSource
from bokeh.models import CustomJS, Select
from bokeh.layouts import widgetbox, column
from bokeh.embed import components


def get_lissajous(a=5, b=4):
    A = 100
    B = 100
    delta = 3.14 / 2
    t = 0

    x = []
    y = []

    # lissajous plot
    for i in range(0, 1000):
        t += 0.01
        # Apply Lissajous Parametric Equations
        x.append(A * sin(a * t + delta))
        y.append(B * sin(b * t))

    return {'x_values': x, 'y_values': y}


def thread_this(func, args=()):
    t = threading.Thread(target=func, args=args, daemon=True)
    t.start()


class LissajousStream:
    def __init__(self, socketio):
        # self.move_to_completed = func  # func
        self.socketio = socketio
        # self.room = room  # clients connect to rooms under the namespace /test

        # self.n_count = 0
        # self.thread = Thread()

        # self.starting_time = datetime.now()
        # self.time = 0
        self.datatable = {'index': [0], 'x_values': [0], 'y_values': [0]}

    def start(self):
        thread_this(self.bk_stream)

    def bkapp_setup(self):
        source = ColumnDataSource(data=self.datatable, name='my-data-source')

        # Make sure CDN links match Bokeh version
        plot = figure(title='Lissajous',
                      x_axis_label='x-label',
                      y_axis_label='y-label',
                      background_fill_color="#fafafa",
                      name='s1',
                      plot_width=500,
                      plot_height=500)

        plot.circle(x='x_values', y='y_values', source=source, line_width=2)

        # With the help of x_range and
        # y_range functions we are setting
        # up the range of both the axis
        plot.x_range = Range1d(-100, 100)
        plot.y_range = Range1d(-100, 100)

        # Store components
        script, div = components(plot)
        context = {'script': script, 'div': div}

        return context, self.datatable

    def bk_stream(self):
        # initialize empty ColumnDataSource
        source = ColumnDataSource(data={'x_values': [], 'y_values': []})

        p = figure(title="Plot",
                   width=500, height=500,
                   toolbar_location="below",
                   )

        # Providing data as a ColumnDataSource
        p.circle(x='x_values', y='y_values', source=source)

        # generate data
        data = get_lissajous()

        # simulate stream of new data by iterating over pre-generated data
        for idx in range(len(data['x_values'])):
            x = data['x_values'][idx]
            y = data['y_values'][idx]

            # save data (unnecessary for bokeh)
            self.datatable['index'].append(len(self.datatable['index']))
            self.datatable['x_values'].append(x)
            self.datatable['y_values'].append(y)

            new_data = {'index':idx, 'x_values': x, 'y_values': y}

            self.socketio.emit(
                'bk_update', {'data': new_data}, namespace='/test')
            time.sleep(0.01)
