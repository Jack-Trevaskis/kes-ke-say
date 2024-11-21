import { createRoutesFromElements, Route } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import App from './components/App'
import Home from './components/Home'
import Post from './components/Post'
import AllProfiles from './components/AllProfiles'
import Profile from './components/Profile'
import { AllGroups } from './components/AllGroups'
import { Group } from './components/Group'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* Replace the element with your React Component */}
      <Route path="post">
        <Route index element={<div>AddPost</div>} />
        <Route path=":id" element={<Post />} />
      </Route>
      <Route path="register" element={<div>Register</div>} />
      <Route path="profiles">
        <Route index element={<AllProfiles />} />
        <Route path=":username" element={<Profile />} />
      </Route>
      <Route path="groups">
        <Route index element={<AllGroups />} />
        <Route path="add" element={<div>GroupProfileForm</div>} />
        <Route path=":id" element={<Group />} />
      </Route>
    </Route>
    <Route path="/login" element={<LandingPage />} />
  </>,
)
