import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Archive = ({ data, location }) => {
  const header = (
    <header className="relative overflow-hidden py-6 bg-gray-100 sm:py-8 md:py-16 lg:py-20 mb-8 sm:mb-16">
      <div className="container">
        <h1 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl">
          Blog Archive
        </h1>
      </div>
      <svg
        className="hidden md:block absolute right-0 top-0 transform -translate-x-4 translate-y-4"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="svg-pattern-squares-1"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#svg-pattern-squares-1)" />
      </svg>
    </header>
  )

  const posts = data.allMarkdownRemark.edges

  const years = []
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (years.indexOf(y) === -1) {
      years.push(y)
    }
  })

  const postsByYear = {}
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (postsByYear[y] === undefined) {
      postsByYear[y] = []
    }
    postsByYear[y].push(node)
  })

  return (
    <Layout location={location} header={header}>
      <SEO title="Archive" />

      {years.map(year => {
        return (
          <div className="sm:flex mt-4 mb-8 sm:mt-8 md:my-12">
            <h2 className="mb-2 sm:mb-0 sm:mr-6 md:mr-8 lg:mr-12 sm:mb-4 text-3xl tracking-tight leading-10 font-extrabold text-gray-500 sm:text-4xl sm:leading-none md:text-5xl">
              {year}
            </h2>
            <div className="flex-1 lg:max-w-3xl">
              {postsByYear[year].map(node => {
                return (
                  <article
                    key={node.fields.slug}
                    className="relative mb-4 sm:mb-6"
                  >
                    <header className="mb-2">
                      <h3 className="font-bold text-gray-900 text-xl sm:text-2xl md:text-3xl">
                        <Link
                          className="hover:underline focus:underline"
                          to={node.fields.slug}
                        >
                          {node.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="text-indigo-600 text-lg">
                        {node.frontmatter.date}
                      </p>
                    </header>
                    <section className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                      <p
                        className="leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </section>
                  </article>
                )
              })}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default Archive

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
        }
      }
    }
  }
`
