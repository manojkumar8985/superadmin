import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "./CreateProduct.css"; // Reuse styling from CreateProduct

const EditProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discount: "0",
        quantity: "",
        about: "",
        category: "veg",
        adminEarningPercentage: "0",
        supervisorEarningPercentage: "0",
        employeeEarningPercentage: "0"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get product data passed via router state
        if (location.state && location.state.product) {
            const product = location.state.product;
            setFormData({
                name: product.name || "",
                price: product.price || "",
                discount: product.discount || "0",
                quantity: product.quantity || "",
                about: product.about || "",
                category: product.category || "veg",
                adminEarningPercentage: product.adminEarningPercentage || "0",
                supervisorEarningPercentage: product.supervisorEarningPercentage || "0",
                employeeEarningPercentage: product.employeeEarningPercentage || "0"
            });
        } else {
            // If no state, we could fetch it by ID, but for now just redirect back
            toast.error("Product details not found");
            navigate("/products");
        }
    }, [location.state, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.put(`/product/update-product/${id}`, formData);
            toast.success("Product updated successfully");
            navigate("/products");
        } catch (error) {
            console.error("Error updating product:", error);
            const errorData = error.response?.data;
            const errorMsg = typeof errorData?.message === 'string'
                ? errorData.message
                : (typeof errorData?.message === 'object' ? JSON.stringify(errorData.message) : "Failed to update product.");

            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <div className="header">
                <h2>Edit Product</h2>
                <p>Update the details of the product.</p>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            min="0"
                            max="100"
                        />
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                        </select>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>About Product</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="section-title">Earning Percentages</div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Admin (₹)</label>
                        <input
                            type="number"
                            name="adminEarningPercentage"
                            value={formData.adminEarningPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label>Supervisor (₹)</label>
                        <input
                            type="number"
                            name="supervisorEarningPercentage"
                            value={formData.supervisorEarningPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee (₹)</label>
                        <input
                            type="number"
                            name="employeeEarningPercentage"
                            value={formData.employeeEarningPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="form-actions" style={{ display: 'flex', gap: '15px' }}>
                    <button type="submit" className="submit-btn" disabled={loading} style={{ flex: 1 }}>
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        className="submit-btn"
                        onClick={() => navigate('/products')}
                        style={{ flex: 1, backgroundColor: '#6c757d', borderColor: '#6c757d' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
