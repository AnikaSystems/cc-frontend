pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
         stage('Clone repository') { 
            steps { 
                script{
                def BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                echo "Building on branch: \${BRANCH_NAME}"
                checkout scm
                }
            }
        }
        
        stage('Download dependencies') { 
            steps { 
                sh 'npm install'
            }
        }

        stage('Build') { 
            steps {
                sh 'npm run build'
            }
        }

        stage('archiving artifacts into AWS s3') {
            steps {
                withAWS(region:'us-east-1',credentials:env.PIPELINE_CREDENTIAL_NAME) {
                    s3Delete(bucket:env.FRONTEND_BUCKET_NAME, path:'${BRANCH_NAME}/')
                    s3Upload(bucket:env.FRONTEND_BUCKET_NAME, workingDir:'build/', path:'${BRANCH_NAME}/', includePathPattern:'**/*');
                }
            }
        }
    }
}