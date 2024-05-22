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
                withAWS(region:'us-east-1',credentials:'aws-mo') {
                    s3Delete(bucket:'cc-case-management-mo-0445', path:'/')
                    s3Upload(bucket:"cc-case-management-mo-0445", workingDir:'build/', includePathPattern:'**/*');
                }
            }
        }
    }
}