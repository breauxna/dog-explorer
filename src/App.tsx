import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './components/home/Home'
import { Breeds } from './components/breeds/Breeds'
import { BreedDetails } from './components/breeds/BreedDetails'
import { RandomBreed } from './components/breeds/RandomBreed'
import { SearchResults } from './components/search/SearchResults'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<Breeds />} />
        <Route path="breeds/:breedId" element={<BreedDetails />} />
        <Route path="/breeds/random" element={<RandomBreed />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  )
}

export default App
