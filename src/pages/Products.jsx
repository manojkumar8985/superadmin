import { useEffect, useState } from "react";
import API from "../services/api";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [editFormData, setEditFormData] = useState({
        name: "",
        price: "",
        discount: "",
        quantity: "",
        about: "",
        category: "veg"
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await API.get("/product/fetch-products");
            setProducts(res.data.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pr_id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await API.delete(`/product/delete-product/${pr_id}`);
                setProducts(products.filter((p) => p.pr_id !== pr_id));
                alert("Product deleted successfully");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product");
            }
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            about: product.about,
            category: product.category
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/product/update-product/${editingProduct.pr_id}`, editFormData);
            setProducts(products.map(p => p.pr_id === editingProduct.pr_id ? { ...p, ...editFormData } : p));
            setEditingProduct(null);
            alert("Product updated successfully");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="products-container">
            <div className="products-header">
                <h2>Products Management</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.pr_id}>
                                <td>
                                    <img
                                        src={product.images?.[0]?.url || "https://via.placeholder.com/50"}
                                        alt={product.name}
                                        className="product-thumb"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td><span className={`badge ${product.category}`}>{product.category}</span></td>
                                <td>₹{product.price}</td>
                                <td>{product.discount}%</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => startEdit(product)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(product.pr_id)} className="delete-btn">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Product</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} required />
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Discount (%)</label>
                                    <input type="number" name="discount" value={editFormData.discount} onChange={handleEditChange} required />
                                </div>
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label>Stock Quantity</label>
                                    <input type="number" name="quantity" value={editFormData.quantity} onChange={handleEditChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select name="category" value={editFormData.category} onChange={handleEditChange}>
                                        <option value="veg">Veg</option>
                                        <option value="non-veg">Non-Veg</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>About Product</label>
                                <textarea name="about" value={editFormData.about} onChange={handleEditChange} rows="3"></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Update Product</button>
                                <button type="button" onClick={() => setEditingProduct(null)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
