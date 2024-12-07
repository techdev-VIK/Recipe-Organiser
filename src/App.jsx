import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  
  const {data, loading, error} = useFetch(`https://recipe-organiser-backend-lovat.vercel.app/allRecipes`)

  const [searchQuery, setSearchQuery] = useState('');

  const [newData, setData] = useState(data || []);


  useEffect(() => {
    if (data) {
      setData(data); 
    }
  }, [data]);

  const filteredRecipes = newData.filter((recipe) => recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = async (recipeName) => {
    try {
      const response = await fetch(`https://recipe-organiser-backend-lovat.vercel.app/recipe/delete/${recipeName}`, {
        method: 'DELETE',
      })

      if(response.ok){
        alert('Recipe deleted successfully');
        const updatedData = data.filter((recipe) => recipe.recipeName !== recipeName);
        setData(updatedData);
      }else{
        alert('Failed to delete the recipe')
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting the recipe');
    }
  }

  if (error) return <div className='alert alert-info'>Error in loading the data, please try again!</div>

  return (
    <>
      <Header />

      <main>
        {data? (<div className='container mt-4'>
          <input type="search"  placeholder='Search by recipe name...' className='form-control w-50' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

          <h2 className='mt-4'>All Recipes:</h2>

          <div className='row'>
            {filteredRecipes.length > 0 ? (filteredRecipes.map((recipe) => (
              <div className='col-md-3' key={recipe._id}>
              <div className='card mt-3'>
                <img src={recipe.imageLink} alt="" className='img-fluid card-img-top img-fixed-height'/>

                <div className='card-body'>
                  <h3 className='text-truncate'>{recipe.recipeName}</h3>
                  <p><strong>Cuisine Type: </strong>{recipe.cuisineType}</p>
                  <p><strong>Ingredients: </strong><Link to={`/pages/${recipe.recipeName}`}>See Recipe &gt;</Link></p>
                  <p><strong>Instructions: </strong><Link to={`/pages/${recipe.recipeName}`}>See Recipe &gt;</Link></p>

                  <button className='btn btn-danger' onClick={() => handleDelete(recipe.recipeName)}>Delete</button>
                </div>
              </div>

            </div>
            ))):(<div className="alert alert-danger w-50">
              No recipes match your search.
            </div>)}
          </div>
        </div>): loading && <div className="container alert alert-warning mt-5 text-center ">Loading...</div>}
      </main>
    </>
  )
}

export default App
