import MarkdownData from '../../data/post.md'
import React from 'react'
import '../css/About.css'

export default () => (
  <div className='profile'>
    <img src={require('../images/link.jpg')} />
    <h1>{MarkdownData.title}</h1>
    <h2>{MarkdownData.author}</h2>
    <div className='content' dangerouslySetInnerHTML={{ __html: MarkdownData.__content }} />
  </div>
)
