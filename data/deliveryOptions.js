import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

/*function isWeekend(day){
  if(day==='Saturday' || day==='Sunday') return true;
  else return false;
}*/

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let {deliveryDays} = deliveryOption;
  /*let count = 0;
  while(deliveryDays!==0){
    let day = today.add(++count,'days').format('dddd');
    deliveryDays = isWeekend(day) ? deliveryDays : deliveryDays-1;
  }*/
  const deliveryDate = today.add(deliveryDays,'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}

export function validDeliveryOption(deliveryOptionId){
  let found = false;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) found=true;
  });
  return found;
}