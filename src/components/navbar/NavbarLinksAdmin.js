// Chakra Imports
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UpdateRoutes } from 'routes';

import { routes } from 'routes.js';
export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const ethColor = useColorModeValue('gray.700', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const ethBox = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
	const history = useHistory();
	const handleProfileClick = () => {
		history.push('/admin/profile');
	  };
	
	  const handleLogoutClick = () => {
		sessionStorage.removeItem('userLoggedData');
		UpdateRoutes();
		history.push('/auth/signin');
	  };
	const userData = JSON.parse(sessionStorage.getItem('userLoggedData'));
	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SidebarResponsive routes={routes} />
			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name=""
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hello, {userData.first_name + " " + userData.last_name}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px" 
						onClick={handleProfileClick}>
							<Text fontSize="sm">Profile</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px" onClick={handleLogoutClick}>
							<Text fontSize="sm">Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
