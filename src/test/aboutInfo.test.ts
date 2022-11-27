import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/about-info/';

describe('Check about info endpoints', () => {
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
        title: 'Hotel',
        description: 'Welcome to our hotel',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res.body)
          return done(err);
        }
        return done();
      });
  });
});
