import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { late } from 'zod/v3';

const ContrySelect = ({value, onChange}) => {
    
    const [countries, setCountries] = useState([]);
    
    const countriesData = async () => {
            try{
            const responce = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag,flags")
            const data = await responce.json()
            const filterdata = data.filter((c) =>{
                return c.idd?.root && c.idd?.suffixes
            }).sort((a,b) => {
                return a.name.common.localeCompare(b.name.common);
            }).map((ci) => {
                return {value: `${ci.idd.root}${ci.idd.suffixes[0]}`,
                 label: (
            <div className="flex items-center gap-2">
              <img src={ci.flags.png} alt={ci.name.common} className="w-5 h-4" />
              <span>{ci.name.common} ({ci.idd.root}{ci.idd.suffixes[0]})</span>
            </div>
                 ),
                }
          
            })

            setCountries(filterdata);
        }catch(e){
            console.error("Error while Fetching data: ", e);
        }
    };
    useEffect(() => {
        countriesData()
    }, []);
    const darkSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#374151", // bg-gray-700
    borderColor: state.isFocused ? "#3B82F6" : "#4B5563", // blue ring on focus, gray border otherwise
    borderRadius: "0.5rem", // rounded-lg
    padding: "2px 8px",
    boxShadow: state.isFocused ? "0 0 0 2px #3B82F6" : "none",
    "&:hover": {
      borderColor: "#3B82F6",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#F9FAFB", // text-white
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#F9FAFB", // text-white
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF", // gray-400
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#374151", // bg-gray-700
    borderRadius: "0.5rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#2563EB" // blue-600 hover/focus
      : "#374151", // bg-gray-700
    color: state.isFocused ? "#F9FAFB" : "#F9FAFB", // text-white
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#1D4ED8", // blue-700
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#F9FAFB", // text-white
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#6B7280", // gray-500
  }),
};
  return (
    <div>
     <Select
     styles={darkSelectStyles}
      options={countries}
      value={countries.find((opt) => opt.value === value)}
      onChange={(opt) => onChange(opt.value)}
      placeholder="Select Country"
    />
      
    </div>
  )
}

export default ContrySelect
