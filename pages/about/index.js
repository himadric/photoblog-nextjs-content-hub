import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import MessageBlock from '../../components/MessageBlock'
import StaticPropsHelper from '../../Helpers/GetStaticPropsHelpers'

export default function About(props) {
  return (
    <> 
      <Layout mainMenuItems = {props.mainMenuItems} footer = {props.footer}> 
        <Head>
          <title>My Photo Blog - About</title>
          <meta name="description" content="My Photo Blog - About" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='container'>
        <MessageBlock
          heading={props.aboutMe.title}
          message ={props.aboutMe.body} />
          <Image src={props.aboutMe.image} width='1038' height='692' alt="Himadri Chakrabarti" />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return await StaticPropsHelper.getAboutPageStaticProps();
}
