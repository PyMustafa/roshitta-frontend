export const clinicData = [
  {
    id: 'clinic-1',
    name: 'Madinat Nassr Clinic',
    address: '123 Main St, Downtown',
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'clinic-2',
    name: 'New Giza Clinic',
    address: '456 West Ave, Westside',
    image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const doctorData = {
  id: 'dr-1',
  name: 'Dr. Richard James',
  title: 'MBBS',
  specialization: 'General physician',
  experience: '4 Years',
  about: 'Experienced general physician specializing in preventive medicine and chronic disease management.',
  photoUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

export const weekDays = [
  { id: 'mon', name: 'Monday', short: 'Mon' },
  { id: 'tue', name: 'Tuesday', short: 'Tue' },
  { id: 'wed', name: 'Wednesday', short: 'Wed' },
  { id: 'thu', name: 'Thursday', short: 'Thu' },
  { id: 'fri', name: 'Friday', short: 'Fri' },
  { id: 'sat', name: 'Saturday', short: 'Sat' },
  { id: 'sun', name: 'Sunday', short: 'Sun' }
];

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});