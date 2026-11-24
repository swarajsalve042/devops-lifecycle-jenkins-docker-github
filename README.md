# DevOps Lifecycle Implementation

A beginner-friendly CI pipeline demonstrating the core DevOps workflow with **GitHub, Jenkins, Docker and a small Node.js application**.

## Project flow

1. Developer pushes code to GitHub.
2. Jenkins checks out the repository.
3. Jenkins installs the Node.js project and runs automated tests.
4. Jenkins builds a Docker image.
5. The image can later be published to a container registry as a separate, credential-protected stage.

## Repository structure

- `server.js` — Node.js HTTP application (port 3000)
- `server.test.js` — automated tests for the home page and health endpoint
- `package.json` — project scripts
- `Dockerfile` — container image instructions
- `Jenkinsfile` — Jenkins declarative pipeline
- `.dockerignore` — excludes unnecessary files from Docker build context

## Run locally (Node.js 20 or newer)

```bash
npm install
npm test
npm start
```

Open `http://localhost:3000` and `http://localhost:3000/health`.

## Build and run with Docker

```bash
docker build -t devops-lifecycle-demo:local .
docker run --rm -p 3000:3000 devops-lifecycle-demo:local
```

Then open `http://localhost:3000`.

## Jenkins setup

1. Use a Jenkins controller/agent with Node.js 20+ and Docker CLI/daemon available to the build agent.
2. Create a **Pipeline** job.
3. Select **Pipeline script from SCM**.
4. Choose **Git**, enter this repository URL: `https://github.com/swarajsalve042/devops-lifecycle-jenkins-docker-github.git`.
5. Set branch to `*/main` and script path to `Jenkinsfile`.
6. Save and run **Build Now**.
7. Verify that Checkout, Install and Test, and Build Docker Image stages succeed.

The Jenkinsfile builds the image locally on the Jenkins agent. It does not push to a registry or deploy to AWS.

## Verified GitHub Actions evidence

- [Node.js tests and Docker runtime validation](https://github.com/swarajsalve042/devops-lifecycle-jenkins-docker-github/actions/runs/45358590955) completed successfully.
- [Jenkinsfile Groovy syntax validation](https://github.com/swarajsalve042/devops-lifecycle-jenkins-docker-github/actions/runs/45362500114) completed successfully. This validates syntax only; it does not execute a Jenkins pipeline. The run installed dependencies, passed automated tests, built the Docker image, started the container, and verified `/health`.

This is GitHub Actions evidence; execution of the Jenkinsfile on a separate Jenkins controller/agent is not yet claimed.

## Current scope and next improvements

- Add a GitHub webhook or multibranch pipeline trigger.
- Add image publishing after configuring registry credentials securely in Jenkins.
- Add AWS CodeBuild as an optional comparison/extension.
- Add deployment only after selecting a target and reviewing its costs.

**Security:** Never commit passwords, access keys, tokens, or other secrets to this repository. Store credentials in Jenkins Credentials and reference them from the pipeline.
