import { getPage, getPageUrl, pages, tree } from "@/app/source";
import type { Metadata } from "next";
import { MDXContent } from "next-docs-ui/mdx";
import { DocsPage } from "next-docs-ui/page";
import { findNeighbour } from "next-docs-zeta/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const neighbour = findNeighbour(tree, getPageUrl(params.slug));
  const Content = page.data.default;

  return (
    <DocsPage toc={page.data.toc} footer={neighbour}>
      <MDXContent>
        <h1>{page.matter.title}</h1>
        <Content />
      </MDXContent>
    </DocsPage>
  );
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return pages.map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.matter.title,
    description: page.matter.description,
  } satisfies Metadata;
}
