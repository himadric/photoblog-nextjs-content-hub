import Image from 'next/image';
import classes from './Banner.module.scss';

export default function Banner(props) {
    return (
    <div className={classes.banner}>
        <Image src={props.image} width="1903" height="476" alt={props.imgAlt} />
        <div className={classes.bannerText}>
            <p>{props.title}</p>
            <h1>{props.heading}</h1>
            <p>{props.subHeading}</p>
        </div>
    </div>
    )
}