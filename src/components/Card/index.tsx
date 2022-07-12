import { Box, Text, useToast } from "@chakra-ui/react"
import { ICar } from "../../pages/Car"
import { CloseIcon, EditIcon, StarIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../parameters"


interface IProps{
  car:ICar
  getCars:Function
}

export function Card(props:IProps) {
  const toast = useToast();

  const navigate = useNavigate()

  async function favoriteCar() {
    try {
      const form = {
        id: props.car.id,
        favorite: !props.car.favorite
      }

      await axios.put(`${baseURL}/cars/favorite`, form)
      
      toast({
        title: "Veiculo favorito",
        description: "Veiculo favorito arualizado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      
      props.getCars()
    } catch (error) {
      toast({
        title: "Um erro ocorreu.",
        description: "Não foi possivel atualizado o veiculo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  async function deleteCar() {
    try {

      await axios.delete(`${baseURL}/cars/${props.car.id}`)
      
      toast({
        title: "Veiculo excluido",
        description: "Veiculo excluido.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      props.getCars()
    } catch (error) {
      toast({
        title: "Um erro ocorreu.",
        description: "Não foi possivel atualizado o veiculo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  function changeColor(color:string) {
    const colors: any = {
      azul:"blue",
      amarelo:"yellow",
      preto:"black",
      prata:"grey",
      branco:"white",
      vermelho:"red",
    }

    return colors[color]

  }

  return(
    <Box
      p={5}
      borderWidth={2}
      borderRadius={5}
      minW="300"
      bg={changeColor(props.car.color)}
      color={props.car.color}
    >

      <Text>{props.car.model}</Text>
      <Text>{props.car.manufacturer}</Text>
      <Text>{props.car.description}</Text>
      <Text>{props.car.color}</Text>
      <Text>R$ {props.car.price.toFixed(2).replace(".",",")}</Text>
      <Text>{props.car.year}</Text>
      
      <CloseIcon 
      cursor="pointer"
      onClick={()=>deleteCar()}
      w={4} h={4}/>

      <EditIcon 
        w={4} h={4} 
        cursor="pointer"
        onClick={
          ()=>navigate("/addEdit/",{state: props.car.id })
        }/>

      <StarIcon 
        w={4} h={4} 
        color={props.car.favorite?"red.500":"black"} 
        onClick={()=>favoriteCar()}
        cursor="pointer"/>
        
    </Box>
  )
}

