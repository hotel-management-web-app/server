import { faker } from '@faker-js/faker';
import prisma from '../src/lib/prisma';

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.roomType.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.text(),
        occupancy: faker.datatype.number({ min: 1, max: 10 }),
        price: faker.datatype.number({ min: 1000, max: 2000, precision: 0.1 }),
      },
    });

    await prisma.room.create({
      data: {
        roomTypeId: i + 1,
        roomNumber: faker.datatype.number({ min: 1, max: 20 }),
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
  }
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
