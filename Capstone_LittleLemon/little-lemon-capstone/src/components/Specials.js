import recipes from "./Recipes";

function Specials() {
    return (
        <div className="specials-container">
            <div className="specials-header">
                <h2>This week's specials!</h2>
                <button className="btn btn-primary">Order Menu</button>
            </div>

            {/* Recipes Cards */}

            <div className="recipes-cards">
                {
                    recipes.map(recipes => <div key={recipes.id} className="recipe-items">
                        <img src={recipes.image} alt='' />
                        <div className="recipe-title">
                            <h3>{recipes.title}</h3>
                            <p className="price">${recipes.price}</p>
                        </div>
                        <div>
                            <p>{recipes.description}</p>
                            <button className="btn btn-secondary">Order a delivery</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
    
      

export default Specials;
