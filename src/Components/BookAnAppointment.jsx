import React from "react";
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
    commonHealthImg: 'https://images.healthshots.com/healthshots/en/uploads/2021/12/20155458/Cough1-1600x900.jpg',
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
      {/* <div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div class="p-8 sm:p-10 lg:flex-auto">
        <h3 class="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
        <p class="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
        <div class="mt-10 flex items-center gap-x-4">
          <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
          <div class="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Private forum access
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Member resources
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Entry to annual conference
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Official member t-shirt
          </li>
        </ul>
      </div>
      <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div class="mx-auto max-w-xs px-8">
            <p class="text-base font-semibold text-gray-600">Pay once, own it forever</p>
            <p class="mt-6 flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-bold tracking-tight text-gray-900">$349</span>
              <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
            </p>
            <a href="#" class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
            <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}
      {/* card ends */}


{/* Speciality wise list starts */}
      <div className="Speciality-wise-cards bg-custom-graybg">
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
