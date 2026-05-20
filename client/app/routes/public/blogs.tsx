import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { blogs, CATEGORIES } from "~/constants/blogs";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Edulearn Blog
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Explore articles, tutorials, and insights on web development,
            programming, and online education.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Search and Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
                >
                  {/* Featured Image */}
                  <figure>
                    <img
                      src="/blog-placeholder.svg"
                      alt="Blog image unavailable"
                      width={400}
                      height={400}
                    />
                  </figure>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Category Badge */}
                    <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {blog.category}
                    </span>

                    {/* Title and Excerpt */}
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {blog.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="mb-4 flex flex-wrap gap-4 border-b pb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {blog.date}
                      </div>
                      <span>{blog.readTime} min read</span>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="group flex items-center gap-2 font-medium text-primary hover:text-primary/80"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                No articles found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
