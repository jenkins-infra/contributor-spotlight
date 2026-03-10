import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const footerData = {
  resources: [
    "Downloads",
    "Blog",
    "Documentation",
    "Plugins",
    "Security",
    "Contributing",
  ],
  project: [
    "Structure and governance",
    "Issue tracker",
    "Roadmap",
    "GitHub",
    "Jenkins on Jenkins",
    "Statistics",
  ],
  community: [
    "Forum",
    "Events",
    "Mailing lists",
    "Chats",
    "Special Interest Groups",
    "X (formerly Twitter)",
    "LinkedIn",
    "Bluesky",
    "Mastodon",
    "Youtube",
    "Reddit",
  ],
  other: [
    "Code of Conduct",
    "Press information",
    "Merchandise",
    "Artwork",
    "Awards",
  ],
};

const FooterColumn = ({ title, items }) => (
  <Box>
    <Box
      sx={{
        borderTop: "2px solid rgba(255,255,255,0.7)",
        width: "80%",
        mb: 2,
      }}
    />
    <Typography
      sx={{
        fontSize: "20px",
        fontWeight: 600,
        mb: 1.5,
      }}
    >
      {title}
    </Typography>

    {items.map((item, index) => (
      <Typography
        key={index}
        sx={{
          fontSize: "15px",
          mb: 0.8,
        }}
      >
        <Link
          href="#"
          underline="none"
          color="inherit"
          sx={{
            opacity: 0.9,
            "&:hover": { opacity: 1, textDecoration: "underline" },
          }}
        >
          {item}
        </Link>
      </Typography>
    ))}
  </Box>
);

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2f7ea1",
        color: "white",
        pt: 8,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* License Section */}
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <img
                src="https://licensebuttons.net/l/by-sa/4.0/88x31.png"
                alt="Creative Commons"
                style={{ marginBottom: "12px" }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "15px",
                lineHeight: 1.6,
                maxWidth: "260px",
              }}
            >
              The content driving this site is licensed under the Creative
              Commons Attribution-ShareAlike 4.0 license.
            </Typography>
          </Grid>

          {/* Footer Columns */}
          <Grid item xs={6} md={2}>
            <FooterColumn title="Resources" items={footerData.resources} />
          </Grid>

          <Grid item xs={6} md={2}>
            <FooterColumn title="Project" items={footerData.project} />
          </Grid>

          <Grid item xs={6} md={2}>
            <FooterColumn title="Community" items={footerData.community} />
          </Grid>

          <Grid item xs={6} md={2}>
            <FooterColumn title="Other" items={footerData.other} />
          </Grid>
        </Grid>

        {/* Bottom copyright */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "14px",
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Copyright © 2026 CD Foundation The Linux Foundation®. All rights
            reserved. The Linux Foundation has registered trademarks and uses
            trademarks. Linux is a registered trademark of Linus Torvalds.
            Privacy Policy and Terms of Use.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}