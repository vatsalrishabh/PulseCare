import React from "react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ConsultCard from "./ConsultCard";

const BookAnAppointment = () => {

  const specialityCard = [
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'General Physician',
      specialityServiceId: '#234DKHGDS',
      specialityRate: '500',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Cardiologist',
      specialityServiceId: '#345FJHKGF',
      specialityRate: '700',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Dermatologist',
      specialityServiceId: '#456LJKHGF',
      specialityRate: '600',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Neurologist',
      specialityServiceId: '#567MNBVCD',
      specialityRate: '800',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Orthopedic',
      specialityServiceId: '#678CVBNHJ',
      specialityRate: '750',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Pediatrician',
      specialityServiceId: '#789FGHJLM',
      specialityRate: '650',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'ENT Specialist',
      specialityServiceId: '#890PLMKJN',
      specialityRate: '550',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Ophthalmologist',
      specialityServiceId: '#901JHGFDS',
      specialityRate: '700',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Gastroenterologist',
      specialityServiceId: '#012BVCXZK',
      specialityRate: '750',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Urologist',
      specialityServiceId: '#123LKJHGF',
      specialityRate: '800',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Psychiatrist',
      specialityServiceId: '#234MNBVCD',
      specialityRate: '850',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Endocrinologist',
      specialityServiceId: '#345ZXCVBN',
      specialityRate: '650',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Pulmonologist',
      specialityServiceId: '#456ASDFGH',
      specialityRate: '700',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Nephrologist',
      specialityServiceId: '#567QWERTY',
      specialityRate: '900',
    },
    {
      specialityImg: 'https://www.drbhushan.in/wp-content/uploads/2022/08/GI-Cancer-Surgery-1.jpg',
      specialityName: 'Oncologist',
      specialityServiceId: '#678POIUYT',
      specialityRate: '950',
    },
  ];


  const commonHealthCard = [
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Cough & Cold ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Period Problems ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://www.issm.info/images/2021/11/24/Anxiety_Photo.jpg',
    commonHealthName: 'Performance issues in bed ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Skin Problem ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Depression or anexiety ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Want to loose weight ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Stomatch Issue ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Vaginal Infection ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Diabates ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
  {
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
    commonHealthName: 'Sick Kid ?',
    commonHealthServiceId: '#234DKHGDS',
    commonHealthRate: '299',
  },
];
  


  return (
    <div className="BookAnAppointment">
      {/* card starts */}
      
      {/* card ends */}


{/* Speciality wise list starts */}
      <div className="Speciality-wise-cards bg-custom-graybg">

{/* Breadcrum starts */}
<div className="p-8">
<Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" icon={HiHome}>
        Home
      </BreadcrumbItem>

      <BreadcrumbItem >Book an appointment</BreadcrumbItem>
      {/* <BreadcrumbItem>Flowbite React</BreadcrumbItem> */}
    </Breadcrumb>
</div>
{/* Breadcrum ends */}
        
        <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
         25+ Specialities
        </div>
        <div className="heading  text-gray-700 text-xl flex justify-center align-middle p-1">
        Consult with top doctors across specialities
        </div>
        <div className=" justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
        {
specialityCard.map((card, index) => (
  <     ConsultCard
    key={index}
    specialityImg={card.specialityImg}
    specialityName={card.specialityName}
    specialityServiceId={card.specialityServiceId}
    specialityRate={card.specialityRate}
  />

              ))
}

        </div>
      </div>
{/* Speciality wise lists ends */}

{/* Speciality wise list starts */}
<div className="Speciality-wise-cards bg-custom-graybg">
        <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
        Common Health Concerns
        </div>
        <div className="heading  text-gray-700 text-xl flex justify-center align-middle p-1">
        Consult a doctor online for any health issue
        </div>
        <div className=" justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">

          {
              commonHealthCard.map((card, index)=>(
                <ConsultCard
                key={index}
                specialityImg={card.commonHealthImg}
                specialityName={card.commonHealthName}
                specialityServiceId={card.commonHealthServiceId}
                specialityRate={card.commonHealthRate}
                />
              ))
          }
         
          
        </div>
      </div>
{/* Speciality wise lists ends */}


    </div>
  );
};

export default BookAnAppointment;
