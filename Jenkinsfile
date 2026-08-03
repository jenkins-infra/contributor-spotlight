// Do not trigger daily if not on the principal branch (e.g. not on PR, not on other branches, not on tags)
final String cronPattern = env.BRANCH_IS_PRIMARY ? '@daily' : ''

pipeline {
  triggers {
    cron(cronPattern)
  }
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5')
  }

  agent {
    label 'maven-25'
  }

  environment {
    TZ = 'UTC'
  }

  stages {
    stage('Check for typos') {
      steps {
        sh './typos --format sarif > typos.sarif || true'
      }
      post {
        always {
          recordIssues(tools: [sarif(id: 'typos', name: 'Typos', pattern: 'typos.sarif')])
        }
      }
    }

    stage('Check Tooling') {
      steps {
        sh '''
        node --version
        npm --version
        '''
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build PR') {
      when { changeRequest() }
      environment {
        NODE_ENV = 'development'
      }
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy PR to preview site') {
      when {
        allOf{
          changeRequest target: 'gsoc-2026-revamp'
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=true --siteName "contributor-spotlight" --title "Preview deploy for ${CHANGE_ID}" --alias "deploy-preview-${CHANGE_ID}" -d ./dist'
      }
      post {
        success {
          recordDeployment('jenkins-infra', 'contributor-spotlight', pullRequest.head, 'success', "https://deploy-preview-${CHANGE_ID}--contributor-spotlight.netlify.app")
        }
        failure {
          recordDeployment('jenkins-infra', 'contributor-spotlight', pullRequest.head, 'failure', "https://deploy-preview-${CHANGE_ID}--contributor-spotlight.netlify.app")
        }
      }
    }

    stage('Deploy to production') {
      when {
        allOf{
          expression { env.BRANCH_IS_PRIMARY }
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NODE_ENV = 'production'
        VITE_MATOMO_SITE_URL = 'https://jenkins-matomo.do.g4v.dev'
        VITE_MATOMO_SITE_ID = '4'
      }
      steps {
        script {
          infra.withFileShareServicePrincipal([
            servicePrincipalCredentialsId: 'contributors-jenkins-io-fileshare-service-principal-writer',
            fileShare: 'contributors-jenkins-io',
            fileShareStorageAccount: 'contributorsjenkinsio'
          ]) {
            sh '''
            npm run build

            # Synchronize the File Share content
            set +x
            azcopy sync \
              --skip-version-check \
              --recursive=true \
              --delete-destination=true \
              ./dist/ "${FILESHARE_SIGNED_URL}"
            '''
          }
        }
      }
    }

    stage('Publish build report') {
      steps {
        publishBuildStatusReport()
      }
    }
  }
}
