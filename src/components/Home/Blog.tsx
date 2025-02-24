
const Blog = () => {
    return (
        <section className="bg-white p-10 mb-16">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl">Latest Stationery Trends</h1>
    
              
            </div>
    
            <hr className="my-8 border-gray-200" />
    
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <img 
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80" 
                  src="https://images.unsplash.com/photo-1608178398319-48f814d0750c?auto=format&fit=crop&q=80"
                  alt="Colorful notebooks and pens"
                />
    
                <div className="mt-8">
                  <span className="text-blue-500 uppercase">Productivity</span>
    
                  <h1 className="mt-4 text-xl font-semibold text-gray-800">
                    The Art of Bullet Journaling
                  </h1>
    
                  <p className="mt-2 text-gray-500">
                    Discover how bullet journaling can transform your daily planning routine and boost your creativity with our premium notebook collection.
                  </p>
    
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <a href="#" className="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">
                        Emma Parker
                      </a>
    
                      <p className="text-sm text-gray-500">January 2, 2025</p>
                    </div>
    
                    {/* <a href="#" className="inline-block text-blue-500 underline hover:text-blue-400">Read more</a> */}
                  </div>
                </div>
              </div>
    
              <div>
                <img 
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80" 
                  src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80" 
                  alt="Fountain pens collection"
                />
    
                <div className="mt-8">
                  <span className="text-blue-500 uppercase">Writing Tools</span>
    
                  <h1 className="mt-4 text-xl font-semibold text-gray-800">
                    The Renaissance of Fountain Pens
                  </h1>
    
                  <p className="mt-2 text-gray-500">
                    Explore our curated collection of premium fountain pens and discover why more professionals are returning to this timeless writing instrument.
                  </p>
    
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <a href="#" className="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">
                        James Chen
                      </a>
    
                      <p className="text-sm text-gray-500">January 20, 2025</p>
                    </div>
    
                    {/* <a href="#" className="inline-block text-blue-500 underline hover:text-blue-400">Read more</a> */}
                  </div>
                </div>
              </div>
    
              <div>
                <img 
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80" 
                  src="https://images.unsplash.com/photo-1568871391149-449702439177?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhdGlvbmFyeSUyMHNob3B8ZW58MHx8MHx8fDA%3D" 
                  alt="Sustainable stationery products"
                />
    
                <div className="mt-8">
                  <span className="text-blue-500 uppercase">Eco-Friendly</span>
    
                  <h1 className="mt-4 text-xl font-semibold text-gray-800">
                    Sustainable Stationery Guide
                  </h1>
    
                  <p className="mt-2 text-gray-500">
                    Learn about our new line of eco-friendly stationery products and how making sustainable choices can impact our environment.
                  </p>
    
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <a href="#" className="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">
                        Sarah Green
                      </a>
    
                      <p className="text-sm text-gray-500">January 25, 2025</p>
                    </div>
    
                    {/* <a href="#" className="inline-block text-blue-500 underline hover:text-blue-400">Read more</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Blog