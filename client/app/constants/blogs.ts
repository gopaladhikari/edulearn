interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of React and start building interactive web applications. We cover components, hooks, and state management.",
    content:
      "React is one of the most popular JavaScript libraries for building user interfaces. In this guide, we'll explore the core concepts including JSX, functional components, hooks, and state management. By the end of this article, you'll have a solid understanding of how React works and how to build your first React application.",
    author: "John Doe",
    date: "January 15, 2025",
    category: "Web Development",
    image: "/images/blog-1.jpg",
    readTime: 8,
  },
  {
    id: "2",
    title: "Mastering Node.js: Build Scalable Server Applications",
    excerpt:
      "Explore advanced Node.js concepts including async/await, streams, and database integration for building production-ready applications.",
    content:
      "Node.js has revolutionized backend development. This comprehensive guide covers everything from basic server setup to advanced patterns. Learn how to handle asynchronous operations, work with databases, implement authentication, and deploy your applications to production.",
    author: "Jane Smith",
    date: "January 12, 2025",
    category: "Backend Development",
    image: "/images/blog-2.jpg",
    readTime: 12,
  },
  {
    id: "3",
    title: "10 Best Practices for Clean Code in JavaScript",
    excerpt:
      "Write maintainable and clean JavaScript code by following these proven best practices and coding standards.",
    content:
      "Writing clean code is an essential skill for any developer. In this article, we discuss naming conventions, code organization, error handling, testing, and documentation. These best practices will help you write code that is easy to understand, maintain, and scale.",
    author: "Mike Johnson",
    date: "January 10, 2025",
    category: "Web Development",
    image: "/images/blog-3.jpg",
    readTime: 10,
  },
  {
    id: "4",
    title: "Understanding TypeScript: Type Safety for JavaScript",
    excerpt:
      "Discover how TypeScript adds type safety to JavaScript and how it can help catch errors before they reach production.",
    content:
      "TypeScript is a superset of JavaScript that adds static typing. Learn about interfaces, generics, decorators, and other advanced features. We'll also explore how to migrate existing JavaScript projects to TypeScript gradually.",
    author: "Sarah Williams",
    date: "January 8, 2025",
    category: "Web Development",
    image: "/images/blog-4.jpg",
    readTime: 11,
  },
  {
    id: "5",
    title: "The Complete Guide to Web Performance Optimization",
    excerpt:
      "Optimize your web applications for speed with techniques like code splitting, lazy loading, and image optimization.",
    content:
      "Performance is crucial for user experience. This guide covers various optimization techniques including minification, compression, caching strategies, and using a CDN. Learn how to measure performance with tools like Lighthouse and Web Vitals.",
    author: "David Brown",
    date: "January 5, 2025",
    category: "Performance",
    image: "/images/blog-5.jpg",
    readTime: 9,
  },
  {
    id: "6",
    title: "API Design Best Practices: Creating RESTful APIs",
    excerpt:
      "Learn how to design efficient and user-friendly REST APIs that are easy to maintain and scale.",
    content:
      "Creating a well-designed API is fundamental to modern web development. Discover best practices for endpoint design, versioning, authentication, rate limiting, and error handling. We'll also explore GraphQL as an alternative approach.",
    author: "Emily Davis",
    date: "January 3, 2025",
    category: "Backend Development",
    image: "/images/blog-6.jpg",
    readTime: 13,
  },
];

export const CATEGORIES = [
  "All",
  "Web Development",
  "Backend Development",
  "Performance",
];
