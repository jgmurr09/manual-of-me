"""Serve this static folder locally, including the optional older-image reader."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser

if __name__ == "__main__":
    root = str(Path(__file__).resolve().parent)
    handler = partial(SimpleHTTPRequestHandler, directory=root)
    server = None
    for port in range(8080, 8090):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), handler)
            break
        except OSError:
            continue
    if server is None:
        raise SystemExit("No free local port found between 8080 and 8089.")
    url = f"http://127.0.0.1:{server.server_port}/"
    print(f"Manual of Me is ready at {url}\nPress Ctrl+C to stop.")
    threading.Timer(0.5, webbrowser.open, args=(url,)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
