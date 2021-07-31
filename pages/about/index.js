import Head from 'next/head'
import Image from 'next/image'
import GetContentHubClient from '../../Helpers/GetContentHubClient'
import MessageBlock from '../../components/MessageBlock'
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";

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
          heading={props.message.title}
          message ={props.message.body} />
          <Image src={props.message.image} width='1038' height='692' alt="Himadri Chakrabarti" />
        </div>
    </>
  )
}

export async function getStaticProps() {

  var client=await GetContentHubClient();
  if (await client.internalClient.authenticateAsync()) {
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
      props: {
        message: {
          title: content.getProperty("Blog_Title").getValue(),
          body: content.getProperty("Blog_Body").getValue(),
          image: content.getProperty("CoverImageLink").getValue()
        }
      },
      revalidate: 86400
    }
  }
}