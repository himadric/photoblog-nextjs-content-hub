import Head from 'next/head'
import Layout from '../../../components/Layout'
import BlogItemDetail from '../../../components/BlogItemDetail'
import Helper from '../../../Helpers/ContentHubHelpers'

export default function CameraBlog(props) {
  return (
    <>  
      <Layout mainMenuItems = {props.mainMenuItems}>
        <Head>
          <title>My Photo Blog - {props.blog.title}</title>
          <meta name="description" content={props.blog.shortDescription} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container'>
          <BlogItemDetail 
            id = {props.blog.id}
            publishDate={props.blog.publishDate}
            readTime={props.blog.readTime}
            image={props.blog.image}
            imgAlt={props.blog.imgAlt}
            title={props.blog.title}
            content={props.blog.body}
            noOfViews={props.blog.noOfViews}
            noOfComments={props.blog.noOfComments}
            noOfFavorites={props.blog.noOfFavorites}
          />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const client=await Helper.getContentHubClient();
  if(client) {
      const blogList =  await Helper.getBlogsFromCollection(client, "Camera", "camera");
      const paths = blogList.map((blogitem) => ({
        params: { slug: blogitem.id.toString() },
      }))
      return {paths, fallback: 'blocking'}      
  }
} 

export async function getStaticProps(context) {
  const id = context.params.slug; 
  const client=await Helper.getContentHubClient();
  if(client) {
    const mainMenuItems = await Helper.getMainMenuItems(client);
    const blog = await Helper.getBlogById(client, id);
    //fetch data from external source
    return {
      props: {
        mainMenuItems: mainMenuItems,
        blog: blog
      }
    }
  }
}
