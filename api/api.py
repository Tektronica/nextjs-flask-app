from email import header
import time

import flask
from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

# static serve of Bokeh Plots
from bokeh.plotting import figure
from bokeh.embed import json_item
from bokeh.models import ColumnDataSource

# custom inline options for Bokeh
from bokeh.resources import INLINE
from bokeh.models import AjaxDataSource
from bokeh.models import CustomJS, Select
from bokeh.layouts import widgetbox, column
from bokeh.embed import components

import json

from waitress import serve
from random import random, randint

import threading
from datetime import datetime

import lissajous

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app, cors_allowed_origins='http://localhost:5000')
socketio = SocketIO(app, async_mode='threading', cors_allowed_origins='*')

cors = CORS(app)
app.debug = False


# serve(app, host='0.0.0.0', port=5000)

def thread_this(func, args=()):
    t = threading.Thread(target=func, args=args, daemon=True)
    t.start()


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/plot')
def plot():
    data = lissajous.get_lissajous()

    p = figure(title="Plot",
               width=500, height=500,
               toolbar_location="below",
               )

    # create a ColumnDataSource by passing the dict
    source = ColumnDataSource(data=data)

    # Providing data as a ColumnDataSource
    p.circle(x='x_values', y='y_values', source=source)

    return json.dumps(json_item(p, "lissajous"))


def format_sse(data: str, event=None) -> str:
    msg = f'data: {data}\n\n'
    if event is not None:
        msg = f'id: 12345\nevent: {event}\n{msg}'
    return msg


@app.route('/stream', methods=['GET', 'POST'])
@cross_origin()
def stream():
    def event_stream():
        while True:
            timestamp = datetime.now().strftime("%H:%M:%S")
            yield f'data: {timestamp}\n\n'
            time.sleep(1)

    # mimtype could be text/event-stream
    # mimtype could be application/json
    # curl --no-buffer -v http://localhost:5000/stream

    # res = Response(response=event_stream(),
    #                mimetype="text/event-stream", )

    # res.headers.add('Access-Control-Allow-Origin', '*')
    # res.headers.add('Content-Type', 'text/event-stream;charset=utf-8')
    # res.headers.add('Cache-Control', 'no-cache, no-transform')
    # res.headers.add('X-Accel-Buffering', 'no')

    return Response(event_stream(), content_type='text/event-stream')


@app.route('/plot-stream', methods=['GET', 'POST'])
def plot_stream():
    # initialize empty ColumnDataSource
    source = ColumnDataSource(data={'x_values': [], 'y_values': []})

    p = figure(title="Plot",
               width=500, height=500,
               toolbar_location="below",
               )

    # Providing data as a ColumnDataSource
    p.circle(x='x_values', y='y_values', source=source)

    # generate data
    data = lissajous.get_lissajous()

    # simulate stream of new data by iterating over pre-generated data
    for i, x_value in enumerate(data['x_values']):
        time.sleep(1)
        new_data = {'x_values': [x_value], 'y_values': [data['y_values'][i]]}
        source.stream(new_data, 300)


@app.route('/echo', methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'])
def api_echo():
    if flask.request.method == 'GET':
        return {'data': "ECHO: GET"}

    elif flask.request.method == 'POST':
        return {'data': "ECHO: POST"}

    elif flask.request.method == 'PATCH':
        return {'data': "ECHO: PATCH"}

    elif flask.request.method == 'PUT':
        return {'data': "ECHO: PUT"}

    elif flask.request.method == 'DELETE':
        return {'data': "ECHO: DELETE"}


# =============================================================================================
@app.route('/bkapp_setup', methods=['GET', 'POST'])
def bkapp_setup():
    bkapp = lissajous.LissajousStream(0)
    context, datatable = bkapp.bkapp_setup()

    return {'context': context, 'data': datatable}

# @app.route('/plot-stream', methods=['GET', 'POST'])
# def bk_start():
#     thread_this(bk_app)

# SocketIO ==============================================================================
@socketio.on('connect')
def test_connect():
    client = request.sid
    print(f'\n>> Client ({client}) connected\n')
    socketio.emit('to_client', {'data': f'Client ({client}) has connected'})
    # thread_this(current_time)


@socketio.on('disconnect')
def test_disconnect():
    print(f'{request.id} has disconnected')
    # socketio.emit('user disconnected',
    #     {'user_id': request.sid, 'message': users[request.sid].username+' disconnected'},
    #     broadcast=True)


@socketio.on('start', namespace='/test')
def start_bokeh_app(client_msg):
    client = request.sid
    print(client_msg)

    # start bokeh plot
    bkapp = lissajous.LissajousStream(socketio)
    bkapp.start()

    # report activity
    server_msg = f'\n>> Client: ({client}) has started a new plot!\n'
    print(server_msg)
    socketio.emit('message', {'data': server_msg})


# def current_time():
#     while True:
#         timestamp = datetime.now().strftime("%H:%M:%S")
#         socketio.emit('time', timestamp, namespace='')
#         time.sleep(3)


# ajax bokeh server ======================================================================================
my_data = {'one': [1, 3, 5],
           'two': [2, 7, 5],
           'three': [8, 3, 6]}


@app.route('/ajax', methods=['GET', 'POST'])
def ajax():
    x = [1, 2, 3]
    source = ColumnDataSource(data=dict(x=x, y=my_data['one']))
    plot = figure(height=250, width=300)
    plot.line('x', 'y', source=source, line_width=3, line_alpha=0.8)
    # callback = CustomJS(args=dict(source=source), code="""
    # var selected_value = cb_obj.value;
    # var plot_data = source.data;
    # jQuery.ajax({
    #     type: 'POST',
    #     url: '/new_option',
    #     data: {"value": selected_value},
    #     dataType: 'json',
    #     success: function (response) {
    #         plot_data['y'] = response["option"];
    #         source.trigger('change');
    #     },
    #     error: function() {
    #         alert("An error occured!");
    #     }
    # });
    # """)

    select = Select(value='one',
                    options=['one', 'two', 'three'],)
    # js_event_callbacks=callback)

    layout = column(widgetbox(select, width=100), plot)
    script, div = components(layout, INLINE)
    return json.dumps({'script': script,
                       'div': div,
                       'js_resources': INLINE.render_js(),
                       'css_resources': INLINE.render_css()})


if __name__ == "__main__":
    # app.run()

    # encapsulates the start up of the web server
    # replaces the app.run() standard Flask development server start up.
    socketio.run(app)
