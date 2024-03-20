pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
         stage('Clone repository') { 
            steps { 
                script{
                checkout scm
                }
            }
        }
        
        stage('Build') { 
            steps { 
                script{
                 sh 'NODE_OPTIONS=--openssl-legacy-provider npm start'
                }
            }
        }
        // stage('Test'){
        //     steps {
        //         // Run frontend tests
        //     }
        // }
    }
}