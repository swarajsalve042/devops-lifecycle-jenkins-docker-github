# Jenkins execution runbook

Repository: https://github.com/swarajsalve042/devops-lifecycle-jenkins-docker-github

## Purpose

Execute the Jenkins Declarative Pipeline on a real Jenkins controller and build agent. GitHub Actions separately validates application behavior, Docker runtime, and Jenkinsfile Groovy syntax; it does not run Jenkins itself.

## Prerequisites

- Jenkins 2.x or later.
- Jenkins Pipeline and Git plugins.
- A Linux build agent with Node.js 20+, npm, Docker CLI, and access to a running Docker daemon.
- The Jenkins agent account must have approved access to the Docker daemon.

The Jenkinsfile runs an Agent Preflight stage before installation. It checks required commands, Node.js 20+, Docker CLI, and Docker daemon connectivity.

## Configure the job

1. Create a Jenkins **Pipeline** job.
2. Choose **Pipeline script from SCM** and select **Git**.
3. Repository URL: `https://github.com/swarajsalve042/devops-lifecycle-jenkins-docker-github.git`.
4. Branch specifier: `*/main`.
5. Script path: `Jenkinsfile`.
6. Save, select **Build Now**, and inspect **Console Output**.

## Expected result

The stages Checkout, Agent Preflight, Install and Test, and Build Docker Image should pass. The resulting local image is `devops-lifecycle-demo:<BUILD_NUMBER>` on the Jenkins agent.

This pipeline does not push an image to a registry or deploy to AWS.

## Completion evidence

Capture the Jenkins build URL, build number, and successful stage/console output. Do not mark live Jenkins execution complete based only on GitHub Actions Groovy parsing.

## Troubleshooting

- Install Node.js 20+ and Docker CLI on the build agent, not just on the controller.
- Ensure the Jenkins service account has approved Docker daemon access.
- Confirm GitHub connectivity from the agent.
- This public repository requires no GitHub token for read-only checkout.
