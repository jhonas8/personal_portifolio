import { wisp, GetPostsResult, GetPostResult } from "@/lib/wisp";

// Re-export the types to maintain compatibility with existing components
export type { GetPostsResult, GetPostResult };

// Export interfaces from the mock data that aren't provided by Wisp
export interface BlogPostTag {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  tags: BlogPostTag[];
}

// Function to get all blog posts with pagination
export async function getBlogPosts(page: number = 1, limit: number = 4): Promise<GetPostsResult> {
  try {
    return await wisp.getPosts({
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching blog posts from Wisp:", error);
    // Return empty result on error
    return {
      posts: [],
      pagination: {
        page,
        limit,
        totalPages: 0,
        totalPosts: 0,
        nextPage: null,
        prevPage: null
      }
    };
  }
}

// Function to get a single blog post by slug
export async function getBlogPost(slug: string): Promise<GetPostResult> {
  try {
    return await wisp.getPost(slug);
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}" from Wisp:`, error);
    // Return null post on error
    return { post: null };
  }
}

// Function to get posts by tag name
export async function getPostsByTag(tag: string, page: number = 1, limit: number = 4): Promise<GetPostsResult> {
  try {
    return await wisp.getPosts({
      page,
      limit,
      tags: [tag],
    });
  } catch (error) {
    console.error(`Error fetching blog posts with tag "${tag}" from Wisp:`, error);
    // Return empty result on error
    return {
      posts: [],
      pagination: {
        page,
        limit,
        totalPages: 0,
        totalPosts: 0,
        nextPage: null,
        prevPage: null
      }
    };
  }
}

// Function to get all available tags
export async function getAllTags(): Promise<BlogPostTag[]> {
  try {
    const tagsResult = await wisp.getTags();
    return tagsResult.tags;
  } catch (error) {
    console.error("Error fetching tags from Wisp:", error);
    // Return empty array on error
    return [];
  }
}