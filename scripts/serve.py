"""Serve the static preview on loopback, including concurrent browser checks."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewServer(ThreadingHTTPServer):
    # The standard backlog of 5 can reject parallel font/script requests on Windows.
    request_queue_size = 128


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4187)
    args = parser.parse_args()
    handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).resolve().parents[1]))
    with PreviewServer(("127.0.0.1", args.port), handler) as server:
        print(f"ARMMATE preview: http://127.0.0.1:{args.port}", flush=True)
        server.serve_forever()
