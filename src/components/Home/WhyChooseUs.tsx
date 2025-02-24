import {  Star } from "lucide-react";
import Heading from "../common/Heading";

const WhyChooseUs = () => {
  return (
    <>
      {/* why choose us */}
      <section className="mb-16">
        <Heading />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We source only the finest stationery products from trusted brands.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to your doorstep.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">
              Dedicated support team to assist you with any queries.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
