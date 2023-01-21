import { faker } from '@faker-js/faker';
import argon2 from 'argon2';
import prisma from '../src/lib/prisma';

async function main() {
  const hashedPassword = await argon2.hash('password');

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      phoneNumber: '1234567890',
    },
  });

  for (let i = 0; i < 5; i++) {
    await prisma.roomType.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.text(),
        occupancy: faker.datatype.number({ min: 1, max: 10 }),
        price: faker.datatype.number({ min: 1000, max: 2000, precision: 0.1 }),
        image: faker.image.city(500, 300),
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
        phoneNumber: faker.phone.number(),
        lastBooking: faker.date.future(),
      },
    });

    await prisma.booking.create({
      data: {
        arrivalDate: faker.date.future(),
        departureDate: faker.date.future(),
        roomId: i + 1,
        adults: 1,
        children: 0,
        guestId: i + 1,
      },
    });

    await prisma.aboutDetail.create({
      data: {
        image: faker.image.city(300, 300),
        title: faker.word.noun(),
        description: faker.lorem.sentences(3),
      },
    });
  }

  await prisma.aboutInfo.create({
    data: {
      title: 'Hotel',
      description: 'Welcome to our hotel',
    },
  });

  await prisma.generalSettings.create({
    data: {
      logo: faker.image.business(300, 300),
      hotelName: 'Hotel',
      country: 'Poland',
      email: 'hotel@example.com',
      phoneNumber: '123456789',
    },
  });

  await prisma.profileInfo.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      phoneNumber: '123456789',
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
