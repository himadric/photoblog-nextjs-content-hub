import Head from 'next/head'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Banner from '../components/Banner'
import MessageBlock from '../components/MessageBlock'
import TopicCardContainer from '../components/TopicCardContainer'
import StaticPropsHelper from '../Helpers/GetStaticPropsHelpers'


export default function Home(props) {
  return (
      <>  
        <Layout mainMenuItems = {props.mainMenuItems} footer = {props.footer}> 
          <Head>
            <title>My Photo Blog</title>
            <meta name="description" content="My Photo Blog" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Banner 
          image={props.banner.image}
          imgAlt={props.banner.imageAlt}
          title={props.banner.title}
          heading={props.banner.heading}
          subHeading={props.banner.subHeading} />
          <div className='container'>
          <MessageBlock
            heading={props.message.title}
            message ={props.message.body} />
            <TopicCardContainer topics={props.topics} />
            <BlogList blogs={props.blogList} />
          </div>
        </Layout>
    </>
  )
}

export async function getStaticProps() {
  return await StaticPropsHelper.getHomePageStaticProps("Home Page Intro","Recent", "photography");
}
