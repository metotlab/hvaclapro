import { MDXRemote } from "next-mdx-remote/rsc";

export function MDX({ source }: { source: string }) {
  return <MDXRemote source={source} />;
}
