import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { API } from '../../http';
import { Category, Product } from '../../types/data';
import { AddProduct, addProduct } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authStatus } from '../../types/status';

const AddProductPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { status } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchcategories = async () => {
    const response = await API.get('/category');
    if (response.status == 200) {
      setCategories(response.data.data);
    } else {
      setCategories([]);
    }
  };
  const [data, setData] = useState<AddProduct>({
    productName: '',
    description: '',
    price: 0,
    categoryId: '',
    image: null,
    productQuantity: 0,
  });
  useEffect(() => {
    fetchcategories();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setData({
      ...data,
      [name]: name == 'image' ? files?.[0] : value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(data)).then(()=>{
      navigate('/tables');
    })
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
        Add New Product
      </h2>

      {/* Product Name */}
      <div className="relative mb-6">
        <input
          type="text"
          name="productName"
          id="productName"
          className="w-full pl-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
          placeholder="Product Name"
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
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Product image */}
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
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder-gray-500"
        >
          {categories?.length > 0 &&
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
        Add Product
      </button>
    </form>
  </div>
</div>
</>
  );
};

export default AddProductPage;
