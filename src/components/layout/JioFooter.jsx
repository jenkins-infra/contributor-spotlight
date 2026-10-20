function JioFooter({ property, sourcePath, githubRepo, githubBranch }) {
  return (
    <jio-footer
      property={property}
      sourcePath={sourcePath ?? ''}
      githubRepo={sourcePath ? githubRepo : undefined}
      githubBranch={sourcePath ? githubBranch : undefined}
    ></jio-footer>
  );
}

export default JioFooter;
