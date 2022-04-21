from datetime import datetime
import time
import threading

class Client:
    def __init__(self, socketio, client):
        self.socketio = socketio
        self.client = client
        self.starting_time = datetime.now()
        self.broadcasting = False
        self._announce_new_client()
        self.taskDict = {}

    def _announce_new_client(self):
        # announce the new client
        server_msg = f'Client: ({self.client}) connected'
        print(f'\n\n{server_msg}\n\n')

        # send reciept only to the client
        self.socketio.emit('message', {'data': server_msg}, room=self.client)

    def thread_this(self, func, args=()):
        t = threading.Thread(target=func, args=args, daemon=True)
        t.start()

    def get_elapsed_time(self):
        current_time = datetime.now()
        elapsed = current_time - self.starting_time
        return datetime.utcfromtimestamp(elapsed.total_seconds()).strftime("%H:%M:%S")

    def start_broadcasting_time(self):
        self.broadcasting = True
        self.thread_this(self.broadcast_time)

        # send reciept only to the client
        server_msg = f'Client: ({self.client}) has requested elapsed time'
        self.socketio.emit(self.client, {'data': server_msg})

    def broadcast_time(self):
        while self.broadcasting:
            # emit to a specific client using their personal room they are always subscribed to
            self.socketio.emit(
                'client-time', {'data': self.get_elapsed_time()}, room=self.client)
            time.sleep(2)
    
    def add_task(self, task_name, task):
        # instantiate new task
        new_task = task(self.socketio, self.client)

        # add instantiated task to clients task dictionary
        self.taskDict[task_name] = new_task

        # start new task
        new_task.start()