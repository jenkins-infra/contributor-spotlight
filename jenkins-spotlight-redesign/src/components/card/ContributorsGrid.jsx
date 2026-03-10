import { Container, Box } from "@mui/material";
import ContributorCard from "./ContributorCard";
import useContributors from "../../hooks/useContributors";

export default function ContributorsGrid({ search }) {

  const { contributors, loading, error } = useContributors();

  if (loading) return <p>Loading contributors...</p>;
  if (error) return <p>Failed to load contributors</p>;

  const filteredContributors = contributors.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #2b2b2b 0%, #1f1f1f 100%)",
        minHeight: "100vh",
        py: 10
      }}
    >
      <Container maxWidth="xl">

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 380px))",
            gap: "2rem",
            px: { xs: 4, sm: 8, md: 12 }
          }}
        >
          {filteredContributors.map((contributor) => (
            <ContributorCard
              key={contributor.github}
              contributor={contributor}
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
}