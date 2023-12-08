const algoliasearch = require("algoliasearch")

const getAlgoliaCourseBySlug = async (slug) => {
  if (!slug) {
    return null
  }
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_ADMIN_KEY || ""
  )
  const productIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME || "")
  const slugWithDomain = `https://www.edx.org/${slug}`
  const response = await productIndex.search("", {
    filters: `marketing_url: "${slugWithDomain}"`,
  })
  return response?.hits?.at(0)
}

const getAlgoliaCourseSlugs = async () => {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_ADMIN_KEY || ""
  )
  const productIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME || "")
  productIndex.setSettings({
    paginationLimitedTo: 10000,
  })
  const hits = []
  let page = 0
  let nbPages
  do {
    const response = await productIndex.search("", {
      filters: "product:Course",
      attributesToRetrieve: ["marketing_url"],
      page,
      hitsPerPage: 10,
    })
    page = response.page + 1
    nbPages = response.nbPages
    hits.push(...response.hits)
  } while (page < 1)
  const slugs = hits?.map((hit) =>
    hit.marketing_url.replace("https://www.edx.org/", "")
  )

  return slugs
}

module.exports = {
  getAlgoliaCourseBySlug,
  getAlgoliaCourseSlugs,
}
