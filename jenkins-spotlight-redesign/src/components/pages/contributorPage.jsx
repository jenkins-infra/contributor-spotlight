import { useState } from "react";
import ContributorSpotlight from "../card/ContributorSpotlight";
import ContributorsGrid from "../card/ContributorsGrid";

export default function ContributorsPage() {
    
  const [search, setSearch] = useState("");

  return (
    <>
      <ContributorSpotlight search={search} setSearch={setSearch} />
      <ContributorsGrid search={search} />
    </>
  );
}