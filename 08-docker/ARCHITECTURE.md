# Docker Containerization Architecture

## 1. Overview

This module demonstrates how a Node.js application can be packaged and executed inside a Docker container.

Docker provides an isolated and reproducible environment containing the Node.js runtime, application code, and required dependencies.

## 2. Container Workflow

The application follows this workflow:

1. A Node.js application is created using Express.
2. A `Dockerfile` defines the container configuration.
3. Docker uses the Node.js 22 base image.
4. The application dependencies are installed inside the image.
5. The application source code is copied into the image.
6. A Docker image named `journeybuddy-docker` is created.
7. A container is created from the image.
8. Port `3001` on the host is mapped to port `3000` inside the container.
9. The Node.js application runs inside the container.

## 3. Architecture Diagram

```
                Docker Host
                     |
                Port 3001
                     |
                     v
          +----------------------+
          |   Docker Container   |
          |                      |
          |   Node.js + Express  |
          |       Port 3000      |
          |                      |
          +----------------------+
                     |
                     v
               Application
```

## 4. Dockerfile Configuration

The Dockerfile performs the following operations:

* Uses Node.js 22 as the base image.
* Creates `/app` as the working directory.
* Copies `package.json` and `package-lock.json`.
* Installs application dependencies.
* Copies the application source code.
* Exposes port `3000`.
* Starts the application using `node server.js`.

## 5. Port Mapping

The container application listens on port `3000`.

Because port `3000` on the host was already in use, the container was started using:

Host port: `3001`

Container port: `3000`

Therefore:

`localhost:3001 → container:3000`

## 6. Verification

The Docker image was successfully built as:

`journeybuddy-docker:latest`

The container was successfully started as:

`journeybuddy-container`

The container status was verified using `docker ps` and showed:

`Up`

The application was also successfully accessed through:

`http://localhost:3001`

The health endpoint returned:

`{"status":"healthy"}`

## 7. Conclusion

The Node.js application has been successfully containerized using Docker.

The Docker image contains the application runtime, dependencies, and source code required to run the application independently of the host Node.js environment.
