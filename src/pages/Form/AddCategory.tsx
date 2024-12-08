import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { addCategory } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authStatus } from '../../types/status';


const AddCategoryPage = () => {
  const {status}=useAppSelector((state)=>state.datas)
  const navigate=useNavigate()
  const dispatch = useAppDispatch()
  const [data,setData]=useState<{
    categoryName:string
  }>({
    categoryName:"",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addCategory(data))
    if(status==authStatus.success){
      navigate("/tables")
    }
    
  }
  return (
    <>
      <Breadcrumb pageName="Category" />

      <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
        <div
          className="bg-white w-11/12 lg:w-8/12 md:w-6/12 shadow-2xl rounded-lg"
          style={{ marginTop: '-100px' }}
        >
          <form className="p-6 md:p-10" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Add New Category
            </h2>

            {/* Add Category Name*/}
            <div className="relative mb-6">
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                className="w-full pl-12 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Category Name"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 shadow-lg transform hover:scale-105 transition-transform"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
