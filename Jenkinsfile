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
                sh 'NODE_OPTIONS=--openssl-legacy-provider npm run build'
            }
        }
        // stage('Test'){
        //     steps {
        //         // Run frontend tests
        //     }
        // }
        stage('archiving artifacts into AWS s3') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'aws-credentials') {
                    s3Upload(bucket: 'cc-case-management', path: '/*')
                    s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'index.html', bucket:'cc-case-management')
                }
            }
        }
    }
}