import Head from 'next/head'
import Image from 'next/image'
import GetContentHubClient from '../../Helpers/GetContentHubClient'
import MessageBlock from '../../components/MessageBlock'
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";

async function getAboutContent() {
  const client=await GetContentHubClient();
  if (client) {
    var propertyQueryFilter = new PropertyQueryFilter({
      operator: ComparisonOperator.Equals,
      property: "Content.Name",
      value: "About",
      dataType: FilterDataType.String
    });
  
    var query = new Query({
      filter: propertyQueryFilter
    });
    var content = await client.querying.singleAsync(query);
    return {
      aboutMe: {
        title: content.getProperty("Blog_Title").getValue(),
        body: content.getProperty("Blog_Body").getValue(),
        image: content.getProperty("CoverImageLink").getValue()
      }
    }
  }
}


export default function About(props) {
  return (
      <>  
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
    </>
  )
}

export async function getStaticProps() {

    var aboutMe = await getAboutContent();
    return {
      props: aboutMe,
      revalidate: 86400
    }
  }