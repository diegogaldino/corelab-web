import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../parameters";
import { goToCar } from "../../routes/Coordinator";
import { Header } from "../Header";


interface ISubmitForm {
  id: string,
  model: string,
  color: string,
  manufacturer: string,
  description: string,
  license: string,
  favorite: boolean,
  year: number,
  price: number
}

export function AddEditCar() {
 
  const [id, setId] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [manufacturer, setManufacturer] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [license, setLicense] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [year, setYear] = useState<number>((new Date()).getFullYear())

  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate()


  useEffect(() => {
    getCar()
  }, [])

  async function getCar() {
    try {

      const result = await axios.get(`${baseURL}/cars/${location.state}`)

      if (result.data) {
        setId(result.data.id)
        setModel(result.data.model)
        setColor(result.data.color)
        setManufacturer(result.data.manufacturer)
        setDescription(result.data.description)
        setLicense(result.data.license)
        setFavorite(result.data.favorite)
        setYear(result.data.year)
        setPrice(result.data.price)
      }


    } catch (error) {

    }
  }


  async function addOrEditCar(event: FormEvent) {
    event.preventDefault()
    
    try {
      
      const form: ISubmitForm = {
        id,
        model,
        color,
        manufacturer,
        description,
        license,
        favorite,
        year,
        price,
      }

      
      if (location.state) {
        await axios.put(`${baseURL}/cars`, form)
      } else {
        await axios.post(`${baseURL}/cars`, form)
      }
      goToCar(navigate)
      toast({
        title: "Veiculo adicionado",
        description: "Nos adicionamos um veiculo para voce.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      toast({
        title: "Um erro ocorreu.",
        description: "Não foi possivel adicionar o veiculo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
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
        <Heading>Adicione seu veiculo</Heading>
        <form onSubmit={(event: FormEvent) => addOrEditCar(event)} >
          <Flex
            justifyItems={"space-between"}
            direction={["column", "column", "row", "row"]}
            gap='3'>

            <FormControl mt="10px">
              <FormLabel>Modelo</FormLabel>
              <Input
                value={model}
                onChange={(e)=>setModel(e.target.value)}
                type="text"
                variant="outline"
                placeholder="Digite o nome do modelo do veiculo"
                isRequired
              />
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Fabricante</FormLabel>
              <Input
                value={manufacturer}

                onChange={(e)=>setManufacturer(e.target.value)}
                variant="outline"
                placeholder="Digite o fabricante do veiculo"
                isRequired
              />
            </FormControl>
            <FormControl mt="10px">
              <FormLabel>Preço</FormLabel>

              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type={"number"}
                  value={price}

                  onChange={(e)=>setPrice(Number(e.target.value))} 
                  placeholder='Digite o preço do veiculo'
                  isRequired
                  variant="outline" />
              </InputGroup>

            </FormControl>
          </Flex>

          <Flex
            justifyItems={"space-between"}
            direction={["column", "column", "row", "row"]}
            gap='3'>

            <FormControl mt="10px" >
              <FormLabel>Fabricação</FormLabel>
              <NumberInput
                value={year}
                onChange={(e) => setYear(Number(e))}
                step={1}
                defaultValue={(new Date()).getFullYear()}
                min={1900}
                max={(new Date()).getFullYear()}>

                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt="10px" >
              <FormLabel>Cor</FormLabel>
              <Input
                value={color}
                onChange={(e)=>setColor(e.target.value)}
                variant="outline"
                placeholder="Digite a cor do veiculo"
                isRequired
              />
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Placa</FormLabel>
              <Input
                value={license}
                onChange={(e)=>setLicense(e.target.value)}
                variant="outline"
                placeholder="Digite a placa do veiculo"
                isRequired
              />
            </FormControl>
          </Flex>

          <FormControl mt="10px">
            <FormLabel >Descrição</FormLabel>
            <Textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              variant="outline"
              placeholder="Digite uma descição do veiculo"
              isRequired
            />
          </FormControl>

          <Button mt="20px" colorScheme='teal' size="lg" w="full" type="submit">Adicionar</Button>
        </form>
      </Box>
    </>
  )
}


