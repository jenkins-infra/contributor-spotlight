// Import React so that you can use JSX in HeadComponents
const React = require("react")

const HtmlAttributes = {
  lang: "en"
}

const HeadComponents = [
  <>
    <script type="module" src="https://unpkg.com/@jenkinsci/jenkins-io-components?module"></script>
    <jio-navbar></jio-navbar>
  </>
]

const BodyAttributes = {

}

const PostBodyComponents = [
  <>
    <script type="module" src="https://unpkg.com/@jenkinsci/jenkins-io-components?module"></script>
    <jio-footer></jio-footer>
  </>
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
