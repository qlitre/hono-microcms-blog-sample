import type { Post } from '../types/blog';
import { raw } from 'hono/html'
import { getHighlightBody } from '../utils/getHighlightBody';
import { LineDevider } from './LineDivider';
import { TagInline } from './TagInline';
import { jstDatetime } from '../utils/jstDatetime';

type Props = {
    post: Post
}


export const Detail = ({ post }: Props) => {
    const body = getHighlightBody(post.text)
    return (
        <div class="Detail__container">
            <h1 class="Detail__title">{post.title}</h1>
            <p class="Detail__publishedAt">{jstDatetime(post.publishedAt, "YYYY年MM月DD日")}</p>
            <TagInline category={post.category} tags={post.tag}></TagInline>
            <LineDevider />
            <div class="md">
                {raw(body)}
            </div>
            <div class="Detail__linkToHomeBlock">
                <a class="Detail__linkToHome" href="/">
                    <span>記事一覧へ</span>
                </a>
            </div>
        </div>
    );
};