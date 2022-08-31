pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.24.0-focal' } }
   stages {
      stage('e2e-tests'){
         parallel {
            stage('chromium') {
               steps {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="chromium"'
               }
               post {
                  always {
                     sh 'tar -czvf playwright-report-chromium.tar.gz playwright-report'
                     archiveArtifacts artifacts: 'playwright-report.tar.gz'
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
                     archiveArtifacts artifacts: 'playwright-report.tar.gz'
                  }
               }
            }
            stage('webkit') {
               steps {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="webkit"'
               }
               post {
                  always {
                     sh 'tar -czvf playwright-report-webkit.tar.gz playwright-report'
                     archiveArtifacts artifacts: 'playwright-report.tar.gz'
                  }
               }
            }
         }
      }
   }
}