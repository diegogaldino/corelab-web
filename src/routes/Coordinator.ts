import { NavigateFunction } from "react-router-dom"

export const goToHome=(navigate:NavigateFunction)=>{
  navigate("/")
}
export const goToCar=(navigate:NavigateFunction)=>{
  navigate("/car")
}
export const goToAddEdit=(navigate:NavigateFunction)=>{
  navigate("/addEdit")
}

export const goToBack = (navigate:NavigateFunction) => {
  navigate(-1)
}