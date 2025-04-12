# 📊 Language-Agnostic Visualization Web Application

This project is a web application that allows users to generate and view **static, interactive**, and **3D visualizations** by submitting custom scripts in **Python or R**. The scripts are securely executed on the backend, and the visualizations are rendered dynamically on the frontend.

---

## 🚀 Features

- Select between **Python** or **R** as the scripting language.
- Enter custom code to generate visualizations using supported libraries.
- View rendered output (static image or interactive HTML) directly in the browser.
- Supports:
  - **Static** visualizations (e.g., bar plots)
  - **Interactive** charts (e.g., Plotly/ggplotly)
  - **3D** plots (e.g., Plotly, rgl)

---

## 🛠 Tech Stack

### Frontend
- **React** (JavaScript)
- Dynamic form with code input, language selector, and iframe rendering

### Backend
- **Node.js (Express)**
- Executes scripts securely using `child_process.exec`
- Outputs are stored in a `public/` folder and served via HTTP

---

## 📦 Visualization Libraries Supported

### Python
- `matplotlib` (Static)
- `plotly` (Interactive & 3D)

### R
- `ggplot2` (Static)
- `plotly` (Interactive)
- `rgl` (3D)

---

## 🖼 Example Visualizations

### Python
- ✅ Static: `matplotlib` bar chart
- ✅ Interactive: `plotly` scatter plot
- ✅ 3D: `plotly` surface plot

### R
- ✅ Static: `ggplot2` bar chart
- ✅ Interactive: `plotly::ggplotly`
- ✅ 3D: `rgl::plot3d`

---

## 📂 Project Structure

/frontend ├── App.js # Main React component ├── visualization.js # Displays iframe or image for results └── App.css # Basic styling

/backend ├── index.js # Express server for code execution ├── public/ # Stores generated outputs (images/HTML)


---

## 🧪 How to Run Locally

### Prerequisites
- Node.js
- Python (with `matplotlib`, `plotly`)
- R (with `ggplot2`, `plotly`, `rgl`)
  
### Setup Backend

```bash
cd backend
npm install
node index.js

