import type { MicroCMSListContent } from "microcms-js-sdk";

export type Tag = {
    name: string;
} & MicroCMSListContent;

export type Post = {
    title: string
    text: string
} & MicroCMSListContent;
