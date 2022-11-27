import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/room-types/';

describe('Check room type api', () => {
  let id: number;
  it('GET Request', (done) => {
    console.log(BASE_URL);
    request(BASE_URL).get(suffix).expect(200, done);
  });

  it('POST Request', (done) => {
    request(BASE_URL)
      .post(suffix)
      .send({
        name: 'sdfsdfsdf',
        description: 'Room',
        occupancy: 2,
        price: 1231,
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
        name: 'sdfsdfsdfdsdf',
        description: 'Room',
        occupancy: 2,
        price: 1231,
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
