import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/general-settings/';

describe('Check general settings endpoints', () => {
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

  it('Put Request', (done) => {
    request(BASE_URL)
      .put(suffix)
      .send({
        hotelName: 'Hotel23',
        country: 'Poland2323',
        email: 'hotel@example.com',
        phoneNumber: '1234567891',
      })
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
