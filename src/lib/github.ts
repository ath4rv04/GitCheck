export async function getGitCheckData(username: string) {
  const token = process.env.GITHUB_TOKEN;
  
  // Debug: Check if token is actually loading (Check your terminal, not browser console)
  if (!token) {
    console.error("CRITICAL: GITHUB_TOKEN is missing from environment variables.");
  }

  const headers = {
    Authorization: `Bearer ${token}`, // Use Bearer instead of token for modern GitHub APIs
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, cache: 'no-store' }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, cache: 'no-store' }),
    ]);

    // This will print to your VS Code terminal
    if (!userRes.ok) {
      console.error(`User Fetch Failed: ${userRes.status} ${userRes.statusText}`);
      return null;
    }
    
    if (!reposRes.ok) {
      console.error(`Repo Fetch Failed: ${reposRes.status} ${reposRes.statusText}`);
      return null;
    }

    const profile = await userRes.json();
    const allRepos = await reposRes.json();

    const originalRepos = allRepos.filter((repo: any) => !repo.fork);
    const healthScore = calculateHealth(originalRepos);

    return { profile, originalRepos, healthScore };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function calculateHealth(repos: any[]) {
  if (repos.length === 0) return 0;
  
  let totalScore = 0;
  const repoCount = repos.length;

  // 1. Documentation & Metadata (30 points)
  const hasReadme = repos.filter(r => r.description !== null).length;
  totalScore += (hasReadme / repoCount) * 30;

  // 2. Legal & Compliance (30 points)
  const hasLicense = repos.filter(r => r.license !== null).length;
  totalScore += (hasLicense / repoCount) * 30;

  // 3. Cyber Security Hygiene (40 points)
  // Check for 'has_issues' (Public vulnerability reporting channel)
  // Check for 'allow_forking' (Controlled distribution)
  const secureRepos = repos.filter(r => r.has_issues && !r.archived).length;
  totalScore += (secureRepos / repoCount) * 40;

  return Math.round(totalScore);
}