import { useState } from "react";
import API from "../services/api";
import "./CreateProduct.css";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discount: "0",
        quantity: "",
        about: "",
        category: "veg",
        adminEarningPercentage: "0",
        supervisorEarningPercentage: "0",
        employeeEarningPercentage: "0",
    });
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newPreviews = files.map((file) => URL.createObjectURL(file));

        setImages((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        // Clean up memory
        URL.revokeObjectURL(previews[index]);

        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        images.forEach((image) => {
            data.append("images", image);
        });

        try {
            const response = await API.post("/product/create-product", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                setMessage({ type: "success", text: "Product created successfully!" });
                setFormData({
                    name: "",
                    price: "",
                    discount: "0",
                    quantity: "",
                    about: "",
                    category: "veg",
                    adminEarningPercentage: "0",
                    supervisorEarningPercentage: "0",
                    employeeEarningPercentage: "0",
                });
                setImages([]);
                setPreviews([]);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            const errorData = error.response?.data;
            const errorMsg = typeof errorData?.message === 'string'
                ? errorData.message
                : (typeof errorData?.message === 'object' ? JSON.stringify(errorData.message) : "Failed to create product.");

            setMessage({
                type: "error",
                text: errorMsg,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <div className="header">
                <h2>Create New Product</h2>
                <p>Fill in the details below to add a new product to the store.</p>
            </div>

            {message.text && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Premium Leather Jacket"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
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
                            placeholder="0"
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
                            placeholder="Auto-inventory"
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
                        placeholder="Detailed description of the product..."
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="section-title">Earning Percentages</div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Admin (%)</label>
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
                        <label>Supervisor (%)</label>
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
                        <label>Employee (%)</label>
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

                <div className="form-group full-width">
                    <label>Product Images</label>
                    <div className="image-upload-wrapper">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            id="image-input"
                        />
                        <label htmlFor="image-input" className="image-upload-label">
                            <span>Click to upload images</span>
                            <small>You can select multiple files</small>
                        </label>
                    </div>

                    {previews.length > 0 && (
                        <div className="previews-header">
                            <span>Selected Images ({previews.length})</span>
                            <button type="button" className="clear-all" onClick={() => {
                                previews.forEach(src => URL.revokeObjectURL(src));
                                setImages([]);
                                setPreviews([]);
                            }}>Clear All</button>
                        </div>
                    )}

                    {previews.length > 0 && (
                        <div className="image-previews">
                            {previews.map((src, index) => (
                                <div key={index} className="preview-card">
                                    <img src={src} alt={`Preview ${index}`} />
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeImage(index)}
                                        title="Remove Image"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
