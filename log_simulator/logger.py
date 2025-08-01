import datetime
import keyboard  # pip install keyboard
import os

LOG_FILE = "simulated_logs.txt"

LOG_LEVELS = {
    '1': 'DEBUG',
    '2': 'WARNING',
    '3': 'ERR',
    '4': 'CRIT'
}

def write_log(level):
    severity_labels = {
        'DEBUG': '[DEBUG]',
        'WARNING': '[WARNING]',
        'ERR': '[ERR]',
        'CRIT': '[CRIT]'
    }
    timestamp = datetime.datetime.now().strftime("%b %d %H:%M:%S")
    hostname = os.uname().nodename if hasattr(os, "uname") else "localhost"
    app_name = "log_simulator"
    messages = {
        'DEBUG': "regular debug message",
        'WARNING': "something sus could happen",
        'ERR': "something went wrong",
        'CRIT': "something went so wrong the program has crashed"
    }
    # Format: "timestamp hostname appname: [SEVERITY] message"
    log_entry = f"{timestamp} {hostname} {app_name}: {severity_labels[level]} {messages[level]}"
    with open(LOG_FILE, "a") as f:
        f.write(log_entry + "\n")
    print(log_entry)

def main():
    print("Log simulator running. Press:")
    print("1 = debug, 2 = warning, 3 = error, 4 = crit, q = quit")

    while True:
        event = keyboard.read_event()
        if event.event_type == keyboard.KEY_DOWN:
            key = event.name
            if key in LOG_LEVELS:
                write_log(LOG_LEVELS[key])
            elif key == 'q':
                print("Exiting log simulator.")
                break

if __name__ == "__main__":
    main()