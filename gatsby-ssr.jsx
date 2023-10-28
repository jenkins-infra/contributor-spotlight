// Import React so that you can use JSX in HeadComponents
const React = require("react")

const HtmlAttributes = {
  lang: "en"
}

const HeadComponents = [
  <React.Fragment key="head-1">
    <script type="module" src="https://unpkg.com/@jenkinsci/jenkins-io-components?module"></script>
    <jio-navbar></jio-navbar>
  </React.Fragment>
]

const BodyAttributes = {

}

const PostBodyComponents = [
  <React.Fragment key="body-1">
    <script type="module" src="https://unpkg.com/@jenkinsci/jenkins-io-components?module"></script>
    <jio-footer></jio-footer>
  </React.Fragment>
]

exports.onRenderBody = ({
                          setHeadComponents,
                          setHtmlAttributes,
                          setBodyAttributes,
                          setPostBodyComponents,
                        }, pluginOptions) => {
  setHtmlAttributes(HtmlAttributes)
  setHeadComponents(HeadComponents)
  setBodyAttributes(BodyAttributes)
  setPostBodyComponents(PostBodyComponents)
}
