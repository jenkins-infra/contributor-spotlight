import {Card,Typography,Avatar,Box,IconButton,Tooltip,Chip} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function ContributorCard({ contributor }) {

  const avatar = contributor.avatar || contributor.avatar_url;
  const name = contributor.name || contributor.login;
  const github = contributor.github || contributor.html_url;
  const linkedin = contributor.linkedin;
  const twitter = contributor.twitter;
 
  return (
    <Card
      sx={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        borderRadius: "20px",
        p: "2rem",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        textAlign: "center",
        cursor: "pointer",

        transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.1)",

        position: "relative",
        overflow: "hidden",

        minHeight: "380px",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
        }
      }}
    >

      {/* Avatar */}
      <Avatar
        src={avatar}
        sx={{
          width: 200,
          height: 200,
          mb: 2,
          border: "4px solid rgba(255,255,255,0.15)"
        }}
      />

      {/* Name */}
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 600,
          fontSize: 20
        }}
      >
        {name}
      </Typography>

      {/* Location */}
      {contributor.location && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
            color: "#bdbdbd"
          }}
        >
          <LocationOnIcon sx={{ fontSize: 16, color: "#ff4f7a" }} />
          {contributor.location}
        </Box>
      )}

      {/* Meta badges */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        {contributor.date && (
          <Chip
            icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
            label={contributor.date}
            sx={{
              background: "rgba(255,255,255,0.06)",
              color: "#d0d0d0"
            }}
          />
        )}

        {contributor.pronouns && (
          <Chip
            label={contributor.pronouns}
            sx={{
              background: "rgba(255,255,255,0.06)",
              color: "#d0d0d0"
            }}
          />
        )}

      </Box>

      {/* GitHub */}
<Box
  sx={{
    mt: "auto",
    pt: 3,
    display: "flex",
    gap: 2
  }}
>
  {/* GitHub */}
  {github && (
    <Tooltip title="GitHub">
      <IconButton
        href={github}
        target="_blank"
        sx={{
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: 46,
          height: 46,
          "&:hover": {
            background: "rgba(255,255,255,0.1)"
          }
        }}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  )}

  {/* Twitter */}
  {twitter && (
    <Tooltip title="Twitter">
      <IconButton
        href={twitter}
        target="_blank"
        sx={{
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: 46,
          height: 46,
          "&:hover": {
            background: "rgba(255,255,255,0.1)"
          }
        }}
      >
        <TwitterIcon />
      </IconButton>
    </Tooltip>
  )}

  {/* LinkedIn */}
  {linkedin && (
    <Tooltip title="LinkedIn">
      <IconButton
        href={linkedin}
        target="_blank"
        sx={{
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: 46,
          height: 46,
          "&:hover": {
            background: "rgba(255,255,255,0.1)"
          }
        }}
      >
        <LinkedInIcon />
      </IconButton>
    </Tooltip>
  )}
</Box>

    </Card>
  );
}