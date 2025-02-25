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

  const carouselItems = [
    {
      title: "Back to School Sale",
      description: "Get up to 50% off on school supplies",
      image: "img1.jpg",
    },
    {
      title: "Art Supplies Collection",
      description: "Professional supplies for artists",
      image: "img2.jpg",
    },
    {
      title: "Office Essentials",
      description: "Everything you need for your workspace",
      image: "img3.jpg",
    },
  ];

  return (
    <div>
      <Carousel className="mb-12" autoplay autoplaySpeed={5000}>
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            {/* Background Image */}
            <img
              src={item?.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent" />

            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 py-4 bg-black/40 rounded-lg">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {item.title}
                </h2>
                <p className="text-xl text-gray-200 mb-6">{item.description}</p>
                <Link to="/products">
                  <Button type="primary" size="large">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* <img src="https://i.ibb.co.com/rRWy7WWJ/img2.jpg" alt="" /> */}
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
        <Blog />
      </div>
    </div>
  );
};

export default Home;
