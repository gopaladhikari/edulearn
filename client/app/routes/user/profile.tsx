import { useUserStore } from "~/store/userStore";

export function meta() {
  const user = useUserStore().user;

  return [
    { title: `${user?.username ?? "Profile"} - Edulearn` },
    { name: "description", content: "Profile page" },
  ];
}

export default function Page() {
  return (
    <main>
      <h1>Hello world</h1>
    </main>
  );
}
