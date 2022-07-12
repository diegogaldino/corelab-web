import { Box, Button, Flex } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../components/Card"
import { Header } from "../components/Header"
import { baseURL } from "../parameters"
import { goToAddEdit } from "../routes/Coordinator"

export interface ICar {
  id: string,
  model: string,
  color: string,
  manufacturer: string,
  description: string,
  license: string,
  favorite:boolean,
  year: number,
  price: number
}

export function Car() {
  const [cars, setCars] = useState<[ICar]>()

  const navigate = useNavigate()

  useEffect(() => {
    getCars()
  }, [])

  async function getCars() {
    try {
      const result = await axios.get(`${baseURL}/cars`)
      if (result) setCars(result.data)
      console.log(result)
    } catch (error) {

    }
  }



  return (
    <>
      <Header/>
      <Box 
        borderWidth={2}
        p={5}
        borderRadius={5}
        maxW="70%"
        m="0 auto"
        mt={3}
      >
        <Button mt="10px" colorScheme='teal' size="lg" w="full" type="submit" onClick={()=>goToAddEdit(navigate)}>Adicionar</Button>
        
      </Box>
      <Flex
        mt={4}
        justify={"center"} 
        align={"center"}
        gap='3'
        flexWrap={"wrap"}
        direction={["column","column","row","row"]}
        
      >
        {
          cars && cars.map((car)=>{
            return(
              <Card 
                car={car} 
                getCars={()=>getCars()}
                key={car.id}/>
            )
          })
        }
      </Flex>

    </>
  )
}



