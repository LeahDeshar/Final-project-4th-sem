import React, { useContext, useEffect, useState } from 'react';
import './service.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/Context';
import Modal from './Modal';
import ServiceSummary from './ServiceSummary';
import store from '../../redux/store';
import { getAllService, getAllServiceByCategory, getServiceOfUser } from '../../redux/service/serviceAction';
import { getAllRequestByCategory } from '../../redux/request/requestAction';

// import { FiSearch } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { serviceCategories } from '../shared/ServiceCategories';
import { ServiceContext } from '../utils/ServContext';
const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const handleContinue = () => {
    setShowModal(true);
   
  };
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const {skillSetPro} = useContext(ServiceContext)
 console.log("skillSetPro",skillSetPro)
 const profile = useSelector((state)=>state.users.profile)
  // const serviceCategories = [
  //   {
  //     id: 1,
  //     name: 'LAUNDARY',
  //     keyName: 'laundry', // Add the lowercase name as keyName
  //     image: '/assets/logofolder/category1.png',
  //   },
  //   {
  //     id: 2,
  //     name: 'PAINTER',
  //     keyName: 'painter',
  //     image: '/assets/logofolder/catgory2.png',
  //   },
  //   {
  //     id: 3,
  //     name: 'CHEF',
  //     keyName: 'chef',
  //     image: '/assets/logofolder/category3.png',
  //   },
  //   {
  //     id: 4,
  //     name: 'CAR SERVICE',
  //     keyName: 'carService',
  //     image: '/assets/logofolder/category4.png',
  //   },
  //   {
  //     id: 5,
  //     name: 'PLUMBER',
  //     keyName: 'plumber',
  //     image: '/assets/logofolder/category5.png',
  //   },
  //   {
  //     id: 6,
  //     name: 'ELECTRICIAN',
  //     keyName: 'electrician',
  //     image: '/assets/logofolder/category6.png',
  //   },
  //   {
  //     id: 7,
  //     name: 'Pest Control',
  //     keyName: 'pestControl',
  //     image: '/assets/logofolder/category7.png',
  //   },
  //   {
  //     id: 8,
  //     name: 'Category 8',
  //     keyName: 'category 8',
  //     image: '/assets/logofolder/category8.png',
  //   },
  //   {
  //     id: 9,
  //     name: 'FURNITURE',
  //     keyName: 'furniture',
  //     image: '/assets/logofolder/category9.png',
  //   },
  //   {
  //     id: 10,
  //     name: 'CLEANING',
  //     keyName: 'cleaning',
  //     image: '/assets/logofolder/category10.png',
  //   },
  //   {
  //     id: 11,
  //     name: 'PETCARE',
  //     keyName: 'petcare',
  //     image: '/assets/logofolder/category11.png',
  //   },
  //   {
  //     id: 12,
  //     name: 'Mechanic',
  //     keyName: 'mechanic',
  //     image: '/assets/logofolder/category12.png',
  //   },
  // ];
 
