#!/usr/bin/env python3
import http.server
import socketserver
import os

# Set the working directory explicitly
os.chdir('/Users/sese/Library/Mobile Documents/com~apple~CloudDocs/website-SESE')

PORT = 4500

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

with socketserver.TCPServer(("127.0.0.1", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running on http://127.0.0.1:{PORT}/")
    httpd.serve_forever()
