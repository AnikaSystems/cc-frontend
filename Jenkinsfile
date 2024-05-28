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
                def BRANCH_NAME = scm.branches[0].name
                echo "Building on branch: ${BRANCH_NAME}"
                withAWS(region:'us-east-1',credentials:env.PIPELINE_CREDENTIAL_NAME) {
                    s3Delete(bucket:env.FRONTEND_BUCKET_NAME, path:'${BRANCH_NAME}/')
                    s3Upload(bucket:env.FRONTEND_BUCKET_NAME, workingDir:'build/', path:'${BRANCH_NAME}/', includePathPattern:'**/*');
                }
            }
        }
    }
}