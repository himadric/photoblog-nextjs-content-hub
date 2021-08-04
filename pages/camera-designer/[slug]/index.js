import StaticPropsHelper from '../../../Helpers/GetStaticPropsHelpers'
import PageHelper from '../../../Helpers/PageHelpers'

export default function PhotographyBlog(props) {
  return PageHelper.getBlogPage(props);
}

export async function getStaticPaths() {
  return await StaticPropsHelper.getBlogListStaticPaths("Camera Designer", "camera-designer");
} 

export async function getStaticProps(context) {
  return await StaticPropsHelper.getBlogStaticProps(context);
}