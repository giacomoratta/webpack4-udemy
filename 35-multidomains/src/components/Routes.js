import React from 'react'
import { Route, Link } from 'react-router-dom'
import universal from 'react-universal-component'
import { Switch } from 'react-router'
import '../css/nav.css'
import NotFound from './NotFound'

const UniversalComponent = universal(props => import(`./${props.page}`))

export default () => (
  <div>
    <div className='nav'>
      <Link to='/'>Gallery</Link>
      <Link to='/about'>About</Link>
      <Link to='/article/post'>Article</Link>
      <Link to='/article/post2'>Article 2</Link>
      <Link to='/draft/post'>Draft</Link>
      <Link to='/draft/post2'>Draft 2</Link>
    </div>
    <Switch>
      <Route exact path='/'>
        <UniversalComponent page='Gallery' />
      </Route>
      <Route
        path='/about'
        render={({ staticContext }) => {
          const site = staticContext ? staticContext.site : location.hostname.split('.')[0]
          return <UniversalComponent page='About' site={site} />
        }}
      />
      <Route
        path='/article/:slug'
        render={({ staticContext, match /* parameters, like :slug */ }) => {
          const site = staticContext ? staticContext.site : location.hostname.split('.')[0]
          return <UniversalComponent page='Article' site={site} match={match} />
        }}
      />
      <Route
        path='/draft/:slug'
        render={({ staticContext, match /* parameters, like :slug */ }) => {
          const site = staticContext ? staticContext.site : location.hostname.split('.')[0]
          return <UniversalComponent page='DraftArticle' site={site} match={match} />
        }}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
)
