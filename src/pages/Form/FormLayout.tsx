import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { APIAuthenticated } from '../../http';
import { Category, Product } from '../../types/data';
import { addProduct } from '../../store/dataSlice';
import { useAppDispatch } from '../../store/hooks';


const FormLayout = () => {
  const [categories,setCategories]=useState<Category[]>([])
  const dispatch = useAppDispatch()
  const fetchcategories=async ()=>{
    const response = await APIAuthenticated.get('/admin/category');
    if(response.status==200){
      setCategories(response.data.data)
    }
    else{
      setCategories([])
    }

  }
 
  const [data,setData]=useState<Product>({
    productName:"",
    description:"",
    price:0,
    categoryId:"",
    productImageUrl:"",
    productQuantity:0,
    userId:"",
  })
  useEffect(()=>{
    fetchcategories()
  },[])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addProduct(data))
  }
  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
        <div
          className="bg-white w-11/12 lg:w-8/12 md:w-6/12 shadow-2xl rounded-lg"
          style={{ marginTop: '-100px' }}
        >
          <form className="p-6 md:p-10" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Add New Product
            </h2>

            {/* Product Name */}
            <div className="relative mb-6">
              <input
                type="text"
                name="productName"
                id="productName"
                className="w-full pl-12 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Product Name"
                onChange={handleChange}
              />
            </div>

            {/* Product Description */}
            <div className="relative mb-6">
              <textarea
                name="description"
                id="productDescription"
                className="w-full pl-12 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  name="productPrice"
                  id="price"
                  className="w-full pl-12 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Product Price"
                  onChange={handleChange}
                />
              </div>

              {/* Product Stock */}
              <div className="relative">
                <input
                  type="number"
                  name="totalQuantity"
                  id="productQuantity"
                  className="w-full pl-12 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Stock Quantity"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="relative mb-6 mt-6">
              <input
                type="file"
                name="image"
                id="productImage"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
              {categories.length>0 && categories.map((category)=>{
                return(
                  <option value={category.id}>{category.categoryName}</option>
                  )
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

export default FormLayout;
