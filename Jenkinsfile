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
                sh 'npm install'
            }
        }
        // stage('Test'){
        //     steps {
        //         // Run frontend tests
        //     }
        // }
    }
}