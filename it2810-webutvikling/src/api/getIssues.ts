//Fetching Issues from from gitlab with Project ID and Access Token from user input
export function getIssues(accessToken: string, ID: string): Promise<any> {
  const url =
    "https://gitlab.stud.idi.ntnu.no/api/v4/projects/" + ID + "/issues";
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  })
    .then((response) => response)
    .catch((error) => error);
}
