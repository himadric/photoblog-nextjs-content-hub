import Head from 'next/head'
import Image from 'next/image'
import getConfig from 'next/config'
import GetContentHubClient from '../../Helpers/GetContentHubClient'
import MessageBlock from '../../components/MessageBlock'
import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";

const MESSAGE = {
  "heading": "Photographer",
  "message": `Thanks for visiting my photography blog website. I am a semi professional photographer with avid interest
  in taking photos, photographers, camera equipments and work of camera designers. I like to travel and take
  photos. I have created this blog to share my travel experience and share my love about camera, work of famous
  photographers and camera designers. If you would like see my work please visit my 
  <a href="https://www.himadriphoto.com/" aria-label="Photography site" target="_blank">photography site</a>.`
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
          heading={props.message.heading}
          message ={props.message.message} />
          <Image src="/img/himadri.jpg" width='1038' height='692' alt="Himadri Chakrabarti" />
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
    //const aggregateResource = await client.aggregates.getAsync("ContentCollection", 30491);
    //var content = await client.aggregates.getAsync("Content", 30500);;
    console.log(content.getProperty("Blog_Body").getValue());
  }
  return {
    props: {
      message: MESSAGE
    },
    revalidate: 86400
  }
}