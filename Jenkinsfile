pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.24.0-focal' } }
   stages {
      stage('Clear test reports'){
         steps {
            sh(""" rm -rf "playwright-report-chromium.tar.gz" """)
            sh(""" rm -rf "playwright-report-firefox.tar.gz" """)
            sh(""" rm -rf "playwright-report-webkit.tar.gz" """)
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
                     sh 'tar -czvf playwright-report-webkit.tar.gz playwright-report'
                     archiveArtifacts 'playwright-report-webkit.tar.gz'
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
                     sh 'tar -czvf playwright-report-chromium.tar.gz playwright-report'
                     archiveArtifacts 'playwright-report-chromium.tar.gz'
                     failure {
                        emailext attachmentsPattern: '**/playwright-report-chromium.tar.gz', body: '$DEFAULT_CONTENT', recipientProviders: [requestor()], subject: 'Сhromium tests', to: "andrei.artsiukouski@zextras.com"
                     }
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
                     sh 'tar -czvf playwright-report-firefox.tar.gz playwright-report'
                     archiveArtifacts 'playwright-report-firefox.tar.gz'
                  }
               }
            }
         }
      }
   }
}