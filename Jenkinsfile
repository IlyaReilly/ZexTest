pipeline {
   agent { node { label 'tse-agent-latest' } }
   parameters {
      string defaultValue: '', description: 'Environment URL for running tests', name: 'STAGING'
      string defaultValue: '', description: 'Domain for test user accounts', name: 'DOMAIN'
      string defaultValue: '', description: 'Suite for running tests', name: 'SUITE'
    }
   stages {
      stage('Clear test reports'){
         steps {
            sh(""" rm -rf $WORKSPACE/allure-results """)
            sh(""" rm -rf $WORKSPACE/allure-report """)
         }
      }
      stage('Installation'){
         steps {
            sh 'npm install'
            sh 'npx playwright install'
         }
      }
      stage('e2e-tests'){
         parallel {
            stage('webkit') {
               steps {
                  catchError(stageResult: 'FAILURE') {
                     sh  """ npx playwright test --project="webkit" ./TestsLogic/UITests $SUITE """
                  }
               }
            }
            stage('chromium') {
               steps {
                  catchError(stageResult: 'FAILURE') {
                     sh  """ npx playwright test --project="chromium" ./TestsLogic/UITests $SUITE """
                  }
               }
            }
            stage('firefox') {
               steps {
                  catchError(stageResult: 'FAILURE') {
                     sh  """ npx playwright test --project="firefox" ./TestsLogic/UITests $SUITE """
                  }
               }
            }
            stage('admin-tests') {
               stages {
                 stage('webkit') {
                     steps {
                        catchError(stageResult: 'FAILURE') {
                           sh  """ npx playwright test --workers=1 --project="webkit" ./TestsLogic/AdminUITests $SUITE """
                        }
                     }
                  }
                 stage('chromium') {
                     steps {
                        catchError(stageResult: 'FAILURE') {
                           sh  """ npx playwright test --workers=1 --project="chromium" ./TestsLogic/AdminUITests $SUITE """
                        }
                     }
                  }
                 stage('firefox') {
                     steps {
                        catchError(stageResult: 'FAILURE') {
                           sh  """ npx playwright test --workers=1 --project="firefox" ./TestsLogic/AdminUITests $SUITE """
                        }
                     }
                  }
               }
            }
         }
      }
      stage('Test reports') {
         steps {
            allure([includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]])
         }
      }
   }
   post {
      failure {
         emailext body: """<p>Check report at <a href='${env.BUILD_URL}'>${env.JOB_NAME} #${env.BUILD_NUMBER}</a></p>""", recipientProviders: [requestor()], subject: "Allure Report", to: "autotests.reports@zextras.com"
      }
   }
}