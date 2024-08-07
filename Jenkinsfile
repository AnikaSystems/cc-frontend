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

        stage('Test (jest)'){
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }

       stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv() {
                        sh 'npx sonarqube-scanner'
                    }
                }
            }
        }

        stage('Trivy Secret Scan') {
            steps {
                script {
                    echo "Run Trivy GitHub Repo Scanner"
                    def BRANCH_NAME = scm.branches[0].name
                    echo "Scanning on branch: ${BRANCH_NAME}"
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'GITHUB_PAT', usernameVariable: 'DUMMY_USER')]) {
                        sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -e GITHUB_TOKEN=${GITHUB_PAT} aquasec/trivy repo github.com/AnikaSystems/cc-frontend --branch ${BRANCH_NAME} --scanners secret"
                    }
                }
            }
        }

        stage('Selenium test') {
            steps {
                script {
                    // sh 'npm run test:e2e'
                    echo "Run Selenium test"
                }
            }

        }

        stage('archiving artifacts into AWS s3') {
            steps {
                script {
                    def BRANCH_NAME = scm.branches[0].name
                    echo "Building on branch: ${BRANCH_NAME}"

                    def s3path = "frontend/${BRANCH_NAME}/${env.BUILD_NUMBER}/"
                    echo "Pushing files to: ${s3path}"

                    withAWS(region:env.DEPLOY_REGION,credentials:"aws-rapid-jenkins-user") {
                        s3Delete(bucket:env.PIPELINE_BUCKET_NAME, path:s3path)
                        s3Upload(bucket:env.PIPELINE_BUCKET_NAME, workingDir:'build/', path:s3path, includePathPattern:'**/*');
                    }
                    
                }
                
                
            }
        }
    }
}