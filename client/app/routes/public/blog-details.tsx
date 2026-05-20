import { blogs } from "~/constants/blogs";
import type { Route } from "./+types/blog-details";

export const clientLoader = ({ params }: Route.LoaderArgs) => {
  const blogDetails = blogs.find((blog) => blog.id === params.slug);

  return {
    blog: blogDetails,
  };
};

export function meta({ loaderData }: Route.MetaArgs) {
  const blog = loaderData.blog!;

  if (!blog) {
    return [];
  }

  return [
    {
      name: "title",
      content: `${blog.title} - Edulearn`,
    },
    {
      name: "description",
      content: blog.excerpt,
    },
  ];
}

export function BlogDetails() {
  return (
    <div>
      <h1>Title</h1>
    </div>
  );
}
