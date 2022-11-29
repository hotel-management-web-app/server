import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/profile-info/';

describe('Check profile info endpoints', () => {
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
        name: 'Admin',
        email: 'admin@admin.com',
        phoneNumber: '123456789',
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
