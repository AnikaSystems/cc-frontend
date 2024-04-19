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
                sh 'export REACT_APP_BASE_URL=https://cc-backend.15chdg4h24tne.us-east-1.cs.amazonlightsail.com/api'
                sh 'npm run build'
            }
        }
        // stage('Test'){
        //     steps {
        //         // Run frontend tests
        //     }
        // }
        stage('archiving artifacts into AWS s3') {
            steps {
                withAWS(region:'us-east-1',credentials:'aws-mo') {
                    s3Delete(bucket:'cc-case-management', path:'/')
                    s3Upload(bucket:"cc-case-management", workingDir:'build/', includePathPattern:'**/*');
                }
            }
        }
    }
}