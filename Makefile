install:
	cd frontend && npm ci

build:
	cd frontend && npm ci && npm run build

start:
	npx serve -s frontend/dist -l 3000
# 	npx start-server -s ./frontend/dist	

lint:
	cd frontend && npm run lint
