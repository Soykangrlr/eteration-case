import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
export const getProducts = createAsyncThunk("products/getProducs", async () => {
  try {
    const res = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
});
const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    restProducts: [],
    loading: false,
    basket: localStorage.getItem('eterationBasket')?JSON.parse(localStorage.getItem('eterationBasket')):[],
    models:[],
    brands:[],
    modelsFilter:[],
    brandsFilter:[]
  },
  reducers: {
    searchProducts: (state, action) => {
      state.products = state.products.filter((item) => {
        const modelBrand = item.model + " " + item.brand;
        return modelBrand.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
    resetProducts: (state) => {
      state.products = state.restProducts;
    },
    addBasket:(state,action)=>{
        const basket=state.basket
        const item=action.payload
        const index = basket.findIndex((basketItem) => basketItem.id === item.id);
        if (index !== -1) {
          
          const updatedBasket = [...basket];
          updatedBasket[index].count += 1;
          state.basket= updatedBasket
        } else {
         state.basket=[...basket, { ...item, count: 1 }]
        }
        localStorage.setItem("eterationBasket", JSON.stringify(state.basket));
    },
    

    removeBasket:(state,action)=>{
      const basket=state.basket
        const item=action.payload
      const updatedBasket = basket.map((basketItem) => {
        if (basketItem.id === item.id) {
        
          basketItem.count = basketItem.count > 1 ? basketItem.count - 1 : 0;
        }
        return basketItem;
      });
  
     
      const filteredBasket = updatedBasket.filter((item) => item.count > 0);
      state.basket=filteredBasket
      localStorage.setItem("eterationBasket", JSON.stringify(filteredBasket));
    },
    order:(state,action)=>{
 
      if(action.payload==="OldtoNew"){
   
        const sortedData = state.restProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const sortedDataProduct = state.products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        state.products=sortedDataProduct
        state.restProducts=sortedData
      }else if(action.payload==="NewtoOld"){
        const sortedData = state.restProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedDataProduct = state.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        state.products=sortedDataProduct
        state.restProducts=sortedData
      }else if(action.payload==3){
        const sortedDataByPrice = state.restProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        const sortedDataByPriceProducts = state.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        state.products=sortedDataByPriceProducts
        state.restProducts=sortedDataByPrice
      }else if(action.payload==4){
        const sortedDataByPrice = state.restProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        const sortedDataByPriceProducts = state.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        state.products=sortedDataByPriceProducts
        state.restProducts=sortedDataByPrice
      }
    },
    checkBoxFilterModels:(state,action)=>{
      const {type,filters}=action.payload

  
      var filterProducts= state.products.filter(product => filters.includes(product["model"]));
        state.products=filterProducts
    },
    checkBoxFilterBrands:(state,action)=>{
      const {type,filters}=action.payload
      
      var filterProducts= state.products.filter(product => filters.includes(product["brand"]));
        state.products=filterProducts
    },
    setBrandsFilter: (state, action) => {
      if (!state.brandsFilter.includes(action.payload)) {
        state.brandsFilter = [...state.brandsFilter, action.payload];
      } else {
        state.brandsFilter = state.brandsFilter.filter((item) => item !== action.payload);
      }
    },
  setModelsFilter:(state,action)=>{
    if (!state.modelsFilter.includes(action.payload)) {
      state.modelsFilter = [...state.modelsFilter, action.payload];
    } else {
      state.modelsFilter = state.modelsFilter.filter((item) => item !== action.payload);
    }
  }
  },
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.restProducts = action.payload;
      const productModels = action.payload.map(item => item.model);

      
      productModels.forEach(model => {
        if (!state.models.includes(model)) {
          state.models.push(model);
        }
      });
      const productBrands = action.payload.map(item => item.brand);

      
      productBrands.forEach(brands => {
        if (!state.brands.includes(brands)) {
          state.brands.push(brands);
        }
      });
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      toast.warn(`Hata : ${action.payload}`);
    });
  },
});
export const SelectAllProducts = (state) => state.products;
export const { searchProducts, resetProducts,addBasket,removeBasket,order,checkBoxFilterModels,checkBoxFilterBrands,setModelsFilter,setBrandsFilter } = ProductSlice.actions;
export default ProductSlice.reducer;
