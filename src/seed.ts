import { faker } from '@faker-js/faker';
import argon2 from 'argon2';
import prisma from './lib/prisma';
import { aboutData, roomTypesData } from './mockData';

async function main() {
  const hashedPassword = await argon2.hash('password');

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
      phoneNumber: '+48123456789',
    },
  });

  for (let i = 0; i < 5; i++) {
    await prisma.roomType.create({
      data: {
        name: roomTypesData[i].name,
        description: roomTypesData[i].description,
        occupancy: roomTypesData[i].occupancy,
        price: roomTypesData[i].price,
        image: roomTypesData[i].image,
        images: roomTypesData[i].images,
        amenities: roomTypesData[i].amenities,
        details: roomTypesData[i].details,
      },
    });

    await prisma.room.create({
      data: {
        roomTypeId: i + 1,
        roomNumber: faker.datatype.number({ min: 1, max: 100 }),
        floorNumber: faker.datatype.number({ min: 1, max: 5 }),
      },
    });

    await prisma.guest.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('+48#########'),
        lastBooking: faker.date.future(),
      },
    });

    await prisma.booking.create({
      data: {
        arrivalDate: faker.date.soon(),
        departureDate: faker.date.soon(10),
        roomId: i + 1,
        adults: 1,
        children: 0,
        totalPrice: faker.datatype.number({
          min: 200000,
          max: 600000,
        }),
        guestId: i + 1,
      },
    });
  }

  await prisma.aboutInfo.create({
    data: {
      title: aboutData.title,
      description: aboutData.description,
    },
  });

  aboutData.details.forEach(async (detail) => {
    await prisma.aboutDetail.create({
      data: {
        image: detail.image,
        title: detail.title,
        description: detail.description,
      },
    });
  });

  await prisma.generalSettings.create({
    data: {
      logo: 'https://marketplace.canva.com/EAE0d_FW6ZA/1/0/1600w/canva-retro-vector-gold-frames-luxury-decorative-logo-template-uDFt-cAE2ug.jpg',
      hotelName: 'Hotel',
      country: 'Poland',
      email: 'hotel@example.com',
      phoneNumber: '+48123456789',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
