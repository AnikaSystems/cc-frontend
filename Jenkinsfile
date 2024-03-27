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
                sh "aws configure set region $AWS_DEFAULT_REGION" 
                sh "aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID"  
                sh "aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY"
                sh "aws s3 cp build/* s3://cc-case-management"
            }
        }
    }
}