import * as React from "react";
import "../../styles/index.css";
import {Box, Typography} from "@mui/material";

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


  const contributorCards = [
    ...Array(25).fill(contributorCard()).map((card, index) => {
    return (
      <React.Fragment key={index}>
        {card}
      </React.Fragment>
      )
    }).slice(0, 24),
      <React.Fragment key={"blank"}>
        <Box
          padding={5}
        >
          <Box>
            {" "}
          </Box>
        </Box>
      </React.Fragment>,
      ...Array(25).fill(contributorCard()).map((card, index) => {
        return (
          <React.Fragment key={index}>
            {card}
          </React.Fragment>
        )
      }).slice(24, 25)
  ]

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
        <Box
          id={"contributor-grid"}
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
        >
          {contributorCards}
        </Box>
      </Box>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Jenkins Contributor Spotlight</title>
