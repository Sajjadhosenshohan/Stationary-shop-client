#  Elite Stationary

Elite Stationary is an e-commerce application designed to manage a stationery store. It allows users to browse stationery items, place orders, and complete payments securely using the SSLCommerz payment gateway.

## 🌐 Live Site URL
[Client Live Site](https://stationary-shop-client.vercel.app)

## 🚀 Features
- **Order Stationery Shop Items**: Users can select quantities, view total prices, and provide order details.
- **Order Update**: Users can update cart items and order multiple products.
- **Payment System**: Integrated SSLCommerz for secure and seamless transactions.
- **Profile Management**: Users can update personal information.

## 🧑‍💻 Technologies Used
- React.js
- Tailwind CSS
- TypeScript
- Redux Toolkit
- Ant Design

## 🛠️ Installation and Setup
Follow these steps to set up the project locally:

### 1️⃣ Clone the repository
```sh
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
VITE_CLOUD_NAME=<your_cloudinary_cloud_name>
VITE_UPLOAD_PRESET=<your_Cloudinary_upload_secret>
VITE_UPLOAD_LINK=<your_Cloudinary_upload_link>
```

**Note:** If you need to change `API_BASE_URL`, navigate to:
```
redux > api > baseApi.ts
```
and update it accordingly.

### 4️⃣ Start the development server
```sh
npm run dev
```

### 🔗 The application will be available at:
[http://localhost:5173](http://localhost:5173)
