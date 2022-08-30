pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.24.0-focal' } }
   stages {
      stage('e2e-tests') {
         steps {
            parallel(
               chromium: {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="chromium"'
               },
               firefox: {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="firefox"'
               },
               webkit: {
                  sh 'npm install'
                  sh 'npx playwright install'
                  sh 'npx playwright test --project="webkit"'
               }
            )
         }
      }
   }
   post {
      always {
         archiveArtifacts artifacts: 'playwright-report/**.*'
      }
   }
}