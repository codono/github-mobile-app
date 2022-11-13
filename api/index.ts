const GIT_REPO_API_URL = 'https://api.github.com/repos';

export const getOpenIssueListSortByComment = async (
  owner: string,
  repoName: string,
) => {
  try {
    const result = await fetch(
      `${GIT_REPO_API_URL}/${owner}/${repoName}/issues?state=open&sort=comments`,
    );
    const resultJson = await result.json();
    return resultJson; // returns {result:url}
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getIssueDetail = async (
  owner: string,
  repoName: string,
  issueNumber: number,
) => {
  try {
    const result = await fetch(
      `${GIT_REPO_API_URL}/${owner}/${repoName}/issues/${issueNumber}`,
    );
    const resultJson = await result.json();
    return resultJson; // returns {result:url}
  } catch (error) {
    console.error(error);
    return error;
  }
};
