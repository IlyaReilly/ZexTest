pipeline {
   agent { node { label 'tse-agent-latest' } }
   parameters {
      string defaultValue: '', description: 'Environment URL for running tests', name: 'STAGING'
      string defaultValue: '', description: 'Domain for test user accounts', name: 'DOMAIN'
    }
   stages {
      stage('Clear test reports'){
         steps {
            sh(""" rm -rf $WORKSPACE/allure-results """)
         }
      }
      stage('e2e-tests'){
         parallel {
            stage('webkit') {
               steps {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="webkit"'
               }
               post {
                  always {
                     allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                  }
                  failure {
                     sh 'tar -czvf index-webkit.tar.gz playwright-report/index.html'
                     archiveArtifacts 'index-webkit.tar.gz'
                     emailext attachmentsPattern: 'index-webkit.tar.gz', body: '$DEFAULT_CONTENT', recipientProviders: [requestor()], subject: "Webkit tests", to: "autotests.reports@zextras.com"                     
                  }
               }
            }
            stage('chromium') {
               steps {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="chromium"'
               }
               post {
                  always {
                     allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                  }
                  failure {
                     sh 'tar -czvf index-chromium.tar.gz playwright-report/index.html'
                     archiveArtifacts 'index-chromium.tar.gz'
                     emailext attachmentsPattern: 'index-chromium.tar.gz', body: '$DEFAULT_CONTENT', recipientProviders: [requestor()], subject: "Chromium tests", to: "autotests.reports@zextras.com"
                  }
               }
            }
            stage('firefox') {
               steps {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="firefox"'
               }
               post {
                  always {
                     allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                  }
                  failure {
                     sh 'tar -czvf index-firefox.tar.gz playwright-report/index.html'
                     archiveArtifacts 'index-firefox.tar.gz'
                     emailext attachmentsPattern: 'index-firefox.tar.gz', body: '$DEFAULT_CONTENT', recipientProviders: [requestor()], subject: "Firefox tests", to: "autotests.reports@zextras.com"                     
                  }
               }
            }
         }
      }
   }
}