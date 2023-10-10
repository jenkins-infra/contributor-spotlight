import { Box, Typography } from "@mui/material"
import React from 'react'
import typography from "../utils/typography"
import { Link } from "gatsby";
const { rhythm } = typography

class DefaultLayout extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: `0 auto`,
          marginTop: rhythm(1.5),
          marginBottom: rhythm(1.5),
          maxWidth: 650,
          paddingLeft: rhythm(3 / 4),
          paddingRight: rhythm(3 / 4),
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default DefaultLayout
