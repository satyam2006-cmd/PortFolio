const GITHUB_USERNAME = "satyam2006-cmd"
const GITHUB_API = "https://api.github.com/users"

// Demo URLs for specific projects
export const demoUrls: Record<string, string> = {
  "ml-canvas": "https://ml-canvas-268c7k0zy-satyam-bhagats-projects.vercel.app/dashboard",
  "laptoppricepredictionmodel": "https://laptoppricepredictionmodel0.streamlit.app/",
  "feststudio": "https://web-production-aa741.up.railway.app/landing",
  "medicalcostpredictionmodel": "https://medicalcostpredictionmodel.streamlit.app/"
}

export interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  url: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  language: string
  fork: boolean
  homepage: string | null
}

export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API}/${GITHUB_USERNAME}/repos?sort=created&per_page=100&type=owner`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error("[v0] GitHub API error:", response.status)
      return []
    }

    const repos: GitHubRepo[] = await response.json()
    console.log("[v0] Total repos fetched:", repos.length)
    console.log("[v0] Repository names:", repos.map(r => r.name))

    const filtered = repos
      .filter((repo) => !repo.name.toLowerCase().includes("test") && !repo.fork && !repo.name.toLowerCase().includes("satyam2006-cmd"))
      .sort((a, b) => {
        // First, prioritize projects with Try Now buttons (homepage or demo URL)
        const aHasLink = !!(a.homepage || demoUrls[a.name.toLowerCase()]);
        const bHasLink = !!(b.homepage || demoUrls[b.name.toLowerCase()]);
        
        if (aHasLink && !bHasLink) return -1; // a comes first
        if (!aHasLink && bHasLink) return 1;  // b comes first
        
        // If both have links or both don't have links, keep the API order (latest created first)
        return 0;
      })
      .slice(0, 12) // Increased limit to 12

    console.log("[v0] Filtered repos count:", filtered.length)
    return filtered
  } catch (error) {
    console.error("[v0] Failed to fetch GitHub projects:", error)
    return []
  }
}
