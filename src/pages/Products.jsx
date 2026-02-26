import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await API.get("/product/fetch-products");
            setProducts(res.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pr_id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await API.delete(`/product/delete-product/${pr_id}`);
                setProducts(products.filter((p) => p.pr_id !== pr_id));
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const startEdit = (product) => {
        navigate(`/edit-product/` + product.pr_id, { state: { product } });
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
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
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
                                <td>
                                    <span className={`badge ${product.category}`}>
                                        {product.category}
                                    </span>
                                </td>
                                <td>₹{product.price}</td>
                                <td>{product.discount}%</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => startEdit(product)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.pr_id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Products;