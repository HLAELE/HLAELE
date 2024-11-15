// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Change this according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <nav id='targetdash'>
          <Link to="/products" style={{ marginRight: '15px' }}>Product Management</Link>
          <Link to="/users" style={{ marginRight: '15px' }}>User Management</Link>
          <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
        </nav>
      </header>

      <section style={{ marginTop: '20px' }}>
        {products.length === 0 ? (
          <p>CURRENTLY THERE ARE NO PRODUCTS  AVAILABLE !!!</p>
        ) : (
          <div>
            <ProductBarChart products={products} /> {/* Render the ProductBarChart */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f4f4f4' }}>Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f4f4f4' }}>Description</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f4f4f4' }}>Price</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f4f4f4' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${formatPrice(product.price)}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;