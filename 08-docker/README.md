# Module 8 — Docker Containerization

## Objective

Containerize a Node.js application using Docker and document the container configuration and execution workflow.

## HR Task

The task for this module is to containerize the application and document the Docker configuration and architecture.

## Implementation

A simple Node.js application using Express was created with two endpoints:

* `GET /` — Returns a message confirming that the JourneyBuddy application is running.
* `GET /health` — Returns the health status of the application.

A Dockerfile was created to package the application into a Docker image.

## Docker Configuration

The Dockerfile:

1. Uses Node.js 22 as the base image.
2. Sets `/app` as the working directory.
3. Copies the package files.
4. Installs the required dependencies.
5. Copies the application source code.
6. Exposes port `3000`.
7. Starts the application using `node server.js`.

## Docker Image

The Docker image was successfully built using:

`journeybuddy-docker:latest`

## Docker Container

A container was created from the image using:

`journeybuddy-container`

The container maps:

`Host Port 3001 → Container Port 3000`

Port `3001` was used on the host because port `3000` was already occupied.

## Verification

The running container was verified using Docker.

The container status showed:

`Up`

The application was successfully accessed through:

`http://localhost:3001`

The health endpoint returned:

`{"status":"healthy"}`

## Architecture

The containerized application follows this architecture:

`User → Host Port 3001 → Docker Container Port 3000 → Node.js Express Application`

The complete architecture and workflow are documented in `ARCHITECTURE.md`.

## Project Files

* `server.js` — Express application.
* `Dockerfile` — Docker image configuration.
* `package.json` — Node.js project configuration.
* `package-lock.json` — Dependency lock file.
* `ARCHITECTURE.md` — Docker architecture and workflow documentation.
* `README.md` — Module documentation.

## Technologies

* Node.js
* Express
* Docker
* Docker Desktop
* WSL 2

## Task Completion

The Node.js application was successfully containerized using Docker. The Docker image was built, a container was created and started, port mapping was configured, and the application was verified through the browser.

## Reference Documentation

Docker Documentation: https://docs.docker.com/
