import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

// Chakra imports
import {
  Box,Button,
  Flex,
  FormControl,FormLabel,
  Input,
  Text,
  Table,
  Tbody,
  Menu,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { MdModeEdit, MdDelete} from "react-icons/md";

// Custom components
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import Card from "components/card/Card.js";
import Swal from 'sweetalert2'
import axios from 'axios'

export default function OrganizerEvents() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const API_ENDPOINT = 'http://localhost:8080';
  const [allEvents, setAllEvents] = useState([]);
  const [unapprovedEvents, setUnapprovedEvents] = useState([]);
  const [rejectedEvents, setRejectedEvents] = useState([]);
  const history = useHistory();
  
  const [isUpdateCheck, setIsUpdateCheck] = useState(false);
  

  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [editEvent, setEditEvent] = useState({
    ad_id: 0,
    ad_title: '',
    ad_img_loc: '',
    ad_begin_time: '',
    ad_end_time: '',
  });
  const handleChange = (e) => {
    // Update the form data as the user types
    console.log(editEvent)
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };
  const [capacity, setCapacity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerGroups = ["Ad Title", "Ad Url", "Start Time", "End Time"]

  useEffect(async () => {
    await axios.get(`${API_ENDPOINT}/ad/get/all/status?approval=approved`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            // sessionStorage.setItem("", JSON.stringify(response.data.user))
            setAllEvents(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    await axios.get(`${API_ENDPOINT}/ad/get/all/status?approval=in-progress`)
      .then(function (response) {
        console.log(response);
        if(response.status == 200) {
          // sessionStorage.setItem("", JSON.stringify(response.data.user))
          setUnapprovedEvents(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
    });
    
    await axios.get(`${API_ENDPOINT}/ad/get/all/status?approval=rejected`)
      .then(function (response) {
        console.log(response);
        if(response.status == 200) {
          // sessionStorage.setItem("", JSON.stringify(response.data.user))
          setRejectedEvents(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
    });
  }, [])

  const deleteAd = (async (ad_id) => {
    await axios.delete(`${API_ENDPOINT}/ad/delete?ad_id=${ad_id}`)
        .then(function (response) {
          console.log(response);
          if(response.status == 200) {
            // sessionStorage.setItem("", JSON.stringify(response.data.user))
            // Swal.fire({
            //   title: "Event Rejected!",
            //   icon: "success"
            // });
            console.log(response.data)
            Swal.fire({
              icon: "success",
              title: "Ad Deleted Successfully!",
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  })


  const handleSubmit = async (e) => {
  
    e.preventDefault();

    const {eventName, eventDescrp, start_time, end_time, last_registration_date } = e.target;

    console.log(editEvent);
    console.log(isUpdateCheck)

    if(isUpdateCheck) {
      await axios.post(`${API_ENDPOINT}/ad/update`,
      {
        "ad_id": editEvent.ad_id,
        "ad_title": editEvent.ad_title,
        "ad_img_loc": editEvent.ad_img_loc,
        "ad_begin_time" : editEvent.start_time,
        "ad_end_time" : editEvent.end_time,
        "ad_org_id": 1
      })
      .then(function (response) {
        // console.log(response);
        if(response.status == 200) {
          onClose();
          Swal.fire({
            title: "Ad Updated Successfully!",
            text: "Your Ad has updated successfully",
            icon: "success"
          });
          window.location.reload();
          // console.log(history)
          // history.push('/admin/all-event')
        }
      })
      .catch(function (error) {
        // .log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong",
          confirmButtonText: "Try Again!"
        });
      });
    }
    else{
    // Pass to API
      await axios.post(`${API_ENDPOINT}/ad/create`,
      {
        "ad_title": editEvent.ad_title,
        "ad_img_loc": editEvent.ad_img_loc,
        "ad_begin_time" : editEvent.start_time,
        "ad_end_time" : editEvent.end_time,
        "ad_org_id": 1
      })
      .then(function (response) {
        // console.log(response);
        if(response.status == 200) {
          Swal.fire({
            title: "Ad Created Successfully!",
            text: "Your Ad has been sent for Admin approval",
            icon: "success"
          });
          window.location.reload();
          // history.push('/admin/all-event')
        }
      })
      .catch(function (error) {
        // .log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong",
          confirmButtonText: "Try Again!"
        });
      });
    }
  }

  return (
    <Card
      mt="100px"
      direction='row'
      w='100%'
      px='2px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='4xl'
          mt='40px'
          mb='4px'>
          All Ads
        </Text>
        <Button
          onClick={() => {setIsUpdateCheck(false); setEditEvent({}); onOpen()}}
          variant='darkBrand'
          color='white'
          fontSize='xl'
          fontWeight='500'
          borderRadius='10px'
          px='24px'
          py='5px'>
          Add Ad
        </Button> 
      </Flex>
        <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
              <Text
                color={"green"}
                fontSize='20px'
                fontWeight='700'
                lineHeight='100%'>
                Approved Ads
              </Text>
              <Menu />
            </Flex>
            <Table variant='simple' color='gray.500' mb='24px'>
              <Thead>
                  <Tr key="headers">
                  {headerGroups.map((headerGroup) => (
                    <Th
                      pe='10px'
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color='gray.400'>
                        {headerGroup}
                      </Flex>
                    </Th>
                    ))}
                  </Tr>
              </Thead>
              <Tbody>
                {allEvents.map((tData, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_title}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_img_loc}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_begin_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_end_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td>
                      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                        <Button onClick={()=> { setIsUpdateCheck(true);
                          setEditEvent({
                          ad_title: tData.ad_title,
                          ad_img_loc: tData.ad_img_loc,
                          start_time: tData.ad_begin_time,
                          end_time: tData.ad_end_time,
                          }); onOpen()}}>
                          <Icon as={MdModeEdit} width='20px' height='20px' color='inherit' /> 
                        </Button>
                      </Flex>
                      </Td>    
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Card>
          {/* <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='20px'
            mb='4px'>
            Update Event
          </Text> */}
          <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Ad Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <form onSubmit={handleSubmit} style={{'padding':'20px'}}>
                <FormControl>
                  {/* First Name  */}
                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    Ad Title
                  </FormLabel>
                  <Input variant='auth' name="ad_title" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='text' 
                  placeholder='Enter Ad Title' mb='24px' onChange={handleChange} defaultValue={editEvent.ad_title || ""} fontWeight='500' size='lg'
                  />
                  <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    Ad Image Url
                  </FormLabel>
                  <Input variant='auth' name="ad_img_loc" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='textarea' 
                  placeholder='Enter Ad Image url' onChange={handleChange} defaultValue={editEvent.ad_img_loc || ""} mb='24px' fontWeight='500' size='lg'
                  />
                  <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                    Start Time
                  </FormLabel>
                  <Input variant='auth' name="start_time" fontSize='sm' ms={{ base: "0px", md: "0px" }} type='datetime-local' 
                  mb='24px' onChange={handleChange} defaultValue={editEvent.start_time || ""} fontWeight='500' size='lg'
                  />
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='datetime-local'
                    name = 'end_time'
                    onChange={handleChange}
                    defaultValue={editEvent.end_time || null}
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                  />
                  <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                    <Button type="submit"
                      fontSize='sm'
                      variant='brand'
                      fontWeight='500'
                      w='100%'
                      h='50'
                      mb='24px'>
                      {isUpdateCheck ? "Update Ad": "Create Ad"}
                      
                    </Button>
                  </Flex>
                </FormControl>
                </form>
              </ModalBody>
              {/* <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
          </>
        </SimpleGrid>
      </Box>

      {/* In-Progress Table */}
      <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
              <Text
                color={"Orange"}
                fontSize='20px'
                fontWeight='700'
                lineHeight='100%'>
                In-Progress Ads
              </Text>
              <Menu />
            </Flex>
            <Table variant='simple' color='gray.500' mb='24px'>
              <Thead>
                  <Tr key="headers">
                  {headerGroups.map((headerGroup) => (
                    <Th
                      pe='10px'
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color='gray.400'>
                        {headerGroup}
                      </Flex>
                    </Th>
                    ))}
                  </Tr>
              </Thead>
              <Tbody>
                {unapprovedEvents.map((tData, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_title}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_img_loc}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_begin_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_end_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td>
                      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                        <Button onClick={()=> { setIsUpdateCheck(true);
                          setEditEvent({
                          ad_id: tData.ad_id,
                          ad_title: tData.ad_title,
                          ad_img_loc: tData.ad_img_loc,
                          ad_begin_time: tData.ad_begin_time,
                          ad_end_time: tData.ad_end_time,
                          }); onOpen()}}>
                          <Icon as={MdModeEdit} width='20px' height='20px' color='inherit' /> 
                        </Button>
                        <Button onClick={()=> { deleteAd(tData.ad_id);
                          }}>
                          <Icon as={MdDelete} width='20px' height='20px' color='inherit' /> 
                        </Button>
                      </Flex>
                      </Td>     
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Card>
        </SimpleGrid>
      </Box>

      {/* Rejected Table */}
      <Box p={{ base: "10px", md: "40px", xl: "40px" }}>
          <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
              <Text
                color={"red"}
                fontSize='20px'
                fontWeight='700'
                lineHeight='100%'>
                Rejected ads
              </Text>
              <Menu />
            </Flex>
            <Table variant='simple' color='gray.500' mb='24px'>
              <Thead>
                  <Tr key="headers">
                  {headerGroups.map((headerGroup) => (
                    <Th
                      pe='10px'
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color='gray.400'>
                        {headerGroup}
                      </Flex>
                    </Th>
                    ))}
                  </Tr>
              </Thead>
              <Tbody>
                {rejectedEvents.map((tData, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_title}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_img_loc}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_begin_time}
                          </Text>
                        </Flex>
                      </Td> 
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {tData.ad_end_time}
                          </Text>
                        </Flex>
                      <Flex pl='25px' pr='25px' justify='space-between' mb='10px' align='center'>
                        <Button onClick={()=> { setIsUpdateCheck(true);
                          setEditEvent({
                          ad_title: tData.ad_title,
                          ad_img_loc: tData.ad_img_loc,
                          event_description: tData.event_description,
                          ad_begin_time: tData.ad_begin_time,
                          ad_end_time: tData.ad_end_time,
                          }); onOpen()}}>
                          <Icon as={MdModeEdit} width='20px' height='20px' color='inherit' /> 
                        </Button>
                      </Flex>
                      </Td>     
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Card>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
