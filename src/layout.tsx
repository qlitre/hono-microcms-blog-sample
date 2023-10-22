import { html } from 'hono/html'
import { config } from './settings/siteSettings'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Post, Category, Tag } from './types/blog'
import { ArticleList } from './components/ArticleList'
import { Breadcrumbs } from './components/Breadcrumbs'
import { Detail } from './components/ArticleDetail'
import { Pagination } from './components/Paginations';



type SiteData = {
  title: string
  description: string
  children?: any
}

type PaginationMaterial = {
  totalCount: number;
  currentPage: number;
  categoryId?: string
  tagId?: string;
}


export const Layout = (props: SiteData) => html`<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8" />
  <title>${props.title}</title>
  <link rel="stylesheet" href="/static/css/style.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${props.description}" />
  <meta name="author" content="${config.author}" />
  </head>
  <body>
    ${<Header></Header>}
    ${props.children}
    ${<Footer></Footer>}    
  </body>
</html>`



export const HomeContent = (props: {
  siteData: SiteData,
  posts: Post[],
  paginationMaterial: PaginationMaterial,
  category?: Category,
  tag?: Tag
}) => (
  <Layout {...props.siteData}>
    <div class="container">
      <Breadcrumbs category={props.category} tag={props.tag}></Breadcrumbs>
      <ArticleList posts={props.posts}></ArticleList>
      <Pagination totalCount={props.paginationMaterial.totalCount}
        currentPage={props.paginationMaterial.currentPage}
        categoryId={props.paginationMaterial.categoryId}
        tagId={props.paginationMaterial.tagId}>
      </Pagination>
    </div>
  </Layout>
)

export const DetailContent = (props: { siteData: SiteData, post: Post }) => (
  <Layout {...props.siteData}>
    <div class="container">
      <Detail post={props.post}></Detail>
    </div>
  </Layout>
)
