import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
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
  const [cars, setCars] = useState<ICar[]>()
  const [carsFiltered, setCarsFiltered] = useState<ICar[]>()

  const [manufacturerOptions, setManufacturerOptions] = useState<string[]>()
  const [colorOptions, setColorOptions] = useState<string[]>()
  const [yearOptions, setYearOptions] = useState<number[]>()
  
  const [modelSelected, setModelSelected] = useState<string>("")
  const [manufacturerSelected, setManufacturerSelected] = useState<string>()
  const [colorSelected, setColorSelected] = useState<string>()
  const [yearSelected, setYearSelected] = useState<number>()
  const [priceMinSelected, setPriceMinSelected] = useState<number>(0)
  const [priceMaxSelected, setPriceMaxSelected] = useState<number>(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    getCars()
    populateFilters()
  }, [isOpen])

  async function getCars() {
    try {
      const result = await axios.get(`${baseURL}/cars`)
      if (result) setCars(result.data)
    } catch (error) {

    }
  }

  function populateFilters(){
    let list: string[]= []
    let listColor: string[]= []
    let listYear: number[]=[]
    cars?.map((car:ICar)=>{
      if(!list.includes(car.manufacturer)){
        list.push(car.manufacturer)
      }
      if(!listColor.includes(car.color)){
        listColor.push(car.color)
      }
      if(listYear.indexOf(car.year)===-1){
        listYear.push(car.year)
      }
      return car
    })
    setManufacturerOptions(list)
    setColorOptions(listColor)
    setYearOptions(listYear)
  }

  async function search(){
    try {
      let urlOptional:string = ""

      if(manufacturerSelected) urlOptional+=`/manufacturer/${manufacturerSelected}`
      if(colorSelected) urlOptional+=`/color/${colorSelected}`
      if(yearSelected) urlOptional+=`/year/${yearSelected}`
      if(priceMinSelected) urlOptional+=`/min/${priceMinSelected}`
      if(priceMaxSelected) urlOptional+=`/max/${priceMaxSelected}`

      const result = await axios.get(`${baseURL}/cars/search${urlOptional}`)

      if (result) setCarsFiltered(result.data)
        
      onClose()
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
        <Button onClick={onOpen}>Pesquisar</Button>
        <Input onChange={(e)=>setModelSelected(e.target.value)}/>
        <Button onClick={()=>setCarsFiltered([])}>Cancelar pesquisa</Button>
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
          carsFiltered?.length ?
            carsFiltered.filter((car)=>car.model.includes(modelSelected)).map((car)=>{
            return(
              <Card 
                car={car} 
                getCars={()=>getCars()}
                key={car.id}/>
            )
          })
          :
            cars?.filter((car)=>car.model.includes(modelSelected))
              .map((car)=>{
              return(
                <Card 
                  car={car} 
                  getCars={()=>getCars()}
                  key={car.id}/>
            )
          })
        }
      </Flex>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisar por</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select mt={3} placeholder='Selecione uma fabricante' onChange={(e)=>setManufacturerSelected(e.target.value)} >
              { manufacturerOptions?.map((manufact:string)=> <option key={manufact} value={manufact}>{manufact}</option>) }
            </Select>
            <Select mt={3} placeholder='Selecione uma cor' onChange={(e)=>setColorSelected(e.target.value)}>
              { colorOptions?.map((color:string)=> <option key={color} value={color}>{color}</option>) }
            </Select>
            <Select mt={3} placeholder='Selecione um ano' onChange={(e)=>setYearSelected(Number(e.target.value))}>
              { yearOptions?.sort().map((year:number)=> <option key={year} value={year.toString()}>{year.toString()}</option>) }
            </Select>

            <Flex mt={3}
              justifyItems={"space-between"}
              direction={["column", "column", "row", "row"]}
              gap='3'>

            <FormControl mt="10px">
              <FormLabel>Preço minimo</FormLabel>
              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type={"number"}
                  value={priceMinSelected}

                  onChange={(e)=>setPriceMinSelected(Number(e.target.value))} 
                  placeholder='Digite o preço do veiculo'
                  isRequired
                  variant="outline" />
              </InputGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Preço maximo</FormLabel>
              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type={"number"}
                  value={priceMaxSelected}

                  onChange={(e)=>setPriceMaxSelected(Number(e.target.value))} 
                  placeholder='Digite o preço do veiculo'
                  isRequired
                  variant="outline" />
              </InputGroup>
            </FormControl>

            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='teal' size="lg" w="full" type="submit" onClick={search}>Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