//   const serviceCategories = [
//     {
//       id: 1,
//       name: 'LAUNDARY',
//       keyName: 'laundry',
//       image: '/assets/logofolder/category1.png',
//     },
//     {
//       id: 2,
//       name: 'PAINTER',
//       keyName: 'painter',
//       image: '/assets/logofolder/catgory2.png',
//     },
//     {
//       id: 3,
//       name: 'CHEF',
//       keyName: 'chef',
//       image: '/assets/logofolder/category3.png',
//     },
//     {
//       id: 4,
//       name: 'CAR SERVICE',
//       keyName: 'carService',
//       image: '/assets/logofolder/category4.png',
//     },
//     {
//       id: 5,
//       name: 'PLUMBER',
//       keyName: 'plumber',
//       image: '/assets/logofolder/category5.png',
//     },
//     {
//       id: 6,
//       name: 'ELECTRICIAN',
//       keyName: 'electrician',
//       image: '/assets/logofolder/category6.png',
//     },
//     {
//       id: 7,
//       name: 'PEST CONTROL',
//       keyName: 'pestControl',
//       image: '/assets/logofolder/category7.png',
//     },
//     {
//       id: 8,
//       name: 'Category 8',
//       keyName: 'category8',
//       image: '/assets/logofolder/category8.png',
//     },
//     {
//       id: 9,
//       name: 'FURNITURE',
//       keyName: 'furniture',
//       image: '/assets/logofolder/category9.png',
//     },
//     {
//       id: 10,
//       name: 'CLEANING',
//       keyName: 'cleaning',
//       image: '/assets/logofolder/category10.png',
//     },
//     {
//       id: 11,
//       name: 'PETCARE',
//       keyName: 'petcare',
//       image: '/assets/logofolder/category11.png',
//     },
//     {
//       id: 12,
//       name: 'MECHANICS',
//       keyName: 'mechanics',
//       image: '/assets/logofolder/category12.png',
//     },
//     {
//       id: 13,
//       name: 'APPLIANCE REPAIR',
//       keyName: 'applianceRepair',
//       image: '/assets/logofolder/appliance-repair.png',
//     },
//     {
//       id: 14,
//       name: 'HOME SECURITY',
//       keyName: 'homeSecurity',
//       image: '/assets/logofolder/policeman.png',
//     },
//     {
//       id: 15,
//       name: 'HOME AUTOMATION',
//       keyName: 'homeAutomation',
//       image: '/assets/logofolder/automation.png',
//     },
//     {
//       id: 16,
//       name: 'POOL AND SPA',
//       keyName: 'poolSpa',
//       image: '/assets/logofolder/massage.png',
//     },
//     {
//       id: 17,
//       name: 'WINDOW AND DOOR',
//       keyName: 'windowDoor',
//       image: '/assets/logofolder/open-window.png',
//     },
//     {
//       id: 18,
//       name: 'HOME THEATER AND AUDIO-VISUAL',
//       keyName: 'homeTheaterAudioVisual',
//       image: '/assets/logofolder/theater.png',
//     },
//     {
//       id: 19,
//       name: 'CHIMNEY AND FIREPLACE',
//       keyName: 'chimneyFireplace',
//       image: '/assets/logofolder/fireplace.png',
//     },
//     {
//       id: 20,
//       name: 'HOME ENERGY EFFICIENCY',
//       keyName: 'homeEnergyEfficiency',
//       image: '/assets/logofolder/solar-energy.png',
//     },
//     {
//       id: 21,
//       name: 'HOME OFFICE SETUP',
//       keyName: 'homeOfficeSetup',
//       image: '/assets/logofolder/workspace.png',
//     },
//     {
//       id: 22,
//       name: 'INTERIOR DESIGN AND DECORATING',
//       keyName: 'interiorDesignDecorating',
//       image: '/assets/logofolder/plan.png',
//     },
//     {
//       id: 23,
//       name: 'HOME FITNESS EQUIPMENT',
//       keyName: 'homeFitnessEquipment',
//       image: '/assets/logofolder/home-fitness-equipment.png',
//     },
//     {
//       id: 24,
//       name: 'HOME MOVING AND RELOCATION',
//       keyName: 'homeMovingAndRelocation',
//       image: '/assets/logofolder/home-moving-and-relocation.png',
//     },
//     {
//       id: 25,
//       name: 'ART INSTALLATION',
//       keyName: 'artInstallation',
//       image: '/assets/logofolder/art-installation.png',
//     },
//     {
//       id: 26,
//       name: 'AQUARIUM MAINTENANCE',
//       keyName: 'aquariumMaintenance',
//       image: '/assets/logofolder/aquarium-maintenance.png',
//     },
//     {
//       id: 27,
//       name: 'LIBRARY DESIGN AND ORGANIZATION',
//       keyName: 'libraryDesignAndOrganization',
//       image: '/assets/logofolder/library-design-and-organization.png',
//     },
//     {
//       id: 28,
//       name: 'INDOOR VERTICAL GARDEN INSTALLATION',
//       keyName: 'indoorVerticalGardenInstallation',
//       image: '/assets/logofolder/indoor-vertical-garden-installation.png',
//     },
//     {
//       id: 29,
//       name: 'RESIDENTIAL MOVING',
//       keyName: 'residentialMoving',
//       image: '/assets/logofolder/residential-moving.png',
//     },
//     {
//       id: 30,
//       name: 'ROOFING SERVICES',
//       keyName: 'roofingServices',
//       image: '/assets/logofolder/roofing-services.png',
//     },
//     {
//       id: 31,
//       name: 'MASONRY AND BRICKWORK',
//       keyName: 'masonryAndBrickwork',
//       image: '/assets/logofolder/masonry-and-brickwork.png',
//     },
//     {
//       id: 32,
//       name: 'DRYER VENT CLEANING',
//       keyName: 'dryerVentCleaning',
//       image: '/assets/logofolder/dryer-vent-cleaning.png',
//     },
//     {
//       id: 33,
//       name: 'SEPTIC TANK PUMPING',
//       keyName: 'septicTankPumping',
//       image: '/assets/logofolder/septic-tank-pumping.png',
//     },
//     {
//       id: 34,
//       name: 'GUTTER INSTALLATION AND REPAIR',
//       keyName: 'gutterInstallationAndRepair',
//       image: '/assets/logofolder/gutter-installation-and-repair.png',
//     },
//     {
//       id: 35,
//       name: 'DECK AND PATIO INSTALLATION',
//       keyName: 'deckAndPatioInstallation',
//       image: '/assets/logofolder/deck-and-patio-installation.png',
//     },
//     {
//       id: 36,
//       name: 'WINDOW TINTING',
//       keyName: 'windowTinting',
//       image: '/assets/logofolder/window-tinting.png',
//     },
//     {
//       id: 37,
//       name: 'HOME SECURITY SYSTEM INSTALLATION',
//       keyName: 'homeSecuritySystemInstallation',
//       image: '/assets/logofolder/home-security-system-installation.png',
//     },
//     {
//       id: 38,
//       name: 'SOLAR PANEL INSTALLATION',
//       keyName: 'solarPanelInstallation',
//       image: '/assets/logofolder/solar-panel-installation.png',
//     },
//     {
//       id: 39,
//       name: 'ELECTRICAL PANEL UPGRADE',
//       keyName: 'electricalPanelUpgrade',
//       image: '/assets/logofolder/electrical-panel-upgrade.png',
//     },
//     {
//       id: 40,
//       name: 'EMERGENCY GENERATOR INSTALLATION',
//       keyName: 'emergencyGeneratorInstallation',
//       image: '/assets/logofolder/emergency-generator-installation.png',
//     },
//     {
//       id: 41,
//       name: 'POOL CLEANING AND MAINTENANCE',
//       keyName: 'poolCleaningAndMaintenance',
//       image: '/assets/logofolder/pool-cleaning-and-maintenance.png',
//     },
//     {
//       id: 42,
//       name: 'SWIMMING POOL REPAIR',
//       keyName: 'swimmingPoolRepair',
//       image: '/assets/logofolder/swimming-pool-repair.png',
//     },
//     {
//       id: 43,
//       name: 'FENCE STAINING AND SEALING',
//       keyName: 'fenceStainingAndSealing',
//       image: '/assets/logofolder/fence-staining-and-sealing.png',
//     },
//     {
//       id: 44,
//       name: 'CONCRETE REPAIR AND INSTALLATION',
//       keyName: 'concreteRepairAndInstallation',
//       image: '/assets/logofolder/concrete-repair-and-installation.png',
//     },
//     {
//       id: 45,
//       name: 'WINDOW REPLACEMENT',
//       keyName: 'windowReplacement',
//       image: '/assets/logofolder/window-replacement.png',
//     },
//     {
//       id: 46,
//       name: 'HOME INSULATION SERVICES',
//       keyName: 'homeInsulationServices',
//       image: '/assets/logofolder/home-insulation-services.png',
//     },
//     {
//       id: 47,
//       name: 'GARAGE DOOR OPENER INSTALLATION',
//       keyName: 'garageDoorOpenerInstallation',
//       image: '/assets/logofolder/garage-door-opener-installation.png',
//     },
//     {
//       id: 48,
//       name: 'CARPET INSTALLATION AND CLEANING',
//       keyName: 'carpetInstallationAndCleaning',
//       image: '/assets/logofolder/carpet-installation-and-cleaning.png',
//     },
//     {
//       id: 49,
//       name: 'DUCT CLEANING SERVICES',
//       keyName: 'ductCleaningServices',
//       image: '/assets/logofolder/duct-cleaning-services.png',
//     },
//     {
//       id: 50,
//       name: 'SUMP PUMP INSTALLATION AND REPAIR',
//       keyName: 'sumpPumpInstallationAndRepair',
//       image: '/assets/logofolder/sump-pump-installation-and-repair.png',
//     },
//     {
//       id: 51,
//       name: 'HOME THEATER INSTALLATION',
//       keyName: 'homeTheaterInstallation',
//       image: '/assets/logofolder/home-theater-installation.png',
//     },
//     {
//       id: 52,
//       name: 'HOME OFFICE WIRING AND NETWORKING',
//       keyName: 'homeOfficeWiringAndNetworking',
//       image: '/assets/logofolder/home-office-wiring-and-networking.png',
//     },
//     {
//       id: 53,
//       name: 'RADON MITIGATION SERVICES',
//       keyName: 'radonMitigationServices',
//       image: '/assets/logofolder/radon-mitigation-services.png',
//     },
//     {
//       id: 54,
//       name: 'CUSTOM CLOSET DESIGN AND INSTALLATION',
//       keyName: 'customClosetDesignAndInstallation',
//       image: '/assets/logofolder/custom-closet-design-and-installation.png',
//     },
//     {
//       id: 55,
//       name: 'GARAGE ORGANIZATION SERVICES',
//       keyName: 'garageOrganizationServices',
//       image: '/assets/logofolder/garage-organization-services.png',
//     },
//     {
//       id: 56,
//       name: 'WALLPAPER REMOVAL',
//       keyName: 'wallpaperRemoval',
//       image: '/assets/logofolder/wallpaper-removal.png',
//     },
//     {
//       id: 57,
//       name: 'EMERGENCY PLUMBING SERVICES',
//       keyName: 'emergencyPlumbingServices',
//       image: '/assets/logofolder/emergency-plumbing-services.png',
//     },
//     {
//       id: 58,
//       name: 'HVAC MAINTENANCE PLANS',
//       keyName: 'hvacMaintenancePlans',
//       image: '/assets/logofolder/hvac-maintenance-plans.png',
//     },
//     {
//       id: 59,
//       name: 'WATER SOFTENER INSTALLATION',
//       keyName: 'waterSoftenerInstallation',
//       image: '/assets/logofolder/water-softener-installation.png',
//     },
//     {
//       id: 60,
//       name: 'FIREPLACE INSTALLATION AND REPAIR',
//       keyName: 'fireplaceInstallationAndRepair',
//       image: '/assets/logofolder/fireplace-installation-and-repair.png',
//     },
//     {
//       id: 61,
//       name: 'BATHTUB AND SHOWER REFINISHING',
//       keyName: 'bathtubAndShowerRefinishing',
//       image: '/assets/logofolder/bathtub-and-shower-refinishing.png',
//     },
//     {
//       id: 62,
//       name: 'CRAWL SPACE ENCAPSULATION',
//       keyName: 'crawlSpaceEncapsulation',
//       image: '/assets/logofolder/crawl-space-encapsulation.png',
//     },
//     {
//       id: 63,
//       name: 'HVAC AIR DUCT SEALING',
//       keyName: 'hvacAirDuctSealing',
//       image: '/assets/logofolder/hvac-air-duct-sealing.png',
//     },
//     {
//       id: 64,
//       name: 'OUTDOOR LIGHTING INSTALLATION',
//       keyName: 'outdoorLightingInstallation',
//       image: '/assets/logofolder/outdoor-lighting-installation.png',
//     },
//     {
//       id: 65,
//       name: 'CEILING FAN INSTALLATION',
//       keyName: 'ceilingFanInstallation',
//       image: '/assets/logofolder/ceiling-fan-installation.png',
//     },
//     {
//       id: 66,
//       name: 'HOUSE LIFTING AND LEVELING',
//       keyName: 'houseLiftingAndLeveling',
//       image: '/assets/logofolder/house-lifting-and-leveling.png',
//     },
//     {
//       id: 67,
//       name: 'WROUGHT IRON FENCE INSTALLATION',
//       keyName: 'wroughtIronFenceInstallation',
//       image: '/assets/logofolder/wrought-iron-fence-installation.png',
//     },
//     {
//       id: 68,
//       name: 'FIRE SPRINKLER SYSTEM INSTALLATION',
//       keyName: 'fireSprinklerSystemInstallation',
//       image: '/assets/logofolder/fire-sprinkler-system-installation.png',
//     },
//     {
//       id: 69,
//       name: 'EXTERIOR SHUTTER INSTALLATION',
//       keyName: 'exteriorShutterInstallation',
//       image: '/assets/logofolder/exterior-shutter-installation.png',
//     },
//     {
//       id: 70,
//       name: 'LANDSCAPING SERVICES',
//       keyName: 'landscapingServices',
//       image: '/assets/logofolder/landscaping-services.png',
//     },
//     {
//       id: 71,
//       name: 'CLEANING SERVICES',
//       keyName: 'cleaningServices',
//       image: '/assets/logofolder/home-cleaning-services.png',
//     },
//     {
//       id: 72,
//       name: 'ROOFING SERVICES',
//       keyName: 'roofingServices',
//       image: '/assets/logofolder/roofing-services.png',
//     },
// ];

  

   // Filter categories based on searchText
   const filteredCategories = serviceCategories.filter((category) =>
   category.name.toLowerCase().includes(searchText.toLowerCase())
 );
  const res = useSelector(state => state.auth);
  const {updateSerName}= useContext(UserContext)

  const serviceHandle = (e, categoryName) => {
    updateSerName(categoryName)
    console.log("Clicked", categoryName);
    if (res.user.role === 'Provider') {
      console.log(categoryName.toLowerCase())
      const category =categoryName.toLowerCase()
      store.dispatch(getAllRequestByCategory({category}))
      // store.dispatch(getAllServiceByCategory({category}))
      navigate('/service-posted');
    } else if (res.user.role === 'Customer') {
      // setShowModal(true);
      handleContinue()
    } else {
      console.log("Invalid request");
    }
  };

  const selectedSkill = serviceCategories.filter((category) => profile.skillset.includes(category.name))
  console.log(selectedSkill)

  
  console.log(selectedSkill.map((category) => (
    <div className="grid-item" key={category.id} onClick={(e) => serviceHandle(e, category.name)}>
      <img src={category.image} alt={category.name} className="grid-image" />
      <h3 className="grid-name">{category.name}</h3>
    </div>
  )))

