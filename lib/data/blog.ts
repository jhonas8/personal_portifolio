// Types for blog posts
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

export interface GetPostsResult {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalPosts: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface GetPostResult {
  post: BlogPost | null;
}

// Mock data for development
const mockTags: BlogPostTag[] = [
  { id: '1', name: 'react' },
  { id: '2', name: 'javascript' },
  { id: '3', name: 'nextjs' },
  { id: '4', name: 'typescript' },
  { id: '5', name: 'frontend' },
  { id: '6', name: 'backend' },
  { id: '7', name: 'api' },
  { id: '8', name: 'web-development' },
];

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Next.js and TypeScript',
    slug: 'building-modern-web-applications',
    description: 'Learn how to leverage Next.js and TypeScript to build fast, type-safe web applications that scale.',
    content: `
      <h2>Introduction to Next.js</h2>
      <p>Next.js is a React framework that enables server-side rendering, static site generation, and more. It's a powerful tool for building modern web applications.</p>
      
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static types to JavaScript, making your code more robust and easier to maintain. It catches errors at compile time, rather than at runtime.</p>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js app with TypeScript, you can use the following command:</p>
      <pre><code>npx create-next-app@latest --typescript</code></pre>
      
      <h2>Building Your First Component</h2>
      <p>Let's create a simple component that displays a greeting message:</p>
      <pre><code>
import React from 'react';

interface GreetingProps {
  name: string;
}

export const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>With Next.js and TypeScript, you have a powerful combination for building modern web applications. The static typing of TypeScript combined with the framework features of Next.js makes for a great developer experience.</p>
    `,
    image: '/images/blog/nextjs-typescript.jpg',
    publishedAt: '2023-04-15T00:00:00.000Z',
    updatedAt: '2023-04-16T00:00:00.000Z',
    createdAt: '2023-04-14T00:00:00.000Z',
    tags: [mockTags[2], mockTags[3], mockTags[4]],
  },
  {
    id: '2',
    title: 'RESTful API Design Best Practices',
    slug: 'restful-api-design-best-practices',
    description: 'A comprehensive guide to designing clean, intuitive, and effective RESTful APIs that developers will love to use.',
    content: `
      <h2>What is a RESTful API?</h2>
      <p>REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods explicitly and are stateless.</p>
      
      <h2>Use HTTP Methods Correctly</h2>
      <p>The most common HTTP methods used in RESTful APIs are:</p>
      <ul>
        <li><strong>GET</strong>: Retrieve a resource</li>
        <li><strong>POST</strong>: Create a resource</li>
        <li><strong>PUT</strong>: Update a resource</li>
        <li><strong>DELETE</strong>: Remove a resource</li>
      </ul>
      
      <h2>Use Nouns, Not Verbs in Endpoints</h2>
      <p>Good practice:</p>
      <pre><code>GET /articles</code></pre>
      <p>Bad practice:</p>
      <pre><code>GET /getArticles</code></pre>
      
      <h2>Use Status Codes Correctly</h2>
      <p>Some common status codes:</p>
      <ul>
        <li><strong>200</strong>: OK</li>
        <li><strong>201</strong>: Created</li>
        <li><strong>400</strong>: Bad Request</li>
        <li><strong>404</strong>: Not Found</li>
        <li><strong>500</strong>: Internal Server Error</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>By following these best practices, you'll create APIs that are intuitive, easy to use, and maintainable.</p>
    `,
    image: '/images/blog/api-design.jpg',
    publishedAt: '2023-03-20T00:00:00.000Z',
    updatedAt: '2023-03-21T00:00:00.000Z',
    createdAt: '2023-03-19T00:00:00.000Z',
    tags: [mockTags[5], mockTags[6], mockTags[7]],
  },
  {
    id: '3',
    title: 'State Management in React: Context API vs. Redux',
    slug: 'state-management-in-react',
    description: 'A comparison of different state management approaches in React applications, focusing on Context API and Redux.',
    content: `
      <h2>Introduction to State Management</h2>
      <p>State management is a crucial aspect of any React application. As applications grow, managing state becomes more complex.</p>
      
      <h2>React Context API</h2>
      <p>The Context API is built into React and provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
      
      <pre><code>
// Create a context
const ThemeContext = React.createContext('light');

// Provider component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
      </code></pre>
      
      <h2>Redux</h2>
      <p>Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently and are easy to test.</p>
      
      <pre><code>
// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

// Store
const store = createStore(counterReducer);
      </code></pre>
      
      <h2>When to Use Each</h2>
      <p>Use Context API for simpler applications and when you need to avoid prop drilling. Use Redux for more complex state logic and when you need time-travel debugging.</p>
      
      <h2>Conclusion</h2>
      <p>Both Context API and Redux have their places in React development. Choose the right tool based on your application's needs.</p>
    `,
    image: '/images/blog/react-state.jpg',
    publishedAt: '2023-02-10T00:00:00.000Z',
    updatedAt: '2023-02-11T00:00:00.000Z',
    createdAt: '2023-02-09T00:00:00.000Z',
    tags: [mockTags[0], mockTags[1], mockTags[4]],
  },
  {
    id: '4',
    title: 'The Fundamentals of Responsive Web Design',
    slug: 'fundamentals-of-responsive-web-design',
    description: 'An in-depth look at the core principles of responsive web design and how to implement them in your projects.',
    content: `
      <h2>What is Responsive Web Design?</h2>
      <p>Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.</p>
      
      <h2>Fluid Layouts</h2>
      <p>Use percentage-based widths instead of fixed widths to create fluid layouts that adapt to different screen sizes.</p>
      
      <pre><code>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  width: 33.33%;
  float: left;
}
      </code></pre>
      
      <h2>Media Queries</h2>
      <p>Media queries allow you to apply different styles based on device characteristics, such as screen width, height, or orientation.</p>
      
      <pre><code>
/* Base styles */
.column {
  width: 100%;
}

/* Tablet and larger */
@media (min-width: 768px) {
  .column {
    width: 50%;
  }
}

/* Desktop and larger */
@media (min-width: 1024px) {
  .column {
    width: 33.33%;
  }
}
      </code></pre>
      
      <h2>Flexible Images</h2>
      <p>Make images responsive with CSS:</p>
      
      <pre><code>
img {
  max-width: 100%;
  height: auto;
}
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>By implementing these fundamentals of responsive web design, you can create websites that provide an optimal viewing and interaction experience across a wide range of devices.</p>
    `,
    image: '/images/blog/responsive-design.jpg',
    publishedAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-06T00:00:00.000Z',
    createdAt: '2023-01-04T00:00:00.000Z',
    tags: [mockTags[4], mockTags[7]],
  },
  {
    id: '5',
    title: 'Building a Serverless Application with AWS Lambda',
    slug: 'serverless-application-aws-lambda',
    description: 'Learn how to build and deploy serverless applications using AWS Lambda and other AWS services.',
    content: `
      <h2>Introduction to Serverless</h2>
      <p>Serverless computing is a cloud computing execution model where the cloud provider dynamically manages the allocation of machine resources.</p>
      
      <h2>Why AWS Lambda?</h2>
      <p>AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you.</p>
      
      <h2>Creating Your First Lambda Function</h2>
      <p>Here's a simple example of a Lambda function in Node.js:</p>
      
      <pre><code>
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
      </code></pre>
      
      <h2>Integrating with API Gateway</h2>
      <p>API Gateway allows you to create, publish, maintain, monitor, and secure APIs at any scale.</p>
      
      <h2>Using DynamoDB for Data Storage</h2>
      <p>DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.</p>
      
      <pre><code>
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'Users',
    Item: {
      userId: event.userId,
      name: event.name,
      email: event.email
    }
  };
  
  try {
    await dynamoDB.put(params).promise();
    return { statusCode: 200, body: 'User created' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Error creating user' };
  }
};
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>Serverless architectures allow you to build and run applications without thinking about servers. AWS Lambda, combined with other AWS services, provides a powerful platform for serverless development.</p>
    `,
    image: '/images/blog/aws-lambda.jpg',
    publishedAt: '2022-12-15T00:00:00.000Z',
    updatedAt: '2022-12-16T00:00:00.000Z',
    createdAt: '2022-12-14T00:00:00.000Z',
    tags: [mockTags[5], mockTags[6]],
  },
];

