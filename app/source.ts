import { fromMap } from "next-docs-mdx/map";
import { map } from "@/_map";

export const { tree, getPage, pages, getPageUrl } = fromMap(map);
