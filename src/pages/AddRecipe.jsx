import React, { useState } from "react";
import Header from "../components/Header";

export default function AddRecipe() {
    const [recipeName, setRecipeName] = useState("");
    const [cuisineType, setCuisineType] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data object
        const newRecipe = {
            recipeName,
            cuisineType,
            imageLink,
            ingredients: ingredients.split(",").map((item) => item.trim()), 
            instructions: instructions.split("\n").map((item) => item.trim()), 
        };

        try {
            // Send POST request
            const response = await fetch("https://recipe-organiser-backend-lovat.vercel.app/createRecipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecipe),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Recipe added successfully!");
                // Clear form fields
                setRecipeName("");
                setCuisineType("");
                setImageLink("");
                setIngredients("");
                setInstructions("");
            } else {
                setMessage(result.error || "Failed to add recipe. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <main className="container mt-4">
                <h2>Add Recipe</h2>

                {message && <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="recipeName">Name:</label>
                    <input
                        type="text"
                        className="form-control w-25 mb-3"
                        id="recipeName"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />

                    <label htmlFor="cuisineType">Cuisine Type:</label>
                    <input
                        type="text"
                        className="form-control w-25 mb-3"
                        id="cuisineType"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        required
                    />

                    <label htmlFor="imageLink">Image Link:</label>
                    <input
                        type="text"
                        className="form-control w-25 mb-3"
                        id="imageLink"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        required
                    />

                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        className="form-control w-25 mb-3"
                        id="ingredients"
                        value={ingredients}
                        placeholder="Comma-separated"
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    ></textarea>

                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        className="form-control w-25 mb-3"
                        id="instructions"
                        value={instructions}
                        placeholder="New line for each step"
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    ></textarea>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}
