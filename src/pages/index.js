import * as React from "react";
import "../../styles/index.css";
import {Box, Stack, Typography} from "@mui/material";
import {graphql, Link} from 'gatsby';

const IndexPage = (props) => {
  const { data } = props;
  console.log("edges", data.allAsciidoc.edges);
  const contributors = data.allAsciidoc.edges;
  const contributorCards = contributors.map((contributor, idx) => {
    if (contributor.node.pageAttributes.featured === 'false') {
    return (
      <Link to={contributor.node.fields.slug} style={{ textDecoration:'none', color: '#000000' }}>
        <Box
          padding={5}
          key={idx}
        >
          <Box>
            <img
              src={"avatar/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg"}
              alt={"Contributor avatar"}
              width={250}
              height={250}
              style={{objectFit: "cover", borderRadius: "50%"}}
            />
          </Box>
          <Box
            padding={3}
            display={"flex"}
            flexDirection={"column"}
            alignItems={'center'}
          >
            <Typography variant={"h6"}>{contributor.node.pageAttributes.name}</Typography>
            <Typography variant={"body2"}>{contributor.node.pageAttributes.pronouns}</Typography>
            <Typography variant={"body1"}>{contributor.node.pageAttributes.location}</Typography>
          </Box>
        </Box>
      </Link>
    )
  }});

  return (
    <main>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={'center'}
        justifyContent={'flex-start'}
        padding={10}
        sx={{
          backgroundImage: 'url("marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant={"h4"}><strong>Meet the driving forces behind Jenkins</strong></Typography>
        <Typography variant={"h4"}>as we showcase the top contributors shaping the</Typography>
        <Typography variant={"h4"}>future of continuous integration and delivery</Typography>
        <Box sx={{ paddingTop: 8 }}>
          <img src={'jenkins.png'} alt={"Jenkins logo"}/>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={'center'}
        justifyContent={'flex-start'}
        paddingTop={5}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
      >
        <Box
          sx={{
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <Typography variant={"h5"}><strong>Contributor Spotlight</strong></Typography>
        </Box>
        {contributors.map((contributor, idx) => {
        if (contributor.node.pageAttributes.featured === 'true') {
          return (
            <Link to={contributor.node.fields.slug} style={{ textDecoration:'none', color: '#000000' }}>
              <Stack
                id={"featured-contributor"}
                direction={"row"}
                minWidth={1100}
                height={500}
                padding={5}
                sx={{ borderRadius: 5, backgroundImage: "linear-gradient(180deg, #FFFFFF, #DAD1C6);" }}
                justifyContent={"flex-start"}
                alignItems={'center'}
                useFlexGap
                gap={2}
              >
                <Stack
                  id={"featured-contributor-avatar"}
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingTop={5}
                  paddingBottom={5}
                  paddingLeft={2}
                  paddingRight={2}
                >
                  <img src={"avatar/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg"}
                       alt={"Featured contributor avatar"}
                       width={350}
                       height={350}
                       style={{objectFit: "cover", borderRadius: "50%"}}
                  />
                </Stack>
                <Stack
                  id={"featured-contributor-info"}
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                  padding={5}
                >
                  <Box
                    marginTop={1}
                    marginBottom={1}
                  >
                    <Typography variant={"h4"}>{contributor.node.pageAttributes.name}</Typography>
                    <Typography variant={"h5"}>{contributor.node.pageAttributes.pronouns}</Typography>
                  </Box>

                  <Box
                    marginTop={1}
                    marginBottom={1}
                  >
                    <Typography variant={"h5"}>{contributor.node.pageAttributes.location}</Typography>
                    <Typography variant={"h5"}>First Commit: {contributor.node.pageAttributes.firstcommit}</Typography>
                  </Box>

                  <Box
                    marginTop={1}
                    marginBottom={1}
                  >
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        maxWidth: "450px",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {contributor.node.pageAttributes.intro}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Link>
          )
        }})}
        <Box
          id={"contributor-grid"}
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          paddingTop={5}
          paddingBottom={5}
        >
          {contributorCards}
        </Box>
      </Box>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Jenkins Contributor Spotlight</title>

export const pageQuery = graphql`
  query{
    allAsciidoc(
      limit: 30
    ) {
     edges {
      node {
        id
        html
        document {
          title
          main
        }
        fields {
          slug
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
  }
}
`
