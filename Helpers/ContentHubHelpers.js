import getConfig from 'next/config'
import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";
import { RelationQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/relation-query-filter";

const { serverRuntimeConfig } = getConfig()

export default class Helper {
    static async getContentHubClient() {
        //fetch data from external source
        // Your Sitecore Content Hub endpoint to connect to
        const endpoint = serverRuntimeConfig.contentHubEndPoint;
    
        // Enter your credentials here
        const oauth = new OAuthPasswordGrant(
                serverRuntimeConfig.contentHubAuth.clientId,
                serverRuntimeConfig.contentHubAuth.clientSecret,
                serverRuntimeConfig.contentHubAuth.username,
                serverRuntimeConfig.contentHubAuth.password
        );
    
        // Create the JavaScript SDK client
        const client = new ContentHubClient(endpoint, oauth);
        if (await client.internalClient.authenticateAsync()) {
            return client;
        }
        else {
            return null;
        }
    }

    //This static function returns main menu items from CH. This functions
    //is called in every page to pass the menu items to Layout. We need this
    //to build the menu dynamically from CH in static props at build time.
    static async getMainMenuItems(client) {
          //Get the Main Menu collection
        var propertyQueryFilter = new PropertyQueryFilter({
            operator: ComparisonOperator.Equals,
            property: "ContentCollectionName",
            value: "Main Menu",
            dataType: FilterDataType.String
        });

        var query = new Query({
            filter: propertyQueryFilter
        });
        var mainMenuCollection = await client.querying.singleAsync(query);

        //Get all Menu Items from the collection
        var relationQueryFilter  = new RelationQueryFilter ({
            relation: "ContentCollectionToContent",
            parentId: mainMenuCollection.id
        });
        
        var relationQuery = new Query({
            filter: relationQueryFilter
        });

        var relation = await client.querying.queryAsync(relationQuery);
        var menuItems = relation.items.map((mainMenuItem) => (
            {
            "id": mainMenuItem.identifier,
            "parentId": mainMenuItem.getProperty("851fb_Parent_Id").getValue(),
            "menuCaption": mainMenuItem.getProperty("851fb_MenuCaption").getValue(),
            "menuLink": mainMenuItem.getProperty("851fb_MenuLink").getValue(),
            }
        ));
        return menuItems;
    }

    static async getBlogsFromCollection(client, contentCollectionName, pagename) {
    
        //Get the Topic Cards collection
        var propertyQueryFilter = new PropertyQueryFilter({
          operator: ComparisonOperator.Equals,
          property: "ContentCollectionName",
          value: contentCollectionName,
          dataType: FilterDataType.String
        });
      
        var query = new Query({
          filter: propertyQueryFilter
        });
        const blogCollection = await client.querying.singleAsync(query);
      
        //Get all Topic Cards from the collection
        const relationQueryFilter  = new RelationQueryFilter ({
          relation: "ContentCollectionToContent",
          parentId: blogCollection.id
        });
        
        const relationQuery = new Query({
            filter: relationQueryFilter
        });
      
        const relation = await client.querying.queryAsync(relationQuery);
        const blogs = relation.items.map((blog) => (
          {
            "id": blog.id,
            "image": blog.getProperty("Blog_CoverImageLink").getValue(),
            "imageAlt": blog.getProperty("Blog_CoverImageAlt").getValue(),
            "publishDate": blog.getProperty("Content.PublishedOn").getValue(),
            "readTime": blog.getProperty("Blog_ReadTime").getValue(),
            "link": ["/", pagename, "/", blog.id].join(''),
            "title": blog.getProperty("Blog_Title").getValue(),
            "shortDescription": blog.getProperty("Blog_Quote").getValue(),
            "body": blog.getProperty("Blog_Body").getValue(),
            "noOfViews": 3,
            "noOfComments": 0,
            "noOfFavorites": 3
          }
        ));
        return blogs;
    }
    
    static async getPageIntro(client, contentName) {
        var propertyQueryFilter = new PropertyQueryFilter({
        operator: ComparisonOperator.Equals,
        property: "Content.Name",
        value: contentName,
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

    static async getBlogById(client, id)
    {
        var blog = await client.entities.getAsync(Number(id));
        return {
            "id": blog.id,
            "image": blog.getProperty("Blog_CoverImageLink").getValue(),
            "imageAlt": blog.getProperty("Blog_CoverImageAlt").getValue(),
            "publishDate": blog.getProperty("Content.PublishedOn").getValue(),
            "readTime": blog.getProperty("Blog_ReadTime").getValue(),
            "title": blog.getProperty("Blog_Title").getValue(),
            "shortDescription": blog.getProperty("Blog_Quote").getValue(),
            "body": blog.getProperty("Blog_Body").getValue(),
            "noOfViews": 3,
            "noOfComments": 0,
            "noOfFavorites": 3
        }
    }
        
}