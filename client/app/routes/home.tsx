import axios from "axios";
import { useLoaderData, type LoaderFunction } from "react-router";
import { api } from "~/lib/axios";

type User = {
  _id: string;
  username: string;
  email: string;
  role: "student" | "admin";
};

export const loader: LoaderFunction = async () => {
  const { data } = await axios.get<User>("/health");
  data.data._id;
};

export default function Home() {
  const data = useLoaderData();

  return <div className="flex min-h-svh p-6"></div>;
}
