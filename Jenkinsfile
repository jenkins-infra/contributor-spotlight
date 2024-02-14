pipeline {
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5')
  }

  agent {
    label 'node'
  }

  environment {
    TZ = 'UTC'
    // Amount of available vCPUs, to avoid OOM - https://www.gatsbyjs.com/docs/how-to/performance/resolving-out-of-memory-issues/#try-reducing-the-number-of-cores
    // https://github.com/jenkins-infra/jenkins-infra/tree/production/hieradata/clients/controller.ci.jenkins.io.yaml#L327
    GATSBY_CPU_COUNT = '4'
  }

  stages {
    stage('Check for typos') {
      steps {
        sh '''
        curl -qsL https://github.com/crate-ci/typos/releases/download/v1.5.0/typos-v1.5.0-x86_64-unknown-linux-musl.tar.gz | tar xvzf - ./typos
        curl -qsL https://github.com/halkeye/typos-json-to-checkstyle/releases/download/v0.1.1/typos-checkstyle-v0.1.1-x86_64 > typos-checkstyle && chmod 0755 typos-checkstyle
        ./typos --format json | ./typos-checkstyle - > checkstyle.xml || true
        '''
      }
      post {
        always {
          recordIssues(tools: [checkStyle(id: 'typos', name: 'Typos', pattern: 'checkstyle.xml')])
        }
      }
    }

    stage('Install dependencies') {
      environment {
        NODE_ENV = 'development'
      }
      steps {
        sh '''
        asdf install
        npm install
        '''
      }
    }

    stage('Build PR') {
      when { changeRequest() }
      environment {
        NODE_ENV = 'development'
      }
      steps {
        sh '''
        npm run info
        npm run build
        '''
      }
    }

    stage('Deploy PR to preview site') {
      when {
        allOf{
          changeRequest target: 'main'
          // Only deploy from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=true --siteName "contributor-spotlight" --title "Preview deploy for ${CHANGE_ID}" --alias "deploy-preview-${CHANGE_ID}" -d ./public'
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
        GATSBY_MATOMO_SITE_URL = 'https://jenkins-matomo.do.g4v.dev'
        GATSBY_MATOMO_SITE_ID = '4'
        STORAGE_APP = credentials('contributors-jenkins-io-fileshare-service-principal-writer')
        STORAGE_NAME = "contributorsjenkinsio"
        STORAGE_FILESHARE = "contributors-jenkins-io"
        STORAGE_PERMISSIONS = "dlrw"
      }
      steps {
        sh '''
        npm run build

        # Generate a SAS token with 10 minutes expiry date
        az login --service-principal --user "${STORAGE_APP_CLIENT_ID}" --password "${STORAGE_APP_CLIENT_SECRET}" --tenant "${STORAGE_APP_TENANT_ID}"
        expiry=$(date -u -d "$current_date + 10 minutes" +"%Y-%m-%dT%H:%MZ")
        base_url="https://${STORAGE_NAME}.file.core.windows.net/${STORAGE_FILESHARE}"

        # Don't show the command using the token
        set +x
        token=$(az storage share generate-sas \
          --name "${STORAGE_FILESHARE}" \
          --account-name "${STORAGE_NAME}" \
          --https-only \
          --permissions "${STORAGE_PERMISSIONS}" \
          --expiry "${expiry}" \
          --only-show-errors)
        az logout
        url="${base_url}?$(echo ${token} | sed 's/\"//g')"

        # Synchronize the File Share content
        echo "INFO: Synchronizing ${base_url}..."
        azcopy sync --recursive=true --delete-destination=true ./public/ "$url"
        set +x

        echo 'INFO: deployment completed.'
        '''
      }
    }
  }
}
