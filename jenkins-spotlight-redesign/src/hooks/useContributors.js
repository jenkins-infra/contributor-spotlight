import { useEffect, useState } from "react";
import contributorsData from "../data/contributors.json";

export default function useContributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/jenkinsci/jenkins/contributors"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const githubData = await response.json();

        const merged = githubData.map((user) => {
          const meta = contributorsData.find(
            (c) => c.github === user.login
          );

          return {
            id: user.id,
            name: meta?.name || user.login,
            avatar: user.avatar_url,
            github: user.html_url,
            contributions: user.contributions,

            location: meta?.location || null,
            pronouns: meta?.pronouns || null,
            date: meta?.datepublished || null,
            intro: meta?.intro || null
          };
        });

        setContributors(merged);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return { contributors, loading, error };
}