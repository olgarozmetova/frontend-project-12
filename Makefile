install:
	cd frontend && npm ci

build:
	cd frontend && npm ci && npm run build

start:
	PORT=${PORT:-5000} npx start-server -s ./frontend/dist
#npx start-server -s ./frontend/dist	

lint:
	cd frontend && npm run lint
