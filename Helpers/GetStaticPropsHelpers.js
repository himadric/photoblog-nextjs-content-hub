import Helper from './ContentHubHelpers'

export default class StaticPropsHelper {
    static async getBlogListStaticProps(introName, contentCollection, route) {
        const client=await Helper.getContentHubClient();
        if(client) {
          const mainMenuItems = await Helper.getMainMenuItems(client);
          const footer = await Helper.getFooter(client);
          const intro = await Helper.getPageIntro(client, introName);
          const blogList =  await Helper.getBlogsFromCollection(client, contentCollection, route);
          return {
            props: {
              mainMenuItems: mainMenuItems,
              footer: footer,
              message: intro,
              blogList: blogList
            },
            revalidate: 3600
          }
        }      
    }

    static async getBlogListStaticPaths(contentCollection, route) {
        const client=await Helper.getContentHubClient();
        if(client) {
            const blogList =  await Helper.getBlogsFromCollection(client, contentCollection, route);
            const paths = blogList.map((blogitem) => ({
              params: { slug: blogitem.id.toString() },
            }))
            return {paths, fallback: 'blocking'}      
        }
    }

    static async getBlogStaticProps(context) {
        const id = context.params.slug; 
        const client=await Helper.getContentHubClient();
        if(client) {
          const mainMenuItems = await Helper.getMainMenuItems(client);
          const footer = await Helper.getFooter(client);
          const blog = await Helper.getBlogById(client, id);
          return {
            props: {
              mainMenuItems: mainMenuItems,
              footer: footer,
              blog: blog
            }
          }
        }      
    }
}