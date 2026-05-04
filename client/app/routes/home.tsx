import { useLoaderData, type LoaderFunction } from "react-router";

type User = {
  _id: string;
  username: string;
  email: string;
  role: "student" | "admin";
};

export default function Home() {
  return (
    <div className="flex min-h-svh p-6">
      <h1>Welcome to EduLearn!</h1>
    </div>
  );
}
