import chai, { use } from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const expect = chai.expect;
const requester =supertest("http://127.0.0.1:8080");

describe ('testing the server', () => {

    const userMock = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int(),
        password: '12345678',
        
    };
    const productMock = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        stock: faker.number.int(),
        thumbnail: faker.image.url(),
        code: faker.number.int(),
        owner: userMock.email,
        status: faker.datatype.boolean({ probability: 0.5 })
        
    };
    const cartMock = {
        _id: userMock.cartId,
        products:[{
            pid: productMock._id,
            quantity: faker.number.int()
        }],
        total: faker.number.int(),
        status: faker.datatype.boolean({ probability: 0.5 })
    };
    describe ("Cart Test", () => {
       

        it('In endpoint POST "/api/cart/:cid/products/:pid" must add a product to the cart', async () => {

            const response = await requester.post('/api/session/register').send(userMock);
            const userReg = response._body;
            const resLogin = await requester.post('/api/session/login').send({
                email: userReg.email,
                password: '12345678'
            });
            const cartId = userReg.cartId;
            const response1 = await requester.post('/api/products/addproducts').send(productMock);
            const pid = response1._body._id;
          
            console.log("pid:", pid, "cartId:", cartId, "userReg:", userReg);
            const response2 = await requester.post(`/api/cart/${cartId}/products/${pid}`).send({quantity: 1}, userReg);

            // const {status2, ok2, _body2} = response2;
            // expect(ok2).to.be.eq(true)
            // expect(_body2).to.have.property('products.pid')
        });
    })

    // describe ('Products Test',() => {
    //             
    //             it ('In endpoint POST /api/products/addproducts must add a product to DB ', async() => {
                    
    //                 const response = await requester.post('/api/products/addproducts').send(productMock);
    //                 const {status, ok, _body} = response;
                   
    //                 expect(_body).to.have.property('_id')

    //                 });

    //             it ('In endpoint DELETE /api/products/delete/:id must delete a product from DB ', async() => {
    //                 const response = await requester.post('/api/products/addproducts').send(productMock);
    //                 const {status, ok, _body} = response;
    //                 const id = _body._id
    //                 const userMail = _body.owner
    //                 const user = {}
    //                 user.email = userMail
    //                 const response2 = await requester.delete(`/api/products/:pid`).send({id, user});
    //                 const {status: status2, ok: ok2} = response2;

    //                 expect(ok2).to.be.eq(false)

                        
    //                 });

    //             it ('In endpoint POST /api/products/addproducts does not allow empty properties for adding a product', async() => {
                   
    //                 const response = await requester.post('/api/products/addproducts').send({
    //                     title: null,
    //                     description: productMock.description,
    //                     price: productMock.price,
    //                     category: productMock.category,
    //                     stock: productMock.stock,
    //                     thumbnail: productMock.thumbnail,
    //                     code: null,
    //                 });
    //                 const {status, ok, _body} = response;
    //                 expect(ok).to.be.eq(false)
    //                 expect(status).to.be.eq(500)
    //             });
              
    //     });
    // describe (' User test Login, Register, Fail on register and Current',() => {
    //         let cookie;
    //        

        
    //     it ('In endpoint POST /api/session/register must add a user to DB ', async() => {
            
    //         const {_body} = await requester.post('/api/session/register').send(userMock);
    //         expect(_body).to.be.ok

    //     });
    //     it ('In endpoint POST /api/session/login must login a user and return a cookie ', async() => {
           
    //         const result = await requester.post('/api/session/login').send({
    //             email: userMock.email,
    //             password: userMock.password
    //         });
            
    //         const cookieResult = result.header['set-cookie'][0]
    //         cookie = {
    //             name: cookieResult.split('=')[0],
    //             value: cookieResult.split('=')[1].split(';')[0],
    //         }

    //         expect(cookie.name).to.be.ok.and.eq('keyCookieForJWT')
    //         expect(cookie.value).to.be.ok
    //         });
        
    //     it ('In endpoint GET /api/session/current must return the current user ', async() => {
    //         const {_body} = await requester.get('/api/session/current').set('Cookie', `${cookie.name}=${cookie.value}`);
    //         expect(_body.email).to.be.eq(userMock.email)
    //     });
    //     it ('In endpoint POST /api/session/register  does not allow empty password for adding a user', async() => {
          
    //         const {_body, ok} = await requester.post('/api/session/register').send({
    //             first_name: userMock.first_name,
    //             last_name: userMock.last_name,
    //             email: userMock.email,
    //             age: userMock.age,
    //             password: null,
    //         });
    //         expect(ok).to.be.eq(false)
            
           
    //     });
    // })
    });