const postedHandler = ()=>
{
  store.dispatch(getServiceOfUser());
}
console.log(profile.skillset)

const servicePost = useSelector((state) => state.service.servicePost);
console.log("servicePost",servicePost)

useEffect(() => {
  if(res.user.role==="Provider")
  {
    dispatch(getAllService());
  }
}, [dispatch,res.user.role]);

  return (
    <div className="service__container">
      { 
        res.user.role === 'Provider'? 
        <h4>SERVICES</h4>: 
        <div className='service__header'>
         <div>
          <h4 className='serviceNameTag'>SERVICES</h4>
         </div>
         <div className='searchBar'>
          <span className='searchIcon'>   <FiSearch style={{fontSize: '13px'}}/></span>
       
          <input type="text" placeholder='What service are you searching?' 
          value={searchText}
          onChange={handleSearchInputChange}className='searchBar_input' />
         </div>
         <div onClick={postedHandler}>
          <Link to={'/service-posted'} className='workinprogress'>Work in progress</Link>
         </div>
        </div>
      }
      <div className="grid-container">
       { res.user.role === "Provider"?<>
          {selectedSkill.map((category) => (
          <div className="grid-item" key={category.id} onClick={(e) => serviceHandle(e, category.name)}>
            <img src={category.image} alt={category.name} className="grid-image" />
            <h3 className="grid-name">{category.name}</h3>
          </div>
        ))}
         </>:
        <>
        {filteredCategories.map((category) => (
          <div className="grid-item" key={category.id} onClick={(e) => serviceHandle(e, category.name)}>
            <img src={category.image} alt={category.name} className="grid-image" />
            <h3 className="grid-name">{category.name}</h3>
          </div>
        ))}
        </>
        }
      </div>
      <div className="bottom_rect"></div>

      {/* Modal */}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal} 
      />
      )}
       
    </div>
  );
};

export default Services;
