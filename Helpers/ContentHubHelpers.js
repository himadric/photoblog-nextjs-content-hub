import cacheData from "memory-cache";
import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";
import { RelationQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/relation-query-filter";

const contentHubEndPoint = process.env.contentHubEndPoint;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const username = process.env.username;
const password = process.env.password;

const getContentHubClientCacheKey = 'getContentHubClient';
const getTopicCardsCacheKey = 'getTopicCards';
const getBannerContentCacheKey = 'getBannerContent';
const getWelcomeMessageCacheKey = 'getWelcomeMessage';
const getAboutContentCacheKey = 'getAboutContent';
const getMainMenuItemsCacheKey = 'getMainMenuItems';
const getBlogsFromCollectionCacheKey = 'getBlogsFromCollection';
const getPageIntroCacheKey = 'getPageIntro';
const getBlogByIdCacheKey = 'getBlogById';
const getFooterCacheKey = 'getFooter';

const cacheDuration = 1000 * 60 * 60;
const sleepInterval = 1000;

function formatDate(datetime){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date  = new Date(datetime);
    return date.toLocaleDateString("en-US", options);
}

async function sleep(sleepDuration) {
    await new Promise(r => setTimeout(r, sleepDuration));
} 

export default class Helper {
    static async getContentHubClient() {
        let client = cacheData.get(getContentHubClientCacheKey);
        if(client)
        {
            return client;
        }
        else
        {
            //fetch data from external source
            // Your Sitecore Content Hub endpoint to connect to
            // Enter your credentials here
            const oauth = new OAuthPasswordGrant(
                    clientId,
                    clientSecret,
                    username,
                    password
            );
        
            // Create the JavaScript SDK client
            const client = new ContentHubClient(contentHubEndPoint, oauth);
            if (await client.internalClient.authenticateAsync()) {
                cacheData.put(getContentHubClientCacheKey, client, cacheDuration);
                await sleep(sleepInterval)
                return client;
            }
            else {
                return null;
            }
        }
    }

    static async getBannerContent(client) {
        let banner = cacheData.get(getBannerContentCacheKey);
        if(banner){
            return banner;
        }
        else
        {
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
            await sleep(sleepInterval)
            banner = {
                title: content.getProperty("d4b32_Banner_Title").getValue(),
                heading: content.getProperty("d4b32_Banner_Heading").getValue(),
                subHeading: content.getProperty("d4b32_Banner_Sub_Heading").getValue(),
                image: content.getProperty("d4b32_Banner_Image").getValue(),
                imageAlt: content.getProperty("d4b32_Banner_Image_Alt").getValue()
            }
            cacheData.put(getBannerContentCacheKey, banner, cacheDuration);
            return banner;
        }
    }

    static async getWelcomeMessage(client) {
        let welcomeMessage = cacheData.get(getWelcomeMessageCacheKey);
        if(welcomeMessage){
            return welcomeMessage;
        }
        else
        {
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
            await sleep(sleepInterval)
            welcomeMessage = {
                title: content.getProperty("Blog_Title").getValue(),
                body: content.getProperty("Blog_Body").getValue(),
            }
            cacheData.put(getWelcomeMessageCacheKey, welcomeMessage, cacheDuration);
        }
    }
    static async getTopicCards(client) {
    
        let topicCards = cacheData.get(getTopicCardsCacheKey);
        if(topicCards){
            return topicCards;
        }
        else
        {
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
            await sleep(sleepInterval)
        
            //Get all Topic Cards from the collection
            var relationQueryFilter  = new RelationQueryFilter ({
            relation: "ContentCollectionToContent",
            parentId: topicCardsCollection.id
            });
            
            var relationQuery = new Query({
                filter: relationQueryFilter
            });
        
            var relation = await client.querying.queryAsync(relationQuery);
            await sleep(sleepInterval)
            topicCards = relation.items.map((topicCard) => (
            {
                "id": topicCard.identifier,
                "image": topicCard.getProperty("6b391_Image").getValue(),
                "imageAlt": topicCard.getProperty("6b391_ImageAlt").getValue(),
                "link": topicCard.getProperty("6b391_Link").getValue(),
                "buttonText": topicCard.getProperty("6b391_ButtonText").getValue(),
            }
            ));
            cacheData.put(getTopicCardsCacheKey, topicCards, cacheDuration);
            return topicCards;
        }        
      }
      
      static async getAboutContent(client) {
        let about = cacheData.get(getAboutContentCacheKey);
        if(about){
            return about;
        }
        else
        {
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
            await sleep(sleepInterval)
            about = {
                title: content.getProperty("Blog_Title").getValue(),
                body: content.getProperty("Blog_Body").getValue(),
                image: content.getProperty("CoverImageLink").getValue()
            }
            cacheData.put(getAboutContentCacheKey, about, cacheDuration);
            return about;
        }
    }
    //This static function returns main menu items from CH. This functions
    //is called in every page to pass the menu items to Layout. We need this
    //to build the menu dynamically from CH in static props at build time.
    static async getMainMenuItems(client) {
          //Get the Main Menu collection
        let menuItems = cacheData.get(getMainMenuItemsCacheKey);
        if(menuItems){
            return menuItems;
        }
        else
        {
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
            await sleep(sleepInterval)
    
            //Get all Menu Items from the collection
            var relationQueryFilter  = new RelationQueryFilter ({
                relation: "ContentCollectionToContent",
                parentId: mainMenuCollection.id
            });
            
            var relationQuery = new Query({
                filter: relationQueryFilter
            });
    
            var relation = await client.querying.queryAsync(relationQuery);
            await sleep(sleepInterval)
            menuItems = relation.items.map((mainMenuItem) => (
                {
                "id": mainMenuItem.identifier,
                "parentId": mainMenuItem.getProperty("851fb_Parent_Id").getValue(),
                "menuCaption": mainMenuItem.getProperty("851fb_MenuCaption").getValue(),
                "menuLink": mainMenuItem.getProperty("851fb_MenuLink").getValue(),
                }    
            ));
            cacheData.put(getMainMenuItemsCacheKey, menuItems, cacheDuration);
        }
        return menuItems;
    }

    static async getBlogsFromCollection(client, contentCollectionName, pagename) {
    
        const cacheKey = [getBlogsFromCollectionCacheKey, contentCollectionName, pagename].join('');
        let blogs = cacheData.get(cacheKey);
        if(blogs) {
            return blogs;
        }
        else {
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
            await sleep(sleepInterval)
        
            //Get all Topic Cards from the collection
            const relationQueryFilter  = new RelationQueryFilter ({
            relation: "ContentCollectionToContent",
            parentId: blogCollection.id
            });
            
            const relationQuery = new Query({
                filter: relationQueryFilter
            });
        
            const relation = await client.querying.queryAsync(relationQuery);
            await sleep(sleepInterval)
            blogs = relation.items.map((blog) => (
            {
                "id": blog.id,
                "image": blog.getProperty("Blog_CoverImageLink").getValue(),
                "imageAlt": blog.getProperty("Blog_CoverImageAlt").getValue(),
                "publishDate": formatDate(blog.getProperty("Content.PublishedOn").getValue()),
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
            cacheData.put(cacheKey, blogs, cacheDuration);
            return blogs;
        }
    }
    
    static async getPageIntro(client, contentName) {
        const cacheKey = [getPageIntroCacheKey, contentName].join('');
        let pageIntro = cacheData.get(cacheKey);
        if(pageIntro) {
            return pageIntro;
        }
        else {

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
            await sleep(sleepInterval)
            pageIntro = {
                title: content.getProperty("Blog_Title").getValue(),
                body: content.getProperty("Blog_Body").getValue(),
            }
            cacheData.put(cacheKey, pageIntro, cacheDuration);
            return pageIntro;
        }
    }

    static async getBlogById(client, id)
    {
        const cacheKey = [getBlogByIdCacheKey, id].join('');
        let blog = cacheData.get(cacheKey);
        if(blog) {
            return blog;
        }
        else {
            let entity = await client.entities.getAsync(Number(id));
            await sleep(sleepInterval)
            blog = {
                "id": entity.id,
                "image": entity.getProperty("Blog_CoverImageLink").getValue(),
                "imageAlt": entity.getProperty("Blog_CoverImageAlt").getValue(),
                "publishDate": formatDate(entity.getProperty("Content.PublishedOn").getValue()),
                "readTime": entity.getProperty("Blog_ReadTime").getValue(),
                "title": entity.getProperty("Blog_Title").getValue(),
                "shortDescription": entity.getProperty("Blog_Quote").getValue(),
                "body": entity.getProperty("Blog_Body").getValue(),
                "noOfViews": 3,
                "noOfComments": 0,
                "noOfFavorites": 3
            }
            cacheData.put(cacheKey, blog, cacheDuration);
            return blog;
        }
    }
    
    static async getFooter(client)
    {
        let footer = cacheData.get(getFooterCacheKey);
        if(footer) {
            return footer;
        }
        else {
            var propertyQueryFilter = new PropertyQueryFilter({
            operator: ComparisonOperator.Equals,
            property: "Content.Name",
            value: "Footer",
            dataType: FilterDataType.String
            });
        
            var query = new Query({
            filter: propertyQueryFilter
            });
            let footerEntity = await client.querying.singleAsync(query);
            await sleep(sleepInterval)
            footer = {
                aboutMeHeading: footerEntity.getProperty("13de7_AboutMeHeading").getValue(),
                aboutMeQuote: footerEntity.getProperty("13de7_AboutMeQuote").getValue(),
                aboutMeImageLink: footerEntity.getProperty("13de7_AboutMeImageLink").getValue(),
                copyright: footerEntity.getProperty("13de7_Copyright").getValue(),
                subscriptionHeading: footerEntity.getProperty("13de7_SubscriptionHeading").getValue(),
                emailLabel: footerEntity.getProperty("13de7_EmailLabel").getValue(),
                subscriptionButtonCaption: footerEntity.getProperty("13de7_SubscriptionButtonCaption").getValue(),
            }
            cacheData.put(getFooterCacheKey, footer, cacheDuration);
            return footer;
        }
    }
}