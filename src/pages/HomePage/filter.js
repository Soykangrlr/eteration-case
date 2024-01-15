import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Menu, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAllProducts, checkBoxFilter, order, resetProducts } from '../../store/ProductSlice'
import ChecboxFilterComponenets from '../../components/checboxFilterCompnents'

function Filter() {
    const dispatch=useDispatch()
    const [sort,setsort]=useState("OldtoNew")
  
    useEffect(()=>{
     
        dispatch(order(sort))
    },[sort])
  
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);
    const handleClick = (event) => {
        setAnchorElSort(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElSort(null);
    };
    const [anchorElBrand, setAnchorElBrand] = React.useState(null);
    const openBrand = Boolean(anchorElBrand);
    const handleClickBrand = (event) => {
        setAnchorElBrand(event.currentTarget);
    };
    const handleCloseBrand = () => {
        setAnchorElBrand(null);
    };
    const [anchorElModel, setAnchorElmodel] = React.useState(null);
    const openModel = Boolean(anchorElModel);
    const handleClickModel = (event) => {
        setAnchorElmodel(event.currentTarget);
    };
    const handleCloseModel = () => {
        setAnchorElmodel(null);
    };
    
    function SortProduct(){
       
        return(
            <div className='bg-white shadow-md p-2'>
            <RadioGroup
                
                value={sort}
                name="radio-buttons-group"
                onChange={(e)=>setsort(e.target.value)}
                defaultValue="OldtoNew"
            >
                <FormControlLabel value="OldtoNew" control={<Radio size='small' />}  label="Old to New" />
                <FormControlLabel value="NewtoOld" control={<Radio size='small' />} label="New to old" />
                <FormControlLabel value={3} control={<Radio size='small' />} label="Price hight to low" />
                <FormControlLabel value={4} control={<Radio  size='small'/>} label="Price low to High" />
            </RadioGroup>
           
            </div>
        )
    }

    return (
        <>
        <div className='basis-2/12  md:block hidden'>
            <SortProduct/>
            <ChecboxFilterComponenets type="model"/>  
            <ChecboxFilterComponenets type="brand"/>          
        </div>
    <div className='flex gap-x-5 md:hidden '>
        <Button   id="basic-button-sort"
            aria-controls={openSort ? "basic-menu-sort" : undefined}
            aria-haspopup="true"
            aria-expanded={openSort ? "true" : undefined}
            onClick={handleClick}
            size='small'
            className=" items-center text-sm">Sırala</Button>
             <Menu
            id="basic-menu-sort"
            anchorEl={anchorElSort}
            open={openSort}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button-sort",
            }}
          >
            <SortProduct/>
          </Menu>
          <Button   id="basic-button-brand"
            aria-controls={openBrand ? "basic-menu-brand" : undefined}
            aria-haspopup="true"
            aria-expanded={openBrand ? "true" : undefined}
            onClick={handleClickBrand}
            size='small'
            className=" items-center text-sm">Marka Filtre</Button>
             <Menu
            id="basic-menu-brand"
            anchorEl={anchorElBrand}
            open={openBrand}
            onClose={handleCloseBrand}
            MenuListProps={{
              "aria-labelledby": "basic-button-brand",
            }}
          >
            <ChecboxFilterComponenets type="brand"/>  
          </Menu>
          <Button   id="basic-button-model"
            aria-controls={openModel ? "basic-menu-model" : undefined}
            aria-haspopup="true"
            aria-expanded={openModel ? "true" : undefined}
            onClick={handleClickModel}
            size='small'
            className=" items-center text-sm">Model Filtre</Button>
             <Menu
            id="basic-menu-model"
            anchorEl={anchorElModel}
            open={openModel}
            onClose={handleCloseModel}
            MenuListProps={{
              "aria-labelledby": "basic-button-model",
            }}
          >
            <ChecboxFilterComponenets type="model"/>  
          </Menu>
    </div>
        
</>
    )
}

export default Filter
