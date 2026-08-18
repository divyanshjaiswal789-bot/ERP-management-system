const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data file
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    users: [
      { id: 1, name: 'Admin', email: 'admin@test.com', password: 'admin123', role: 'Admin' }
    ],
    products: [
      { id: 1, title: 'Laptop', SKU: 'LAP001', price: 999.99, stock: 5, reorderLevel: 2 },
      { id: 2, title: 'Mouse', SKU: 'MOU001', price: 29.99, stock: 50, reorderLevel: 10 },
      { id: 3, title: 'Keyboard', SKU: 'KEY001', price: 79.99, stock: 20, reorderLevel: 5 }
    ]
  }));
}

// Helper functions
const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Simple auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token === 'null') {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  req.userId = parseInt(token);
  next();
};

// ==================== USER ROUTES ====================
app.post('/api/users/register', (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const data = getData();
    
    if (data.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const user = {
      id: Math.max(...data.users.map(u => u.id), 0) + 1,
      name,
      email,
      password,
      role: role || 'Sales'
    };
    
    data.users.push(user);
    saveData(data);
    
    res.json({
      success: true,
      token: String(user.id),
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const data = getData();
    
    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      success: true,
      token: String(user.id),
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users/me', authenticate, (req, res) => {
  try {
    const data = getData();
    const user = data.users.find(u => u.id === req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== PRODUCT ROUTES ====================
app.get('/api/products', authenticate, (req, res) => {
  try {
    const data = getData();
    res.json({ success: true, products: data.products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', authenticate, (req, res) => {
  try {
    const { title, SKU, price, stock, reorderLevel } = req.body;
    const data = getData();
    
    if (data.products.find(p => p.SKU === SKU)) {
      return res.status(400).json({ message: 'SKU already exists' });
    }
    
    const product = {
      id: Math.max(...data.products.map(p => p.id), 0) + 1,
      title,
      SKU,
      price: parseFloat(price),
      stock: parseInt(stock),
      reorderLevel: parseInt(reorderLevel)
    };
    
    data.products.push(product);
    saveData(data);
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/products/:id', authenticate, (req, res) => {
  try {
    const data = getData();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    Object.assign(product, req.body);
    saveData(data);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/products/:id', authenticate, (req, res) => {
  try {
    const data = getData();
    const index = data.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    data.products.splice(index, 1);
    saveData(data);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve HTML for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   ✅ ERP Management System Running!       ║');
  console.log('║   🌐 http://localhost:5000                ║');
  console.log('║   📧 Demo: admin@test.com / admin123     ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
});
