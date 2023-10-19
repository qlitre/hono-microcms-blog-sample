import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { html, raw } from 'hono/html'
import { createClient } from 'microcms-js-sdk'
import { Post } from './types/blog'

type Bindings = {
    API_KEY: string
    SERVICE_DOMAIN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))


type SiteData = {
    title: string
    children?: any
}

const Layout = (props: SiteData) => html`<!DOCTYPE html>
  <html>
    <head>
    <meta charset="utf-8" />
    <title>Hono microCMS Blog Sample</title>
    <link rel="stylesheet" href="/static/css/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Hono microCMS Blog Sample" />
    <meta name="author" content="Qlitre" />
    <title>${props.title}</title>
    </head>
    <body>
      ${<Header></Header>}
      ${props.children}
      ${<Footer></Footer>}
    </body>
  </html>`

const Content = (props: { siteData: SiteData, posts: Post[] }) => (
    <body>
        <div class="container">
            <Layout {...props.siteData}>
                {props.posts.map((post) => (
                    <div key={post.title}>
                        <h1>{post.title}</h1>
                        <a href={`/${post.id}`}>つづきをみる</a>
                    </div>
                ))}
            </Layout>
        </div>
    </body>
)

const DetailContent = (props: { siteData: SiteData, post: Post }) => (
    <body>
        <div class="container">
            <Layout {...props.siteData}>
                <div>
                    <h1>{props.post.title}</h1>
                    <div class="md">
                        {raw(props.post.text)}
                    </div>
                    <a href="/">TOPへ</a>
                </div>
            </Layout>
        </div>
    </body>
)


app.get('/', async (c) => {
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const listData = await client.getList<Post>({ endpoint: 'post' })
    const posts = listData.contents
    const props = {
        posts: posts,
        siteData: {
            title: 'Hono microCMS blog sample',
        },
    }
    return c.html(<Content {...props} />)
})

app.get('/:id', async (c) => {
    const id = c.req.param('id')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const listDetail = await client.getListDetail<Post>({ endpoint: 'post', contentId: id })
    const props = {
        post: listDetail,
        siteData: {
            title: listDetail.title,
        },
    }
    return c.html(<DetailContent {...props} />)
})

export default app
