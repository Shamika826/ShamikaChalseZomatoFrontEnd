import HomePage from "./components/HomePage/1st_HomePage";
import SearchPage from "./components/SearchPage/2nd_SearchPage";
import RestaurantPage from "./components/RestaurantPage/ThirdPage"
import { Routes, Route } from 'react-router-dom'

function App() {
  return (<>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search-page/:meal_Id" element={<SearchPage/>} />
        <Route path="/restaurant-page/:restaurant_id" element={<RestaurantPage/>} />
      </Routes>
    </>
  );
}

export default App;

