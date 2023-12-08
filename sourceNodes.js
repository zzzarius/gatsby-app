const { createContentDigest } = require("gatsby-core-utils");
const { getAlgoliaCourseSlugs, getAlgoliaCourseBySlug } = require("./src/restApi/algolia");
const { getDiscoveryCourseByUUID } = require("./src/restApi/discovery");


exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const slugs = await getAlgoliaCourseSlugs();
  const courses = [];
  for (const slug of slugs) {
    const algoliaCourse = await getAlgoliaCourseBySlug(slug);
    const discoveryCourse = await getDiscoveryCourseByUUID(algoliaCourse.uuid);
    courses.push({algoliaCourse, discoveryCourse});
  }

  courses.forEach(course => {
    createNode({
      ...course,
      id: createNodeId(`Page-${course.algoliaCourse.uuid}`),
      parent: null,
      children: [],
      internal: {
        type: "Course",
        contentDigest: createContentDigest(course),
      },
    });
  });

  const pages = [
    {
      slug: "page-1",
      id: "1",
    },
    {
      slug: "page-2",
      id: "2",
    },
    {
      slug: "page-3",
      id: "3",
    },
  ];

  pages.forEach(page => {
    createNode({
      ...page,
      id: createNodeId(`Page-${page.id}`),
      parent: null,
      children: [],
      internal: {
        type: "Page",
        contentDigest: createContentDigest(page),
      },
    });
  });
};
