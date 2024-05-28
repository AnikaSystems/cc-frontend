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
                script {
                    def BRANCH_NAME = scm.branches[0].name
                    echo "Building on branch: ${BRANCH_NAME}"

                    def s3path = "${BRANCH_NAME}/"
                    echo "Pushing files to: ${s3path}"

                    withAWS(region:'us-east-1',credentials:env.PIPELINE_CREDENTIAL_NAME) {
                        s3Delete(bucket:env.FRONTEND_BUCKET_NAME, path:s3path)
                        s3Upload(bucket:env.FRONTEND_BUCKET_NAME, workingDir:'build/', path:s3path, includePathPattern:'**/*');
                }
                    
                }
                
                
            }
        }
    }
}