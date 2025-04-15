import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>host app</h1>
      <p>여기가 다 받아줄거라능</p>
      <Link to="/first">go to first app</Link>
    </div>
  )
}

export default Home
