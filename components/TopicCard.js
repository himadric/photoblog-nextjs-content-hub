import Image from 'next/image';
import ButtonPrimary from './ButtonPrimary';
import classes from './TopicCard.module.scss';

export default function TopicCard(props) {
    return (
        <div className={classes.topicCard}>
            <Image src={props.image} 
                width="220" 
                height="220" 
                alt={props.imgAlt} />
            <ButtonPrimary 
                link={props.link}
                caption={props.buttonText} />
        </div>
    )
}