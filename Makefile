build:
	~/.yarn/bin/tsc -w

serve:
	python3 -m http.server 8000 --bind 127.0.0.1