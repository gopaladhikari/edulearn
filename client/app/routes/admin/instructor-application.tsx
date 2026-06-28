import { useLoaderData, type MetaArgs } from "react-router";
import type { LoaderFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import type { InstructorApplication } from "../../../types/instructor-application.t";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";

interface Result {
  instructorApplications: InstructorApplication;
}

export const clientLoader: LoaderFunction = async ({ params }) => {
  const { applicationId } = params;

  try {
    const { data } = await api.get<Result>(
      `/api/v1/instructor-application/${applicationId}`
    );

    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export function meta({ loaderData }: MetaArgs) {
  return [
    {
      title: loaderData || "Instructor Application - Admin",
    },
    {
      name: "description",
      content: "View and manage individual instructor applications.",
    },
  ];
}

export default function InstructorApplication() {
  const response = useLoaderData<ApiSuccess<Result> | ApiError>();

  return <div>{JSON.stringify(response)}</div>;
}
