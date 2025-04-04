import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Product } from "@/data/sellers";
import { getProductById } from "@/data/sharedProducts";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const productData = getProductById(id || "");
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error loading product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-craft-forest"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-craft-forest mb-4">{error || "Product not found"}</h2>
            <Link to="/" className="text-craft-forest hover:text-craft-forest/80">
              Return to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-craft-forest">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-craft-forest">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-serif text-craft-forest mb-4">{product.name}</h1>
            <p className="text-2xl text-craft-forest mb-6">₹{product.price}</p>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif text-craft-forest mb-2">Materials</h2>
              <ul className="list-disc list-inside text-gray-600">
                {product.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif text-craft-forest mb-2">Artisan</h2>
              <p className="text-gray-600">{product.artisan}</p>
            </div>

            <button className="w-full bg-craft-forest text-white py-3 px-6 rounded-lg hover:bg-craft-forest/90 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 