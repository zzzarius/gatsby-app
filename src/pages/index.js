import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function Page({ data }) {
  return (
    <Layout>
      <main>
        <h1>Gatsby.js tests</h1>
        <ol>
          {data.allCourse.nodes.map(({ discoveryCourse: { url_slug } }) => (
            <li key={url_slug}>
              {url_slug}
              <ul>
                <li>
                  <Link to={`/dsg/${url_slug}`}>dsg</Link>
                </li>
                <li>
                  <Link to={`/ssg/${url_slug}`}>ssg</Link>
                </li>
                <li>
                  <Link to={`/ssr/${url_slug}`}>ssr</Link>
                </li>
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allCourse {
      nodes {
        discoveryCourse {
          url_slug
        }
      }
    }
  }
`
