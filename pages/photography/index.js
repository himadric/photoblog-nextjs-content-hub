import StaticPropsHelper from '../../Helpers/GetStaticPropsHelpers'
import PageHelper from '../../Helpers/PageHelpers'

export default function Photography(props) {
  return PageHelper.getBlogListPage(props);
}

export async function getStaticProps() {
  return StaticPropsHelper.getBlogListStaticProps("Photography Page Intro", "Photography", "photography");
}
