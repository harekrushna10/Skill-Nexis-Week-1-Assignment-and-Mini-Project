import { useState } from "react";
import Button from "./Button";

const Form = ({ onAddProduct }) => {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: ""
    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.price ||
            !formData.category
        ) {
            alert("Please fill all required fields.");
            return;
        }


        const newProduct = {

            id: Date.now(),

            name: formData.name,

            price: Number(formData.price),

            category: formData.category,

            description:
                formData.description ||
                "A newly added product.",

            rating: "5.0",

            badge: "NEW",

            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"

        };


        onAddProduct(newProduct);


        setFormData({
            name: "",
            price: "",
            category: "",
            description: ""
        });
    };


    return (

        <form
            className="product-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>
                    Product Name *
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="e.g. Wireless Headphones"
                    value={formData.name}
                    onChange={handleChange}
                />

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Price *
                    </label>

                    <input
                        type="number"
                        name="price"
                        placeholder="2999"
                        value={formData.price}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Category *
                    </label>

                    <input
                        type="text"
                        name="category"
                        placeholder="Electronics"
                        value={formData.category}
                        onChange={handleChange}
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Description
                </label>

                <textarea
                    name="description"
                    placeholder="Write a short product description..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                />

            </div>


            <Button type="submit">
                + Add Product
            </Button>

        </form>
    );
};

export default Form;