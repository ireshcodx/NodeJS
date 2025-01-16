const { Courier, Customer, Package } = require('./models');

// Dummy data for couriers, customers, and packages
const couriers = [
    { name: 'John Doe', phone: '555-1234', vehicleType: 'Bike' },
    { name: 'Jane Smith', phone: '555-5678', vehicleType: 'Car' },
    { name: 'Alex Johnson', phone: '555-9876', vehicleType: 'Truck' },
    { name: 'Emily Davis', phone: '555-1112', vehicleType: 'Scooter' },
    { name: 'Michael Brown', phone: '555-1314', vehicleType: 'Van' }
];

const customers = [
    { name: 'Alice Cooper', email: 'alice@cooper.com', address: '123 Maple St, Springfield' },
    { name: 'Bob Marley', email: 'bob@marley.com', address: '456 Oak St, Kingston' },
    { name: 'Charlie King', email: 'charlie@king.com', address: '789 Pine St, London' },
    { name: 'David Lee', email: 'david@lee.com', address: '101 Birch St, New York' },
    { name: 'Eva Green', email: 'eva@green.com', address: '202 Cedar St, Los Angeles' }
];

const packages = [
    { customerId: 1, courierId: 2, weight: 1.2, deliveryStatus: 'Pending' },
    { customerId: 2, courierId: 1, weight: 3.5, deliveryStatus: 'Delivered' },
    { customerId: 3, courierId: 3, weight: 2.8, deliveryStatus: 'Delivered' },
    { customerId: 4, courierId: 5, weight: 5.0, deliveryStatus: 'In Transit' },
    { customerId: 5, courierId: 4, weight: 0.8, deliveryStatus: 'Pending' }
];

// Insert the data into the tables
const seedData = async () => {
    try {
        await Courier.bulkCreate(couriers);
        await Customer.bulkCreate(customers);
        await Package.bulkCreate(packages);

        console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
};

// Run the seeding function
seedData();
