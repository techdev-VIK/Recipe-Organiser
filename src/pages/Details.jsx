import { useParams } from "react-router-dom"
import Header from "../components/Header"
import useFetch from "../useFetch";
import '../App'

export default function Details(){

    const recipeId = useParams();

    // console.log(recipeId)

    const {data, loading, error} = useFetch(`https://recipe-organiser-backend-lovat.vercel.app/allRecipes`)

    if (error) return <div className='alert alert-info'>Error in loading the data, please try again!</div>

    // console.log(recipeId.detailId)
    const recipeData = data?.find((recipe) => recipe.recipeName == recipeId.detailId);


    return(
        <>
        <Header />
        <main className="container">
            {recipeData ? (<div>
                <h3 className="mt-4">{recipeData.recipeName}</h3>

                <div className="card mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={recipeData.imageLink} alt="" className="img-fluid h-100" />
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                            <h3>Cuisine: {recipeData.cuisineType}</h3>
                            <h4>Ingredients:</h4>
                            <p>{recipeData.ingredients.join(', ')}</p>

                            <h4>Instructions:</h4>
                            <ol>
                                {recipeData.instructions.map((ins, index) => (
                                    <li key={index}>{ins}</li>
                                ))}
                            </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>): (loading && <div className="alert alert-warning w-50">Loading...</div>)}
        </main>
        </>
    )
}