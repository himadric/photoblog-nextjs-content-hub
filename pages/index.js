import Head from 'next/head'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Banner from '../components/Banner'
import MessageBlock from '../components/MessageBlock'
import TopicCardContainer from '../components/TopicCardContainer'
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";
import { RelationQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/relation-query-filter";
import Helper from '../Helpers/ContentHubHelpers'

async function getBannerContent(client) {
  var propertyQueryFilter = new PropertyQueryFilter({
    operator: ComparisonOperator.Equals,
    property: "Content.Name",
    value: "HomeBanner",
    dataType: FilterDataType.String
  });

  var query = new Query({
    filter: propertyQueryFilter
  });
  var content = await client.querying.singleAsync(query);
  return {
      title: content.getProperty("d4b32_Banner_Title").getValue(),
      heading: content.getProperty("d4b32_Banner_Heading").getValue(),
      subHeading: content.getProperty("d4b32_Banner_Sub_Heading").getValue(),
      image: content.getProperty("d4b32_Banner_Image").getValue(),
      imageAlt: content.getProperty("d4b32_Banner_Image_Alt").getValue()
  }
}

async function getWelcomeMessage(client) {
  var propertyQueryFilter = new PropertyQueryFilter({
    operator: ComparisonOperator.Equals,
    property: "Content.Name",
    value: "HomeWelcomeMessage",
    dataType: FilterDataType.String
  });

  var query = new Query({
    filter: propertyQueryFilter
  });
  var content = await client.querying.singleAsync(query);
  return {
      title: content.getProperty("Blog_Title").getValue(),
      body: content.getProperty("Blog_Body").getValue(),
  }
}

async function getTopicCards(client) {
    
  //Get the Topic Cards collection
  var propertyQueryFilter = new PropertyQueryFilter({
    operator: ComparisonOperator.Equals,
    property: "ContentCollectionName",
    value: "Topic Cards",
    dataType: FilterDataType.String
  });

  var query = new Query({
    filter: propertyQueryFilter
  });
  var topicCardsCollection = await client.querying.singleAsync(query);

  //Get all Topic Cards from the collection
  var relationQueryFilter  = new RelationQueryFilter ({
    relation: "ContentCollectionToContent",
    parentId: topicCardsCollection.id
  });
  
  var relationQuery = new Query({
      filter: relationQueryFilter
  });

  var relation = await client.querying.queryAsync(relationQuery);
  var topicCards = relation.items.map((topicCard) => (
    {
      "id": topicCard.identifier,
      "image": topicCard.getProperty("6b391_Image").getValue(),
      "imageAlt": topicCard.getProperty("6b391_ImageAlt").getValue(),
      "link": topicCard.getProperty("6b391_Link").getValue(),
      "buttonText": topicCard.getProperty("6b391_ButtonText").getValue(),
    }
  ));
  return topicCards;
}
const BLOGLIST = [
  {
    "id": 1,
    "publishDate": "7th June, 2021",
    "readTime": "3 min",
    "image": "/img/photoblog1.webp",
    "imgAlt": "photoblog1",
    "link": "/photography/1/",
    "title": "Short walk at Short North District, Columbus",
    "shortDescription": "Cupidatat in veniam tempor minim adipisicing excepteur sint. Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.",
    "noOfViews": 3,
    "noOfComments": 0,
    "noOfFavorites": 3
  },
  {
    "id": 2,
    "publishDate": "7th June, 2021",
    "readTime": "3 min",
    "image": "/img/photoblog1.webp",
    "imgAlt": "photoblog1",
    "link": "/photography/2/",
    "title": "Short walk at Short North District, Columbus",
    "shortDescription": "Cupidatat in veniam tempor minim adipisicing excepteur sint. Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.",
    "noOfViews": 6,
    "noOfComments": 0,
    "noOfFavorites": 1
  },
  {
    "id": 3,
    "publishDate": "7th June, 2021",
    "readTime": "3 min",
    "image": "/img/photoblog1.webp",
    "imgAlt": "photoblog1",
    "link": "/photography/3/",
    "title": "Short walk at Short North District, Columbus",
    "shortDescription": "Cupidatat in veniam tempor minim adipisicing excepteur sint. Exercitation eu dolore in aliquip mollit cupidatat dolor fugiat.",
    "noOfViews": 10,
    "noOfComments": 0,
    "noOfFavorites": 2
  }
]

export default function Home(props) {
  //console.log(props);
  return (
      <>  
        <Layout mainMenuItems = {props.mainMenuItems}> 
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
  //fetch data from external source
  const client=await Helper.getContentHubClient();
  if(client) {
    const mainMenuItems = await Helper.getMainMenuItems(client);
    const banner = await getBannerContent(client);
    const intro = await Helper.getPageIntro(client, "Home Page Intro")
    const topics = await getTopicCards(client);
    const blogList =  await Helper.getBlogsFromCollection(client, "Recent", "photography");
    return {
      props: {
        mainMenuItems: mainMenuItems,
        banner: banner,
        message: intro,
        topics: topics,
        blogList: blogList
      },
      revalidate: 3600
    }
  }
}
