import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Resume Home" },
    { name: "description", content: "Welcome to create resome" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans h-100">
      <h1 className="text-3xl">How does it work</h1>
      <ol>
        <li>Upload your Resume PDF or Provide your LinkedIn</li>
        <li>Make updates to your data</li>
        <li>Choose a template</li>
        <li>Customize</li>
        <li>Download your resume</li>
      </ol>
      <div className="flex mt-4">
        <NavLink
          to="/form"
          className="button--primary button"
          >
          Get started
        </NavLink>
      </div>
    </div>
  );
}
