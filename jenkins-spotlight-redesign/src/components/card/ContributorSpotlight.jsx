import React from "react";
import { Box, Container, Typography, TextField, InputAdornment, Avatar} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ContributorSpotlight({ search, setSearch }) {

  const contributor = {
    name: "Allan Burdajewicz",
    location: "Queensland, Australia",
    date: "2025-08-28",
    firstCommit: "2013",
    avatar: "https://avatars.githubusercontent.com/u/583231?v=4",
    bio: `Allan Burdajewicz was originally born in the French countryside and is currently a Software/Systems Engineer located in Queensland, Australia. While he did a lot of development early on in his career, he became curious about areas outside of development. This led to quickly taking part in other aspects of the software development lifecycle (SDLC). Nowadays, he enjoys being involved in the whole lifecycle, mainly in a containerized environment, from tools development, to CI/CD, to deployment automation, and monitoring.`
  };

  return (
    <Box
      sx={{
        background: "#2b2b2b",
        color: "white",
        py: 10
      }}
    >
      <Container maxWidth="lg">

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          align="center"
          sx={{ mb: 4 }}
        >
          Contributor Spotlight
        </Typography>

        {/* Search */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
        <TextField
          placeholder="[Ctrl + K] Search contributors..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: "100%", md: "500px" },
            background: "#1e1e1e",
            borderRadius: "30px",
        
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              color: "white"
            },
        
            "& fieldset": {
              borderColor: "#444"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#aaa" }} />
              </InputAdornment>
            )
          }}
        />
        </Box>

        {/* Featured Contributor */}
        <Box
          sx={{
            background: "#121212",
            borderRadius: "20px",
            padding: { xs: 4, md: 6 },
            maxWidth: "850px",
            mx: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
          }}
        >

          {/* Name */}
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            sx={{ mb: 3 }}
          >
            {contributor.name}
          </Typography>

          {/* Metadata */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              color: "#bbb",
              flexWrap: "wrap",
              mb: 4
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ color: "#ff4f7a", fontSize: 18 }} />
              <Typography variant="body2">
                Location: {contributor.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                Date Published: {contributor.date}
              </Typography>
            </Box>

            <Typography variant="body2">
              • First Commit: {contributor.firstCommit}
            </Typography>
          </Box>

          {/* Bio Layout */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center"
            }}
          >

            {/* Avatar */}
            <Avatar
              src={contributor.avatar}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid rgba(255,255,255,0.15)"
              }}
            />

            {/* Bio */}
            <Box
              sx={{
                borderLeft: "4px solid #ffd84d",
                paddingLeft: 3,
                background:
                  "linear-gradient(90deg, rgba(255,215,0,0.1), transparent)",
                borderRadius: "10px"
              }}
            >
              <Typography
                sx={{
                  color: "#d7d7d7",
                  lineHeight: 1.7
                }}
              >
                {contributor.bio}
              </Typography>
            </Box>

          </Box>

        </Box>

      </Container>
    </Box>
  );
}