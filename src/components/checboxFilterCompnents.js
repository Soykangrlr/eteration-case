import React, { useEffect, useState } from "react";
import {
  SelectAllProducts,
  checkBoxFilterBrands,
  checkBoxFilterModels,
  resetProducts,
  setBrandsFilter,
  setModelsFilter,
} from "../store/ProductSlice";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
function ChecboxFilterComponenets({ type }) {
  const { models, brands, brandsFilter,modelsFilter} = useSelector((state) =>
    SelectAllProducts(state)
  );
const [searchText,setSearchText]=useState("")
const [brand,setBrand]=useState(brands)
const [model,setModel]=useState(models)
 useEffect(()=>{
  setModel(models)
  setBrand(brands)
 },[models,brands])
  const dispatch = useDispatch();
  useEffect(() => {
    if (type==="brand") {
      if (brandsFilter.length > 0) {
        if(modelsFilter.length===0){dispatch(resetProducts())}
        dispatch(checkBoxFilterBrands({ type: type, filters: brandsFilter }));
      
    }else {
        if (modelsFilter.length > 0) {
            if(brandsFilter.length===0){dispatch(resetProducts())}
            dispatch(checkBoxFilterModels({ type: "model", filters: modelsFilter }));}}

   if(modelsFilter.length===0 && brandsFilter.length===0){
    dispatch(resetProducts())
   }
            
    }
  }, [brandsFilter,modelsFilter]);

  useEffect(()=>{
  if(type='brand'){
    const filterBrand=brands.filter(item=>item.toLowerCase().includes(searchText.toLowerCase()))
    setBrand(filterBrand)
  }
  if(type='model'){
    const filterModel=models.filter(item=>item.toLowerCase().includes(searchText.toLowerCase()))
    setModel(filterModel)
  }
  },[searchText])
  function CheckboxChange(e) {
    if(type==="brand"){
        dispatch(setBrandsFilter(e.target.value))
      }else{
        dispatch(setModelsFilter(e.target.value))
      }
  }

  return (
    <div className="bg-white shadow-md md:mt-10  ">
      
            <div className="relative">           
                <CiSearch className="absolute top-1.5 z-999 left-2"/>
        <input placeholder="seacrh" value={searchText} onChange={(e)=>setSearchText(e.target.value)} className="pl-8 py-1 h-full w-full bg-white"/>
        </div>
 
       
       <div className="max-h-[180px] overflow-y-auto p-2">
      <FormGroup  onChange={(e) => CheckboxChange(e)}>
        {type === "brand"
          ? brand.map((item, index) => (
              <FormControlLabel
                checked={brandsFilter.includes(item)}
                value={item}
                key={index}
                control={<Checkbox />}
                label={item}
              />
            ))
          : model.map((item, index) => (
              <FormControlLabel
                checked={modelsFilter.includes(item)}
                value={item}
                key={index}
                control={<Checkbox />}
                label={item}
              />
            ))}
      </FormGroup>
      </div> 
    </div>
  );
}

export default ChecboxFilterComponenets;
