import request from 'supertest';

describe('Check room type api', () => {
  it('GET Request', () => {
    request('http://localhost:5000/api')
      .get('/room-types')
      .expect(200)
      .end((err) => {
        if (err) throw err;
      });
  });
});
