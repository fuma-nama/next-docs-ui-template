import createNextDocs from "next-docs-mdx/config";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const withNextDocs = createNextDocs();

export default withNextDocs(config);
