import MainNavigation from './MainNavigation'
import Footer from './Footer'
import classes from './Layout.module.scss'

export default function Layout(props) {
    return (
        <>
            <MainNavigation mainMenuItems = {props.mainMenuItems}/>
            <main className={classes.main}>{props.children}</main>
            <Footer footer={props.footer} />
        </>
    )
}