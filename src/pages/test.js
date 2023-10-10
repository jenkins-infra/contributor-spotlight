import React from "react"
import { Link, graphql } from "gatsby"

class IndexPage extends React.Component {
  render() {
    return (
      <>
        <ul>
          {this.props.data.allAsciidoc.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.fields.slug}>{node.document.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allAsciidoc {
      edges {
        node {
          id
          html
          document {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
