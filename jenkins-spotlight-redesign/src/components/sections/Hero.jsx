import { Box, Typography, Container } from "@mui/material";
import heroBg from "../../assets/image.png";
import jenkinsLogo from "../../assets/jenkins.png";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        backgroundImage:
          `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 4,
      }}
    >

    <Typography
  sx={{
    fontSize: { xs: "32px", md: "42px" },   
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "center",
    maxWidth: "900px",
    mx: "auto"
  }}
>
  Meet the driving forces behind Jenkins
</Typography>

<Typography
  sx={{
    fontSize: { xs: "32px", md: "42px" },
    mt: 2,
    lineHeight: 1.6,
    textAlign: "center",
    maxWidth: "1200px",   
    mx: "auto"
  }}
>
  as we showcase the top contributors shaping the future of
  continuous integration and delivery
</Typography>

        {/* Jenkins Mascot */}
        <Box
          component="img"
          src={jenkinsLogo}
          alt="jenkins"
          sx={{
            width: 180,
            mt: 6
          }}
        />
    </Box>
  );
}