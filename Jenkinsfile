pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.24.0-focal' } }
   stages {
      stage('Clear test reports'){
         if (fileExists('playwright-report-chromium.tar.gz')) {
            new File('playwright-report-chromium.tar.gz').delete()
         }
         if (fileExists('playwright-report-firefox.tar.gz')) {
            new File('playwright-report-firefox.tar.gz').delete()
         }
         if (fileExists('playwright-report-webkit.tar.gz')) {
            new File('playwright-report-webkit.tar.gz').delete()
         }         
      }
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
                     archiveArtifacts 'playwright-report-chromium.tar.gz'
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
         }
      }
   }
}