// On a pull request the preview should link at the branch it targets; the
// source branch may live in a fork and not exist in this repository.
def commonCustomEnvs = ["GITHUB_BRANCH=${env.CHANGE_ID ? env.CHANGE_TARGET : env.BRANCH_NAME}"]

buildWebsite([
  deployFolder: 'dist',
  customEnvsDevelopment: commonCustomEnvs,
  customEnvsProduction: commonCustomEnvs,
])
