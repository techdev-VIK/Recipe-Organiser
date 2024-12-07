import { NavLink } from "react-router-dom"

export default function Header(){
    return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <NavLink className="navbar-brand" to="/">Recipe Organiser</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link text-primary" aria-current="page" to="/">Recipes</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link text-primary" to="/pages/addRecipe">Add Recipe</NavLink>
                </li>
             </ul>
            </div>
        </div>
    </nav>
    </>
    )
}