import * as React from "react";
import "../../styles/index.css";
import {Box, Stack, Typography} from "@mui/material";

const IndexPage = () => {
  const contributorCard = () => {
    return (
      <Box
        padding={5}
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
          <Typography variant={"h6"}>FirstName LastName</Typography>
          <Typography variant={"body2"}>They/them</Typography>
          <Typography variant={"body1"}>Somewhere, World</Typography>
        </Box>
      </Box>
    )
  }


  const ContributorCards = Array(12).fill(contributorCard()).map((card, idx) => {
    return (
      <React.Fragment key={idx}>
        {card}
      </React.Fragment>
    )
  });

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
        <Typography variant={"h4"}>as we showcase the top 25 contributors shaping the</Typography>
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
        <Typography variant={"h5"}><strong>Contributor Spotlight</strong></Typography>
        <Stack
          id={"featured-contributor"}
          direction={"row"}
          minWidth={1000}
          maxWidth={1200}
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
              <Typography variant={"h4"}>Sarah Jenkins</Typography>
              <Typography variant={"h5"}>They/them</Typography>
            </Box>

            <Box
              marginTop={1}
              marginBottom={1}
            >
              <Typography variant={"h5"}>San Francisco, USA</Typography>
              <Typography variant={"h5"}>First Commit: June 2018</Typography>
            </Box>

            <Box
              marginTop={1}
              marginBottom={1}
            >
              <Typography
                sx={{
                  display: '-webkit-box',
                  maxWidth: "400px",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box
          id={"contributor-grid"}
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          paddingTop={5}
          paddingBottom={5}
        >
          {ContributorCards}
        </Box>
      </Box>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Jenkins Contributor Spotlight</title>
