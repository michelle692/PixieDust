// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

extend({ TextGeometry });

/* Button CSS */
const buttonStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgb(209,213,219)",
  borderRadius: ".5rem",
  boxSizing: "border-box",
  color: "#111827",
  fontFamily: "Roboto",
  fontSize: ".5rem",
  fontWeight: "600",
  lineHeight: "1.25rem",
  padding: ".2rem .5rem",
  textDecoration: "none #D1D5DB solid",
  textDecorationThickness: "auto",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  bottom: "4vh",
  left: "7vw",

  "&:hover": {
    backgroundColor: "rgb(249,250,251)"
  }
}

//variable for bgc that is changed by dropdown onChange
const backgroundColor = {};
//import this into other files to access option chosen
export default backgroundColor;

export function DropDown(props){
  return (
    <select 
        id = "backgroundColor" 
        style={buttonStyle} 
        //function to set bgc when dropdown option is picked
        onChange={e => {
            backgroundColor.theme = e.target.value
        }}
    >  
        <option> ---Choose theme--- </option>  
        <option value="mood"> Mood </option>  
        <option value="party"> Party </option> 
        {/*add options here for more theme choices*/}

    </select>
  
  )
}