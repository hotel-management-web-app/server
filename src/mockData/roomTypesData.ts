import { Prisma, RoomType } from '@prisma/client';

export const roomTypesData = [
  {
    name: 'Single Room',
    occupancy: 1,
    description:
      'A bright ample space featuring sleek and modern design for the lovers of green views. Go find your favorite spot between the warm white interiors of this room and the view to the lush gardens of palms, bougainvillea and coconut trees by the turquoise pool.',
    image:
      'https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg',
    images: [
      'https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/FullLengthImages/Small/Royal_National_Standard_Single_4.jpg',
      'https://www.corendonhotels.com/corendon-city-hotel-amsterdam/wp-content/uploads/sites/3/2021/12/HSRT-813145820391.JPEG',
      'https://hotelvilnia.lt/wp-content/uploads/2018/06/DSC07685-HDR-Edit-Edit.jpg',
    ],
    amenities: [
      '38 - 45 sqm (inc. terrace)',
      'Shower and tub',
      'Unlimited access to spa',
      'High velocity wifi',
      'Coffee-point',
    ],
    details: ['Double beds', 'Pillow menu', 'Terrace', 'Bang & Olufsen'],
    price: 100000,
  },
  {
    name: 'Double Room',
    occupancy: 2,
    description:
      'The unique room at the corner is a favorite for the large geometric windows with 180º views to the mountains or the pool. To extra treat the eyes while spending time in a pure and warm, island white decoration. Before indulging to a bath in the big round soaking bathtub.',
    image:
      'https://cdn.traveltripper.io/site-assets/512_863_12597/media/2018-02-22-041437/large_DDBDB.jpg',
    images: [
      'https://lh6.googleusercontent.com/LAbDs9JrwGjxAAQoHT1lNnKt4a5_OXDqw7S3hZQajGS30XvPwjynPOA8-afixA6QqxL_g7iPn12dRWTO40GhEyPS7n7CDzRYg61Ib334yCK6ZIPjLNZbZExrLk_8BPvf83fq1Qte',
      'https://www.hotel7dublin.com/wp-content/uploads/Hotel-7-double-bedroom.jpg',
      'http://static1.eskypartners.com/travelguide/twin-room-double-room-jaka-roznica.jpg',
    ],
    amenities: [
      '63 - 87 sqm (inc. terrace)',
      'Bang & Olufsen',
      'Pillow menu',
      'Terrace solarium',
      'Coffee-point',
    ],
    details: [
      'Double beds',
      'Shower and tub',
      'Unlimited access to spa',
      'High velocity wifi',
      'City/Pool View',
    ],
    price: 200000,
  },
  {
    name: 'Deluxe Room',
    occupancy: 3,
    description:
      'The mysterious principles of Feng Shui open up to the views of Santa Eulalia. Inside this Deluxe space, the most natural elements have gathered from the bathroom itself to the beautiful Ibiza marine views at the open terrace.',
    image:
      'https://www.peninsula.com/en/-/media/pbk/rooms/deluxe-room-twin-bed.jpg?mw=905&hash=9515693D3D8455DE1F48031E23A9C6BA',
    images: [
      'https://s7d2.scene7.com/is/image/ritzcarlton/pnqrz-king-50668318?$XlargeViewport100pct$',
      'https://www.peninsula.com/en/-/media/pbk/rooms/deluxe-room-twin-bed.jpg?mw=905&hash=9515693D3D8455DE1F48031E23A9C6BA',
      'https://mardhiyyahhotel.com/wp-content/uploads/sites/18/2021/03/CORPORATE-FLOOR-DELUXE-ROOM_KING-1.png',
      'https://s7d2.scene7.com/is/image/ritzcarlton/Deluxe%20King-1?$XlargeViewport100pct$',
      'https://alayahotels.com/alayaresortubud/wp-content/uploads/sites/2/2017/04/deluxe-web.jpg',
      'https://www.berjayahotel.com/sites/default/files/hotel-room-type/makati/01-deluxe-room.jpg',
      'https://www.eliaermouhotel.com/uploads/photos/D1024/2019/02/deluxeroom_1748.jpg',
    ],
    amenities: [
      '36 sqm (inc. terrace)',
      'Bathtub',
      'Unlimited access to spa',
      'High velocity wifi',
      'Bang & Olufsen',
    ],
    details: [
      'Double beds',
      'Pillow menu',
      'Terrace',
      'Coffee-point',
      'Pool View',
    ],
    price: 300000,
  },
  {
    name: 'Dreamer Room',
    occupancy: 4,
    description:
      'Calling all lovers of the Feng Shui principles to enter these interiors made of natural elements for their most intimate and pleasant experience. Lose yourself in your privacy while the sun lights up the iridescent tiles recreating seashells… and enter your most magical dreams.',
    image:
      'https://delightfull.eu/inspirations/wp-content/uploads/2022/03/A-MID-CENTURY-DREAMY-BEDROOM-DECOR-min-scaled.jpg',
    images: [
      'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/08/14154103/Dream-Room-White-Wall-Moulding.jpg',
      'https://delightfull.eu/inspirations/wp-content/uploads/2022/03/A-MID-CENTURY-DREAMY-BEDROOM-DECOR-min-scaled.jpg',
      'https://pix10.agoda.net/hotelImages/12233687/0/7bf785ff4a1367b1f6f6cfde0377eb81.jpg?ca=10&ce=1&s=1024x768',
      'https://images.mirai.com/INFOROOMS/88277246/7AEehIOMe1nlcI874Tj0/7AEehIOMe1nlcI874Tj0_large.jpg',
    ],
    amenities: [
      '34 - 40 sqm (inc. terrace)',
      'Bang & Olufsen',
      'Pillow menu',
      'Terrace',
      'Disabled (without bathtub)',
      'City View',
    ],
    details: [
      'Double beds',
      'Bathtub',
      'Unlimited access to spa',
      'High velocity wifi',
      'Coffee-point',
    ],
    price: 400000,
  },
  {
    name: 'Premier Room',
    occupancy: 5,
    description:
      'An Ibiza style room with a natural set of design details to add up to a king size bed and a large private terrace. Contemporary elements like copper and limestone on the wall, or stone pebble floors in its large bathroom, together with two independent washbasins, a bathtub and a separate shower make this space more than a necessity: it’s a magnificent amenity in itself.',
    image:
      'https://s7d2.scene7.com/is/image/ritzcarlton/50620456-Premier%20Room?$XlargeViewport100pct$',
    images: [
      'https://images.rosewoodhotels.com/is/image/rwhg/hotel-de-crillon-526-premier-room-adrian-houston-2019-1',
      'https://henann.com/henannpark/wp-content/uploads/2022/03/Premier-room-A.jpg',
      'https://www.marinabaysands.com/content/dam/revamp/hotel/rooms-suites/sands-premier-room/cityview-1920x843.jpg',
      'https://image-tc.galaxy.tf/wijpeg-2jek5vdx1nujp8ptcqmzl7jvw/hero-fullerton-bay-hotel.jpg',
      'https://image-tc.galaxy.tf/wijpeg-8r0d5c8vq7fa2c78ytz7tsylx/prk-final_standard.jpg?crop=106%2C0%2C1788%2C1341',
    ],
    amenities: [
      '34 - 40 sqm (inc. terrace)',
      'Shower and tub',
      'Unlimited access to spa',
      'High velocity wifi  ',
      'City/Pool View',
    ],
    details: ['Double beds', 'Pillow menu', 'Terrace', 'Coffee-point'],
    price: 500000,
  },
];
