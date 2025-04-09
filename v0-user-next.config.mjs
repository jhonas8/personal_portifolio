// Custom Next.js configuration
export default {
  // Environment variables that should be available at build time
  env: {
    WISP_BLOG_ID: process.env.WISP_BLOG_ID,
    GOOGLE_EXSPREADSHEET_ID: process.env.GOOGLE_EXSPREADSHEET_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    GITHUB_PROFILE: process.env.GITHUB_PROFILE,
    LINKEDIN_PROFILE: process.env.LINKEDIN_PROFILE,
  },
}; 