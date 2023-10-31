import React from "react"
import {graphql, Link} from "gatsby"
import {Box, IconButton, Stack, Typography} from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/contributor-details.css";

class ContributorDetails extends React.Component {
  render() {
    return (
      <Box
        padding={0}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={'center'}
          justifyContent={'center'}
          padding={10}
          sx={{
            backgroundImage: 'url("../../../marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box sx={{ paddingTop: 8 }}>
            <img src={"../../../" + this.props.data.asciidoc.pageAttributes.image}
                 alt={"Contributor avatar"}
                 width={350}
                 height={350}
                 style={{objectFit: "cover", borderRadius: "50%"}}
            />
          </Box>
        </Box>
        <Box padding={'32px 160px'}>
          <Link style={{ textDecoration: `none` }} to="/">
            <Stack direction={"row"} gap={1}>
              <ArrowBackIcon />
              <Typography>Back to Spotlight</Typography>
            </Stack>
          </Link>
          <Box sx={{paddingBottom: 2}}>
            <Typography variant="h5" fontweight={500} textAlign={"center"}>
              Contributor Spotlight
            </Typography>
          </Box>
          <Box sx={{paddingBottom: 1.5}}>
            <Typography variant="h4" fontWeight={700} textAlign={"center"} color={"#0096FF"}>
              {this.props.data.asciidoc.document.title}
            </Typography>
            <Typography variant={"h5"} textAlign={"center"} color={"#0096FF"}>
              {this.props.data.asciidoc.pageAttributes.pronouns ?? "They/them"}
            </Typography>
          </Box>
          <Box sx={{paddingBottom: 1.5}}>
            <Typography variant={"h6"} textAlign={"center"}>
              {this.props.data.asciidoc.pageAttributes.location ?? "World"}
            </Typography>
            <Typography variant={"h6"} textAlign={"center"}>
              {"First Commit: " + this.props.data.asciidoc.pageAttributes.firstcommit ?? "Unknown"}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={1} sx={{paddingBottom: 2}}>
            <Link to={`https://www.linkedin.com/in/${this.props.data.asciidoc.pageAttributes.linkedin}`}><LinkedInIcon /></Link>
            <Link to={`https://twitter.com/${this.props.data.asciidoc.pageAttributes.twitter}`}><TwitterIcon /></Link>
            <Link to={`https://github.com/${this.props.data.asciidoc.pageAttributes.github}`}><GitHubIcon /></Link>
            <Link to={`mailto:${this.props.data.asciidoc.pageAttributes.email}`}><AlternateEmailIcon /></Link>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography>{this.props.data.asciidoc.pageAttributes.intro}</Typography>
          </Box>
          <Box
            dangerouslySetInnerHTML={{ __html: this.props.data.asciidoc.html }}
          />
        </Box>
      </Box>
    )
  }
}

export default ContributorDetails

export const pageQuery = graphql`
  query($id: String!) {
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
        subtitle
        main
      }
      pageAttributes {
        name
        pronouns
        location
        firstcommit
        linkedin
        twitter
        github
        email
        image
        featured
        intro
      }
    }
  }
`
