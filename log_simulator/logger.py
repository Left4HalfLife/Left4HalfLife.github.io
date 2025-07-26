import datetime
import keyboard  # pip install keyboard
import os

LOG_FILE = "simulated_logs.txt"

LOG_LEVELS = {
    '1': 'debug',
    '2': 'warning',
    '3': 'error',
    '4': 'fatal'
}

def write_log(level):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    messages = {
        'debug': "regular debug message",
        'warning': "something sus could happen",
        'error': "something went wrong",
        'fatal': "something went so wrong the program has crashed"
    }
    log_entry = f"[{level}] [{timestamp}] {messages[level]}"
    with open(LOG_FILE, "a") as f:
        f.write(log_entry + "\n")
    print(log_entry)

def main():
    print("Log simulator running. Press:")
    print("1 = debug, 2 = warning, 3 = error, 4 = fatal, q = quit")

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