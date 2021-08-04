
import Head from 'next/head'
import Layout from '../components/Layout'
import BlogItemDetail from '../components/BlogItemDetail'
import BlogList from '../components/BlogList'
import MessageBlock from '../components/MessageBlock'

export default class PageHelpers {
    static getBlogPage(props) {
        return (
            <>  
            <Layout mainMenuItems = {props.mainMenuItems} footer = {props.footer}> 
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

    static getBlogListPage(props) {
      return (
          <>  
          <Layout mainMenuItems = {props.mainMenuItems} footer = {props.footer}> 
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
}