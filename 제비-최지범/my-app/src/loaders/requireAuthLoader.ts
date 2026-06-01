import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { getStoredAccessToken } from "../utils/authStorage";

export const requireAuthLoader = ({ request }: LoaderFunctionArgs) => {
  if (!getStoredAccessToken()) {
    const url = new URL(request.url);
    const next = url.pathname + url.search;
    return redirect(`/login?from=${encodeURIComponent(next)}`);
  }
  return null;
};
