pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
         stage('Clone repository') { 
            steps { 
                script{
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
                withAWS(region:'us-east-1',credentials:$PIPELINE_CREDENTIAL_NAME) {
                    s3Delete(bucket:$FRONTEND_BUCKET_NAME, path:'/')
                    s3Upload(bucket:$FRONTEND_BUCKET_NAME, workingDir:'build/', includePathPattern:'**/*');
                }
            }
        }
    }
}