// Function to get all blog posts with pagination
export async function getBlogPosts(page: number = 1, limit: number = 4): Promise<GetPostsResult> {
  // Simulate a delay for a real API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const totalPosts = mockPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Get posts for current page
  const paginatedPosts = mockPosts.slice(startIndex, endIndex);
  
  // Determine next and previous pages
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;
  
  return {
    posts: paginatedPosts,
    pagination: {
      page,
      limit,
      totalPages,
      totalPosts,
      nextPage,
      prevPage
    }
  };
}

// Function to get a single blog post by slug
export async function getBlogPost(slug: string): Promise<GetPostResult> {
  // Simulate a delay for a real API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const post = mockPosts.find(post => post.slug === slug) || null;
  
  return { post };
}

// Function to get posts by tag name
export async function getPostsByTag(tag: string, page: number = 1, limit: number = 4): Promise<GetPostsResult> {
  // Simulate a delay for a real API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter posts by tag
  const filteredPosts = mockPosts.filter(post => 
    post.tags.some(t => t.name.toLowerCase() === tag.toLowerCase())
  );
  
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Get posts for current page
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Determine next and previous pages
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;
  
  return {
    posts: paginatedPosts,
    pagination: {
      page,
      limit,
      totalPages,
      totalPosts,
      nextPage,
      prevPage
    }
  };
}

// Function to get all available tags
export async function getAllTags(): Promise<BlogPostTag[]> {
  // Simulate a delay for a real API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get unique tags from all posts
  const uniqueTags = new Map<string, BlogPostTag>();
  
  mockPosts.forEach(post => {
    post.tags.forEach(tag => {
      uniqueTags.set(tag.id, tag);
    });
  });
  
  return Array.from(uniqueTags.values());
} 