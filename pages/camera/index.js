import StaticPropsHelper from '../../Helpers/GetStaticPropsHelpers'
import PageHelper from '../../Helpers/PageHelpers'

export default function Photography(props) {
  return PageHelper.getBlogListPage(props);
}

export async function getStaticProps() {
  //fetch data from external source
  return await StaticPropsHelper.getBlogListStaticProps("Camera Page Intro", "Camera", "camera");
}
