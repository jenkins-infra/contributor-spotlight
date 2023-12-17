// Import React so that you can use JSX in HeadComponents
const React = require('react')

const HtmlAttributes = {
    lang: 'en',
}

const HeadComponents = [
    <React.Fragment key='head-1'>
        <script
            type='module'
            src='https://unpkg.com/@jenkinsci/jenkins-io-components?module'
        ></script>
        <script src='https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-loader.js'></script>
        <script src='https://unpkg.com/lit@2.4.0/polyfill-support.js'></script>
        <script
            data='ionicons'
            src='https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.esm.js'
            type='module'
        ></script>
        <script
            data='ionicons'
            noModule=''
            src='https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.js'
        ></script>
        <jio-navbar property='https://contributors.jenkins.io'></jio-navbar>
    </React.Fragment>,
]

const BodyAttributes = {}

const PostBodyComponents = [
    <React.Fragment key='body-1'>
        <script
            type='module'
            src='https://unpkg.com/@jenkinsci/jenkins-io-components?module'
        ></script>
        <jio-footer property='https://contributors.jenkins.io'></jio-footer>
    </React.Fragment>,
]

exports.onRenderBody = (
    {
        setHeadComponents,
        setHtmlAttributes,
        setBodyAttributes,
        setPostBodyComponents,
    },
    pluginOptions
) => {
    setHtmlAttributes(HtmlAttributes)
    setHeadComponents(HeadComponents)
    setBodyAttributes(BodyAttributes)
    setPostBodyComponents(PostBodyComponents)
}
