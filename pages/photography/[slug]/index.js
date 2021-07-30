import Head from 'next/head'
import BlogItemDetail from '../../../components/BlogItemDetail'

const BLOG_DETAIL = {
  "publishDate": "7th June, 2021",
  "readTime": "3 min",
  "image": "/img/photoblog1.webp",
  "imgAlt": "photoblog1",
  "link": "/photography/3/",
  "title": "Short walk at Short North District, Columbus",
  "content": `<p>Magna nisi laborum nisi veniam non et pariatur nulla ex et. Nisi laboris id ut mollit laboris 
  dolore adipisicing commodo dolore eu. Eiusmod est do occaecat ex consectetur in exercitation ullamco 
  Lorem pariatur occaecat proident consequat officia. Amet sit elit veniam culpa Lorem veniam deserunt 
  velit aliqua id ullamco non. Non <strong>aliquip</strong> in quis eu ea laborum Lorem qui commodo veniam. Velit eiusmod 
  consequat excepteur culpa aliquip irure incididunt qui sit nostrud aliqua commodo adipisicing proident. 
  Deserunt elit in adipisicing sint amet sint est.Cupidatat in veniam tempor minim adipisicing excepteur sint. 
  Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.</p>
  <br/>
  <p>Reprehenderit ex eiusmod proident velit. Consectetur mollit esse tempor eu aliqua Lorem mollit tempor 
  voluptate excepteur est deserunt consequat. Eu duis dolore et aliquip nostrud magna aute veniam aliqua 
  velit magna do mollit qui. Qui qui adipisicing Lorem aliqua amet aliquip culpa velit eiusmod culpa nisi. 
  Laboris non quis veniam officia irure incididunt. Nulla enim eiusmod non tempor eu commodo labore fugiat 
  minim do magna.</p>
  <br/>
  <p>Magna nisi laborum nisi veniam non et pariatur nulla ex et. Nisi laboris id ut mollit laboris 
  dolore adipisicing commodo dolore eu. Eiusmod est do occaecat ex consectetur in exercitation ullamco 
  Lorem pariatur occaecat proident consequat officia. Amet sit elit veniam culpa Lorem veniam deserunt 
  velit aliqua id ullamco non. Non <strong>aliquip</strong> in quis eu ea laborum Lorem qui commodo veniam. Velit eiusmod 
  consequat excepteur culpa aliquip irure incididunt qui sit nostrud aliqua commodo adipisicing proident. 
  Deserunt elit in adipisicing sint amet sint est.Cupidatat in veniam tempor minim adipisicing excepteur sint. 
  Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.</p>
  <br/>
  <p>Magna nisi laborum nisi veniam non et pariatur nulla ex et. Nisi laboris id ut mollit laboris 
  dolore adipisicing commodo dolore eu. Eiusmod est do occaecat ex consectetur in exercitation ullamco 
  Lorem pariatur occaecat proident consequat officia. Amet sit elit veniam culpa Lorem veniam deserunt 
  velit aliqua id ullamco non. Non <strong>aliquip</strong> in quis eu ea laborum Lorem qui commodo veniam. Velit eiusmod 
  consequat excepteur culpa aliquip irure incididunt qui sit nostrud aliqua commodo adipisicing proident. 
  Deserunt elit in adipisicing sint amet sint est.Cupidatat in veniam tempor minim adipisicing excepteur sint. 
  Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.</p>
  <br/>
  <p>Magna nisi laborum nisi veniam non et pariatur nulla ex et. Nisi laboris id ut mollit laboris 
  dolore adipisicing commodo dolore eu. Eiusmod est do occaecat ex consectetur in exercitation ullamco 
  Lorem pariatur occaecat proident consequat officia. Amet sit elit veniam culpa Lorem veniam deserunt 
  velit aliqua id ullamco non. Non <strong>aliquip</strong> in quis eu ea laborum Lorem qui commodo veniam. Velit eiusmod 
  consequat excepteur culpa aliquip irure incididunt qui sit nostrud aliqua commodo adipisicing proident. 
  Deserunt elit in adipisicing sint amet sint est.Cupidatat in veniam tempor minim adipisicing excepteur sint. 
  Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.</p>`,
  "noOfViews": "10",
  "noOfComments": "0",
  "noOfFavorites": "2" 
}

export default function Photography(props) {
  return (
    <>  
        <Head>
          <title>My Photo Blog - Photography</title>
          <meta name="description" content="My Photo Blog - Photography" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container'>
          <BlogItemDetail 
            id = {props.blogDetail.id}
            publishDate={props.blogDetail.publishDate}
            readTime={props.blogDetail.readTime}
            image={props.blogDetail.image}
            imgAlt={props.blogDetail.imgAlt}
            link={props.blogDetail.link}
            title={props.blogDetail.title}
            content={props.blogDetail.content}
            noOfViews={props.blogDetail.noOfViews}
            noOfComments={props.blogDetail.noOfComments}
            noOfFavorites={props.blogDetail.noOfFavorites}
          />
        </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking',
    paths: [
      {
        params: {
          slug: "1",
        },
      },
      {
        params: {
          slug: "2",
        },
      },
      {
        params: {
          slug: "3",
        },
      },
    ]
  }
} 

export async function getStaticProps(context) {
  const slug = context.params.slug; 
  //fetch data from external source
  return {
    props: {
      blogDetail: { ...BLOG_DETAIL, "id": slug }
    }
  }
}