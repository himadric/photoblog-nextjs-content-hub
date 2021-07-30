import TopicCard from './TopicCard'; 
import classes from './TopicCardContainer.module.scss';

export default function TopicCardContainer(props) {
    return (
        <section className={classes.topicCardContainer}>
        {props.topics.map((topicCard) => (
                <TopicCard
                    key={topicCard.id}
                    id={topicCard.id}
                    image={topicCard.image}
                    imgAlt={topicCard.imgAlt}
                    link={topicCard.link}
                    buttonText={topicCard.buttonText}
                />
            ))}
        </section>
    )
}