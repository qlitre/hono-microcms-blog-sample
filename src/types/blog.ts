import type { MicroCMSListContent } from "microcms-js-sdk";
import type { MicroCMSImage } from "microcms-js-sdk";

export type Tag = {
    name: string;
} & MicroCMSListContent;

export type Category = {
    name: string;
} & MicroCMSListContent;

export type Post = {
    title: string;
    thumbnail: MicroCMSImage;
    description: string;
    category: Category;
    tag: Tag[];
    text: string;
} & MicroCMSListContent;
