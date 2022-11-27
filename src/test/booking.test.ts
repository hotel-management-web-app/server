import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/bookings/';

describe('Check guest endpoints', () => {
  let id: number;
  it('GET Request', (done) => {
    request(BASE_URL)
      .get(suffix)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res.body);
          return done(err);
        }
        return done();
      });
  });

  it('POST Request', (done) => {
    request(BASE_URL)
      .post(suffix)
      .send({
        arrivalDate: '2022-11-16T20:17:48.423Z',
        departureDate: '2022-11-20T20:17:48.423Z',
        roomId: 1,
        adults: 1,
        children: 0,
        guestId: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res.body);
          return done(err);
        }
        id = res.body.id;
        return done();
      });
  });

  it('Put Request', (done) => {
    request(BASE_URL)
      .put(suffix + id)
      .send({
        arrivalDate: '2022-11-16T20:17:48.423Z',
        departureDate: '2022-11-20T20:17:48.423Z',
        roomId: 1,
        adults: 2,
        children: 0,
        guestId: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('Delete Request', (done) => {
    request(BASE_URL)
      .delete(suffix + id)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res.body);
          return done(err);
        }
        return done();
      });
  });
});
