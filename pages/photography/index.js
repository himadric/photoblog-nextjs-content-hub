import Head from 'next/head'
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import MessageBlock from '../../components/MessageBlock'
import Helper from '../../Helpers/ContentHubHelpers'

export default function Photography(props) {
  return (
      <>  
      <Layout mainMenuItems = {props.mainMenuItems}> 
        <Head>
          <title>My Photo Blog - {props.message.title}</title>
          <meta name="description" content={props.message.body} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='container'>
        <MessageBlock
          heading={props.message.title}
          message ={props.message.body} />
          <BlogList blogs={props.blogList} />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  //fetch data from external source
  const client=await Helper.getContentHubClient();
  if(client) {
    const mainMenuItems = await Helper.getMainMenuItems(client);
    const intro = await Helper.getPageIntro(client, "Photography Page Intro");
    const blogList =  await Helper.getBlogsFromCollection(client, "Photography", "photography");
    return {
      props: {
        mainMenuItems: mainMenuItems,
        message: intro,
        blogList: blogList
      },
      revalidate: 3600
    }
  }
}
