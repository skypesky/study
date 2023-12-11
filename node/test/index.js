require('dotenv-flow').config();
const fetch = require('node-fetch')
const { Octokit } = require("@octokit/rest");
const fs = require('fs');

const octokit = new Octokit({
  auth: process.env.PERSONAL_GITHUB_TOKEN, // 请替换为你的个人访问令牌
  request:{
    fetch
  }
});

async function backupOrganizationRepos(orgName) {
  const repos = await octokit.repos.listForOrg({
    org: orgName
  });

  for (const repo of repos.data) {
    const repoName = repo.name;

    // Backup issues
    const issues = await octokit.issues.listForRepo({
      owner: orgName,
      repo: repoName,
    });
    for(const issue of issues.data) {
      issue.extras = {};
      issue.extras.comments = await octokit.issues.listComments({
        owner: orgName,
        repo: repoName,
        issue_number: issue.number,
      })
    }
    fs.writeFileSync(`${repoName}_issues.json`, JSON.stringify(issues.data));

    // Backup pull requests
    const pullRequests = await octokit.pulls.list({
      owner: orgName,
      repo: repoName
    });
    fs.writeFileSync(`${repoName}_pull_requests.json`, JSON.stringify(pullRequests.data));

    // Backup settings
    const settings = await octokit.repos.get({
      owner: orgName,
      repo: repoName,
    });
    fs.writeFileSync(`${repoName}_settings.json`, JSON.stringify(settings.data));
  }
}

backupOrganizationRepos('skypesky666');
