const buildConfig = () => {
  const blogId = process.env.WISP_BLOG_ID;
  if (!blogId) throw new Error("WISP_BLOG_ID is missing");
  
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "João Melo";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "João Melo";
  const defaultTitle = process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "João Melo - Software Developer";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || 
    "Fullstack developer with 5 years of experience, sharing insights on software development, tech trends, and industry best practices.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  };
};

export const config = buildConfig(); 