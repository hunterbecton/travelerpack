import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/nav';
import '../components/home/home.css';
import './archive.css';

import headerImg from '../images/general-header-image.jpg';

const TechPage = (props) => {

  const blogContent = props.data.allContentfulBlog;
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/category/tech" : `/category/tech/${currentPage -1}`
  const nextPage = `/category/tech/${currentPage + 1}`

  return (
    <Layout>
    <Nav />

      <header>
        <div className='archive__section'>
          <div className='archive__hero' style={{backgroundImage: `url(${headerImg})`}}></div>
          <div className='archive__nav'>
            <Link to='/blog' className={window.location.href.indexOf('blog') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>All</Link>
            <Link to='/category/travel' className={window.location.href.indexOf('category/travel') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Travel</Link>
            <Link to='/category/guide' className={window.location.href.indexOf('category/guide') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Guide</Link>
            <Link to='/category/opinion' className={window.location.href.indexOf('category/opinion') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Opinion</Link>
            <Link to='/category/tech' className={window.location.href.indexOf('category/tech') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Tech</Link>
          </div>
        </div>
      </header>

      <div className='feed'>
        {blogContent.edges.map(edge => (
          <div key={edge.node.id} className='card' 
          style={{
            backgroundImage: `linear-gradient(
            to bottom, 
            rgba(10,10,10,0) 0%,
            rgba(10,10,10,0) 50%,
            rgba(10,10,10,0.7) 100%),
            url(${edge.node.featuredImage.fluid.src})`
            }}
          onClick={() => navigate(`/blog/${edge.node.slug}`)}
            >
            {edge.node.categories.map(category => (
            <p className='card__category'>{category.category}</p>
            ))}
            <p className='card__title'>{edge.node.title}</p>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <div className='pagination__item'>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <div className='arrow__back'></div>
            </Link>
          )}
        </div>
        <div className='pagination__item'>
          {!isLast && (
            <Link to={nextPage} rel="next">
              <div className='arrow__next'></div>
            </Link>
          )}
        </div>
      </div>

    </Layout> 
  )
};

export default TechPage;

export const pageQuery = graphql`  
  query TechQuery ($skip: Int!, $limit: Int!) {
    allContentfulBlog(
        sort: { fields: [createdAt], order: DESC }
        filter: { 
        node_locale: {eq: "en-US",}
        categories: {elemMatch: {category: {eq: "Tech"}}}
      }
        skip: $skip 
        limit: $limit
      ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          categories {
            category
            id
          }
          featuredImage {
            fluid(maxWidth: 1200, quality: 85) {
              src
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`