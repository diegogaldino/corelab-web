import { Box, Flex, Heading, Link} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { goToCar } from "../../routes/Coordinator";


export function Header() {

  const navigate = useNavigate()
  
  return (
    <Flex 
      as="header" 
      justify="center" 
      align="center" 
      p={1} borderBottom="1px">

      <Flex 
        w="70%" 
        justify="space-between" 
        align="center" >
          <Heading 
            size={"3xl"} 
            color={"teal"}>
              AutoCar
          </Heading>
          <Box>
            <Link onClick={()=>goToCar(navigate)}>
              Carros
            </Link>
          </Box>
      </Flex>
    </Flex>
  )
}