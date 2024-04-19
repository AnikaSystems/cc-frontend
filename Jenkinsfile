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

        stage('Define Environment Variable') {
            steps {
                script {
                    // Define an environment variable within the step
                    env.REACT_APP_BASE_URL = 'https://cc-backend.15chdg4h24tne.us-east-1.cs.amazonlightsail.com/api'
                }
            }
        }

        stage('Build') { 
            steps {
                sh 'npm run build'
            }
        }
/* 
        stage('Test'){
             steps {
                sh 'echo "My variable value is $REACT_APP_BASE_URL"'
             }
        }
*/
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