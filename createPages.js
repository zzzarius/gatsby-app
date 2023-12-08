exports.createPages = async ({
  graphql,
  actions: { createPage, createSlice },
}) => {
  const {
    data: {
      allCourse: { nodes: courses },
    },
  } = await graphql(`
    query {
      allCourse {
        nodes {
          id
          discoveryCourse {
            url_slug
          }
        }
      }
    }
  `)
  courses.forEach(({ discoveryCourse, id }) => {
    createPage({
      path: `/dsg/${discoveryCourse.url_slug}`,
      component: require.resolve(`./src/templates/page.js`),
      context: {
        id,
        pageType: "DSG",
      },
      defer: true,
    })
  })

  courses.forEach(({ discoveryCourse, id }) => {
    createPage({
      path: `/ssg/${discoveryCourse.url_slug}`,
      component: require.resolve(`./src/templates/page.js`),
      context: {
        id,
        pageType: "SSG",
      },
    })
  })
}
