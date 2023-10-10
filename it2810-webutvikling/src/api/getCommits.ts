//Fetching Commits from gitlab with Project ID and Access Token from user input
export function getCommits(accessToken: string, ID: string): Promise<any> {
  const url =
    "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" +
    ID +
    "/repository/commits";
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  })
    .then((response) => response)
    .catch((error) => error);
}
