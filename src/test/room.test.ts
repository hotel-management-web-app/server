import request from 'supertest';
import { BASE_URL } from '../constants';

const suffix = '/rooms/';

describe('Check room endpoints', () => {
  let id: number;
  it('GET Request', (done) => {
    request(BASE_URL).get(suffix).expect(200, done);
  });

  it('POST Request', (done) => {
    request(BASE_URL)
      .post(suffix)
      .send({
        roomTypeId: 1,
        roomNumber: 20,
        floorNumber: 20,
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
        roomTypeId: 1,
        roomNumber: 21,
        floorNumber: 20,
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