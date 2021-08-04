import StaticPropsHelper from '../../../Helpers/GetStaticPropsHelpers'
import PageHelper from '../../../Helpers/PageHelpers'

export default function PhotographyBlog(props) {
  return PageHelper.getBlogPage(props);
}

export async function getStaticPaths() {
  return StaticPropsHelper.getBlogListStaticPaths("Camera", "camera");
} 

export async function getStaticProps(context) {
  return StaticPropsHelper.getBlogStaticProps(context);
}