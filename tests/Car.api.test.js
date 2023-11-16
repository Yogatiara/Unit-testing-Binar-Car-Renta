require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('API get all cars', () => {
  it('success get all data cars', async () => {
    const response = await request(app).get('/v1/cars');
    expect(response.statusCode).toBe(200);
  });
});

describe('API get car By ID', () => {
  it('success get data car', async () => {
    const response = await request(app).get('/v1/cars/20');
    expect(response.statusCode).toBe(200);
  });
});

// R
describe('API Create Car', () => {
  it('success create car', async () => {
    const admin = {
      email: 'john@binar.co.id',
      password: '12345678',
    };
    const check = await request(app).post('/v1/auth/login').send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    const car = {
      name: 'Mustang GT',
      price: 2000,
      size: 'SMALL',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180',
      isCurrentlyRented: false,
    };

    const response = await request(app)
      .post('/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .send(car);

    expect(response.statusCode).toBe(201);
  });

  it('failed create car : Access forbidden', async () => {
    const admin = {
      email: 'john@binar.co.id',
      password: '123456784546',
    };
    const check = await request(app).post('/v1/auth/login').send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    const car = {
      name: 'Mustang GT',
      price: 2000,
      size: 'SMALL',
      image:
        'https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180',
      isCurrentlyRented: false,
    };
    const response = await request(app)
      .post('/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .send(car);

    expect(response.statusCode).toBe(401);
  });
});

// Ali
describe('API put car', () => {
  it('success update data car', async () => {
    const admin = {
      email: 'john@binar.co.id',
      password: '12345678',
    };
    const check = await request(app).post('/v1/auth/login').send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    console.log(token);
    const car = {
      name: 'Toyota 1',
      price: 3000000,
      size: 'SMALL',
      image: 'https://source.unsplash.com/527x527',
    };
    const response = await request(app)
      .put('/v1/cars/20')
      .set('Authorization', `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(200);
  });

  it('failed update data car', async () => {
    const failedAdmin = {
      email: 'john@binar.co.id',
      password: '12345675',
    };
    const check = await request(app).post('/v1/auth/login').send(failedAdmin);
    const res = JSON.parse(check.text);
    const failedToken = res.accessToken;
    console.log(failedToken);
    const failedCar = {
      name: 'Toyota 1',
      price: 3000000,
      size: 'SMALL',
      image: 'https://source.unsplash.com/527x527',
    };
    const response = await request(app)
      .put('/v1/cars/198')
      .set('Authorization', `Bearer ${failedToken}`)
      .send(failedCar);
    expect(response.statusCode).toBe(401);
  });
});

// Yoga
describe('API insert rental data', () => {
  it('Success insert rental data', async () => {
    const user = {
      email: 'fikri@binar.co.id',
      password: '123456',
    };

    const check = await request(app).post('/v1/auth/login').send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;

    const date = new Date();

    const userCar = {
      userId: 1,
      carId: 3,
      rentStartedAt: date,
      rentEndedAt: date.setDate(date.getDate() + 3),
    };

    const response = await request(app)
      .post('/v1/cars/2/rent')
      .set('Authorization', `Bearer ${token}`)
      .send(userCar);
    expect(response.statusCode).toBe(201);
  });

  it('failed insert car data', async () => {
    const user = {
      email: 'fikri@binar.co.id',
      password: '123455',
    };

    const check = await request(app).post('/v1/auth/login').send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;

    const date = new Date();

    const userCar = {
      userId: 1,
      carId: 3,
      rentStartedAt: date,
      rentEndedAt: date,
    };

    const response = await request(app)
      .post('/v1/cars/2/rent')
      .set('Authorization', `Bearer ${token}`)
      .send(userCar);
    expect(response.statusCode).toBe(401);
  });
});

describe('API delete car', () => {
  it('success delete car', async () => {
    const admin = {
      email: 'john@binar.co.id',
      password: '12345678',
    };
    const check = await request(app).post('/v1/auth/login').send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    // console.log(token);
    const response = await request(app)
      .delete('/v1/cars/97')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });

  it('failed delete car', async () => {
    const admin = {
      email: 'john@binar.co.id',
      password: '12345676',
    };
    const check = await request(app).post('/v1/auth/login').send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    // console.log(token);
    const response = await request(app)
      .delete('/v1/cars/100')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
});
