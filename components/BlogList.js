import BlogItem from './BlogItem';
import classes from './BlogList.module.scss';

export default function BlogList(props) {
    return (
        <section className={classes.bloglist}>
                {props.blogs.map((blogitem) => (
                <BlogItem
                    key={blogitem.id}
                    id={blogitem.id}
                    publishDate={blogitem.publishDate}
                    readTime={blogitem.readTime}
                    image={blogitem.image}
                    imgAlt={blogitem.imgAlt}
                    link={blogitem.link}
                    title={blogitem.title}
                    shortDescription={blogitem.shortDescription}
                    noOfViews={blogitem.noOfViews}
                    noOfComments={blogitem.noOfComments}
                    noOfFavorites={blogitem.noOfFavorites}
                />
            ))}
        </section>
    )
}