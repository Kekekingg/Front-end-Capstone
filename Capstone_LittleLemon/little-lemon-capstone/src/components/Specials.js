import recipes from "./Recipes";
import Swal from "sweetalert2";

function Specials() {

    const hanldeClick = (id) => {
        console.log("Order a delivery clicked", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to add or remove this dish later.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, order it!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Ordered!",
                text: "Your order has been processing!",
                icon: "success"
                });
            }
            });
    }
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
                            <button className="btn btn-secondary" onClick={hanldeClick}>Order a delivery</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
    
      

export default Specials;
