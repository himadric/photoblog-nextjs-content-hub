import StaticPropsHelper from '../../../Helpers/GetStaticPropsHelpers'
import PageHelper from '../../../Helpers/PageHelpers'

export default function PhotographyBlog(props) {
  return PageHelper.getBlogPage(props);
}

export async function getStaticPaths() {
  return StaticPropsHelper.getBlogListStaticPaths("Photography", "photography");
} 

export async function getStaticProps(context) {
  return StaticPropsHelper.getBlogStaticProps(context);
}
