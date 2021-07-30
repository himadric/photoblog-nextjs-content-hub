import classes from './MessageBlock.module.scss';

export default function MessageBlock(props) {
    return (
        <section className={classes.message}>
            <h1>{props.heading}</h1>
            <p>
                <div dangerouslySetInnerHTML={{ __html: props.message}} />
            </p>
        </section>
    )
}