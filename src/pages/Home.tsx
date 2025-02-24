import React from "react";
import { Button, Carousel, Card } from "antd";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { useGetAllProductDataQuery } from "../redux/Features/productManagement/productApi";
import { TOrderProduct } from "../types";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Blog from "../components/Home/Blog";

// import { useGetProductsQuery } from '../store/api';
// import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { data: res, isLoading } = useGetAllProductDataQuery([
    { name: "limit", value: "6" },
  ]);

  const products = res?.data?.result;
  console.log(products);

  const carouselItems = [
    {
      title: "Back to School Sale",
      description: "Get up to 50% off on school supplies",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    },
    {
      title: "Art Supplies Collection",
      description: "Professional supplies for artists",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
    },
    {
      title: "Office Essentials",
      description: "Everything you need for your workspace",
      image: "https://images.unsplash.com/photo-1455894127589-22f75500213a",
    },
  ];

  return (
    <div>
      <Carousel autoplay className="mb-12">
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div
              className="relative h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl mb-8">{item.description}</p>
                  <Link to="/products">
                    <Button type="primary" size="large">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* features product */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button type="link" className="flex items-center">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <Card loading />
            ) : (
              products?.map((product: TOrderProduct) => (
                <ProductCard key={product?._id} product={product} />
              ))
            )}
          </div>
        </section>

        <WhyChooseUs />
        <Blog/>
      </div>
    </div>
  );
};

export default Home;
