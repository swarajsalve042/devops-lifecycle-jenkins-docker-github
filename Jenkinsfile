pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = 'devops-lifecycle-demo'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Agent Preflight') {
            steps {
                sh '''
                    set -eu
                    command -v node
                    command -v npm
                    command -v docker
                    node --version
                    npm --version
                    docker --version
                    node -e "if (Number(process.versions.node.split('.')[0]) < 20) process.exit(1)"
                    docker info >/dev/null
                    echo "Agent preflight passed: Node.js 20+ and Docker daemon are available."
                '''
            }
        }

        stage('Install and Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed: tests passed and Docker image build succeeded.'
        }
        failure {
            echo 'Pipeline failed. Review the stage logs before retrying.'
        }
    }
}
