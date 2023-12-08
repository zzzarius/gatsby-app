import React from "react"
import { getAlgoliaCourseBySlug } from "../../restApi/algolia"
import { getDiscoveryCourseByUUID } from "../../restApi/discovery"
import Layout from "../../components/layout"

export async function getServerData({
  pageContext: { discoveryCourse__url_slug },
}) {
  try {
    const algoliaCourse = await getAlgoliaCourseBySlug(
      discoveryCourse__url_slug
    )
    const discoveryCourse = await getDiscoveryCourseByUUID(algoliaCourse.uuid)

    return {
      props: {
        algoliaCourse,
        discoveryCourse,
      },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}

const Page = (props) => (
  <Layout>
    <main>
      <h1>Gatsby.js SSR Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </main>
  </Layout>
)

export default Page
