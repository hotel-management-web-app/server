import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/guests/';

describe('Check guest endpoints', () => {
  let id: number;
  it('GET Request', (done) => {
    request(BASE_URL).get(suffix).expect(200, done);
  });

  it('POST Request', (done) => {
    request(BASE_URL)
      .post(suffix)
      .send({
        firstName: 'Darth',
        lastName: 'Vader',
        email: 'darth@vader.com',
        phoneNumber: '1123456789',
        lastBooking: '2022-11-16T20:17:48.423Z',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        id = res.body.id;
        return done();
      });
  });

  it('Put Request', (done) => {
    request(BASE_URL)
      .put(suffix + id)
      .send({
        firstName: 'Sheev',
        lastName: 'Palpatine',
        email: 'sheev@palpatine.com',
        phoneNumber: '1123456789',
        lastBooking: '2022-11-16T20:17:48.423Z',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        id = res.body.id;
        return done();
      });
  });

  it('Delete Request', (done) => {
    request(BASE_URL)
      .delete(suffix + id)
      .send({})
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
