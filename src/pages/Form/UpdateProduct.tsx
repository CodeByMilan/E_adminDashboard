import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Category } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../http';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { updateProduct } from '../../store/dataSlice';

const UpdateProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const { status } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    const response = await API.get('/category');
    if (response.status === 200) {
      setCategories(response.data.data);
    } else {
      setCategories([]);
    }
  };

  const [data, setData] = useState({
    productName: '',
    description: '',
    price: 0,
    categoryId: '',
    image: null,
    productQuantity: 0,
    productImageUrl: '', // To handle the current image URL for preview
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await API.get(`/product/${id}`);
      if (response.status === 200) {
        const product = response.data.data; // Correctly access `data`
        setData({
          productName: product.productName || '',
          description: product.description || '',
          price: product.price || 0,
          categoryId: product.categoryId || '',
          image: null, // File inputs can't be prefilled
          productQuantity: product.productQuantity || 0,
          productImageUrl: product.productImageUrl || '', // Current product image URL
        });
      }
    };
    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setData({
      ...data,
      [name]: name === 'image' && files ? files[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      console.error('Product ID is missing from the URL');
      return null;
    }
    dispatch(updateProduct(data, id)).then(() => {
      navigate('/tables');
    });
  };

  return (
    <>
      <Breadcrumb pageName="Product Form" />

      <div className="flex items-center justify-center h-screen bg-gray-50 overflow-hidden">
        <div
          className="bg-white w-11/12 lg:w-8/12 md:w-6/12 shadow-2xl rounded-lg transform hover:scale-105 transition-transform"
          style={{ marginTop: '-80px' }}
        >
          <form className="p-8 md:p-12" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Update Product
            </h2>

            {/* Product Name */}
            <div className="relative mb-6">
              <input
                type="text"
                name="productName"
                id="productName"
                className="w-full pl-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
                placeholder="Product Name"
                value={data.productName} // Controlled input
                onChange={handleChange}
              />
            </div>

            {/* Product Description */}
            <div className="relative mb-6">
              <textarea
                name="description"
                id="productDescription"
                className="w-full pl-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
                placeholder="Product Description"
                rows={4}
                value={data.description} // Controlled input
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Product Price */}
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="w-full pl-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
                  placeholder="Product Price"
                  value={data.price} // Controlled input
                  onChange={handleChange}
                />
              </div>

              {/* Product Stock */}
              <div className="relative">
                <input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  className="w-full pl-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
                  placeholder="Stock Quantity"
                  value={data.productQuantity} // Controlled input
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Product Image */}
            {data.productImageUrl && !data.image && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Current Product Image
                </label>
                <img
                  src={data.productImageUrl}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            <div className="relative mb-6 mt-6">
              <input
                type="file"
                name="image"
                id="productImage"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                onChange={handleChange}
              />
            </div>

            {/* Product Category */}
            <div className="mb-6">
              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Select Product Category
              </label>
              <select
                id="categories"
                name="categoryId"
                value={data.categoryId} // Controlled input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
              >
                <option value="" disabled>Select a Category</option>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.categoryName}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 shadow-lg transform hover:scale-105 transition-transform"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
