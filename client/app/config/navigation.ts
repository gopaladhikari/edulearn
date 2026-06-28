import {
  Bell,
  Heart,
  ShoppingCart,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import type { NavigationConfig } from "../../types/navs.t";

export const publicNav: NavigationConfig = {
  header: [
    {
      title: "Teach on EduLearn",
      to: "/teaching",
    },
  ],

  dropdown: [],
};

export const studentNav: NavigationConfig = {
  header: [
    {
      title: "Teach on EduLearn",
      to: "/teaching",
    },
    {
      title: "Wishlist",
      to: "/wishlist",
      icon: Heart,
    },
    {
      title: "Cart",
      to: "/cart",
      icon: ShoppingCart,
    },
    {
      title: "Notifications",
      to: "/notifications",
      icon: Bell,
    },
  ],

  dropdown: [
    {
      title: "Profile",
      to: "/profile",
    },
    {
      title: "Wishlist",
      to: "/wishlist",
    },
    {
      title: "Cart",
      to: "/cart",
    },
    {
      title: "Become Instructor",
      to: "/become-instructor",
    },
  ],
};

export const instructorNav: NavigationConfig = {
  header: [
    {
      title: "Teaching",
      to: "/instructor",
      icon: GraduationCap,
    },
    {
      title: "Notifications",
      to: "/notifications",
      icon: Bell,
    },
  ],

  dropdown: [
    {
      title: "Profile",
      to: "/profile",
    },
    {
      title: "Dashboard",
      to: "/instructor",
    },
    {
      title: "Courses",
      to: "/instructor/courses",
    },
    {
      title: "Students",
      to: "/instructor/students",
    },
  ],
};

export const adminNav: NavigationConfig = {
  header: [
    {
      title: "Dashboard",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Notifications",
      to: "/notifications",
      icon: Bell,
    },
  ],

  dropdown: [
    {
      title: "Dashboard",
      to: "/admin",
    },
    {
      title: "Courses",
      to: "/admin/courses",
    },
    {
      title: "Users",
      to: "/admin/users",
    },
    {
      title: "Instructor Applications",
      to: "/admin/instructor-applications",
    },
  ],
};
