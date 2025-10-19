import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const apartments = [
  {
    unitNumber: 'A-101',
    name: 'Luxury Garden Apartment',
    project: 'O West',
    description:
      'Stunning ground floor apartment with a private garden. Features modern finishes, spacious living areas, and premium amenities. Located in the heart of O West with easy access to all facilities.',
    price: 4500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    ],
  },
  {
    unitNumber: 'B-205',
    name: 'Panoramic View Penthouse',
    project: 'New Giza',
    description:
      'Exclusive penthouse with breathtaking panoramic views. Featuring high-end finishes, spacious terraces, and state-of-the-art appliances. Perfect for luxury living.',
    price: 8750000,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
  },
  {
    unitNumber: 'C-304',
    name: 'Modern Studio Apartment',
    project: 'Il Bosco',
    description:
      'Cozy studio apartment with contemporary design. Ideal for young professionals or couples. Includes smart home features and energy-efficient systems.',
    price: 1850000,
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'D-102',
    name: 'Family Duplex',
    project: 'O West',
    description:
      'Spacious duplex perfect for families. Two floors of comfortable living with private entrance. Includes maid room and large kitchen.',
    price: 6200000,
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    ],
  },
  {
    unitNumber: 'E-410',
    name: 'Elegant Two Bedroom',
    project: 'City Gate',
    description:
      'Well-designed two-bedroom apartment with elegant finishes. Features balcony with city views, modern kitchen, and quality fixtures throughout.',
    price: 3100000,
    bedrooms: 2,
    bathrooms: 2,
    area: 135,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    ],
  },
  {
    unitNumber: 'F-501',
    name: 'Compact Smart Home',
    project: 'Villette',
    description:
      'Smart home technology integrated throughout. Compact yet efficient design perfect for modern living. Energy-efficient and eco-friendly.',
    price: 2450000,
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
    ],
  },
  {
    unitNumber: 'G-203',
    name: 'Spacious Family Home',
    project: 'New Giza',
    description:
      'Large family apartment with open-plan living. Multiple balconies, storage space, and premium finishes. Located in family-friendly community.',
    price: 5500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    ],
  },
  {
    unitNumber: 'H-105',
    name: 'Ground Floor with Terrace',
    project: 'Il Bosco',
    description:
      'Charming ground floor apartment with spacious terrace. Perfect for outdoor entertaining. Features designer kitchen and spa-like bathrooms.',
    price: 4900000,
    bedrooms: 3,
    bathrooms: 2,
    area: 170,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
    ],
  },
  {
    unitNumber: 'I-308',
    name: 'Contemporary Loft',
    project: 'City Gate',
    description:
      'Modern loft-style apartment with high ceilings and industrial charm. Open concept design with exposed concrete and modern fixtures.',
    price: 3800000,
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
    ],
  },
  {
    unitNumber: 'J-401',
    name: 'Luxury Three Bedroom',
    project: 'O West',
    description:
      'Premium three-bedroom apartment with luxury finishes throughout. Features smart home system, premium appliances, and designer bathrooms.',
    price: 5200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 190,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
  },
  {
    unitNumber: 'K-202',
    name: 'Cozy One Bedroom',
    project: 'Villette',
    description:
      'Perfect starter home with cozy layout. Includes modern kitchen, comfortable bedroom, and functional bathroom. Great for singles or couples.',
    price: 2100000,
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    images: [
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
  },
  {
    unitNumber: 'L-506',
    name: 'Executive Suite',
    project: 'New Giza',
    description:
      'Luxurious executive suite with premium finishes. Features walk-in closets, marble bathrooms, and gourmet kitchen. Stunning views included.',
    price: 7800000,
    bedrooms: 4,
    bathrooms: 4,
    area: 265,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
  },
  {
    unitNumber: 'M-103',
    name: 'Garden Duplex',
    project: 'Il Bosco',
    description:
      'Unique duplex with private garden access. Two-story living with separate living and sleeping areas. Perfect for families who love outdoor space.',
    price: 6800000,
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    ],
  },
  {
    unitNumber: 'N-207',
    name: 'Mid-Floor Comfort',
    project: 'City Gate',
    description:
      'Comfortable mid-floor apartment with balanced layout. Features modern amenities, good natural light, and efficient use of space.',
    price: 3400000,
    bedrooms: 2,
    bathrooms: 2,
    area: 125,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    unitNumber: 'O-601',
    name: 'Top Floor Retreat',
    project: 'O West',
    description:
      'Private top floor apartment with no neighbors above. Quiet and peaceful with excellent natural light. Premium finishes and smart layout.',
    price: 5800000,
    bedrooms: 3,
    bathrooms: 2,
    area: 195,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    ],
  },
  {
    unitNumber: 'P-304',
    name: 'Modern Two Bedroom',
    project: 'Villette',
    description:
      'Contemporary two-bedroom with sleek design. Features European kitchen, modern bathrooms, and quality finishes. Ready to move in.',
    price: 2850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'Q-402',
    name: 'Premium Corner Unit',
    project: 'New Giza',
    description:
      'Corner unit with extra windows and natural light. Spacious layout with premium fixtures. Excellent ventilation and views from multiple sides.',
    price: 4700000,
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    ],
  },
  {
    unitNumber: 'R-108',
    name: 'Family Ground Floor',
    project: 'Il Bosco',
    description:
      'Practical ground floor apartment for families. Easy access, no stairs needed. Includes storage space and functional layout.',
    price: 4200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
  },
  {
    unitNumber: 'S-505',
    name: 'High Floor Studio',
    project: 'City Gate',
    description:
      'Stylish studio on high floor with great views. Efficient design maximizes space. Perfect for young professionals.',
    price: 1650000,
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'T-201',
    name: 'Accessible Living',
    project: 'O West',
    description:
      'Thoughtfully designed for easy accessibility. Wide doorways, open spaces, and practical layout. Comfortable living for everyone.',
    price: 3600000,
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    images: [
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    unitNumber: 'U-703',
    name: 'Penthouse Living',
    project: 'New Giza',
    description:
      'Spectacular penthouse with private rooftop. Ultimate luxury with panoramic views, high-end finishes, and exclusive amenities.',
    price: 9500000,
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    images: [
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    ],
  },
  {
    unitNumber: 'V-106',
    name: 'Garden View Apartment',
    project: 'Villette',
    description:
      'Serene apartment overlooking community gardens. Peaceful setting with nature views. Modern finishes and comfortable layout.',
    price: 2650000,
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    images: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
    ],
  },
  {
    unitNumber: 'W-405',
    name: 'Smart Family Home',
    project: 'Il Bosco',
    description:
      'Intelligent home design with smart features. Family-friendly layout with ample storage. Energy-efficient and eco-conscious.',
    price: 5100000,
    bedrooms: 3,
    bathrooms: 2,
    area: 185,
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
  },
  {
    unitNumber: 'X-302',
    name: 'Urban Living Space',
    project: 'City Gate',
    description:
      'Perfect for urban lifestyle with modern conveniences. Close to amenities, well-designed spaces, and contemporary finishes.',
    price: 3200000,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    unitNumber: 'Y-604',
    name: 'Luxury High Rise',
    project: 'O West',
    description:
      'High-rise living at its finest. Spectacular views, premium finishes, and exclusive building amenities. Resort-style living.',
    price: 6500000,
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
  },
  {
    unitNumber: 'Z-101',
    name: 'Bright Corner Studio',
    project: 'Villette',
    description:
      'Charming corner studio with abundant natural light. Features efficient layout, modern appliances, and tasteful finishes. Perfect for first-time buyers.',
    price: 1750000,
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'AA-205',
    name: 'Elegant Mid-Rise Unit',
    project: 'New Giza',
    description:
      'Sophisticated apartment with elegant interiors. High ceilings, premium flooring, and designer lighting throughout.',
    price: 5900000,
    bedrooms: 3,
    bathrooms: 2,
    area: 185,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
    ],
  },
  {
    unitNumber: 'AB-308',
    name: 'Modern Family Retreat',
    project: 'Il Bosco',
    description:
      'Spacious family home with open-concept design. Features large windows, contemporary kitchen, and private balconies.',
    price: 5400000,
    bedrooms: 3,
    bathrooms: 3,
    area: 195,
    images: [
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
  },
  {
    unitNumber: 'AC-402',
    name: 'Luxury Waterfront View',
    project: 'O West',
    description:
      'Premium apartment with stunning water views. Floor-to-ceiling windows, marble finishes, and high-end fixtures throughout.',
    price: 7200000,
    bedrooms: 4,
    bathrooms: 3,
    area: 245,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
  },
  {
    unitNumber: 'AD-103',
    name: 'Cozy Garden Nest',
    project: 'City Gate',
    description:
      'Intimate apartment with private garden access. Perfect for nature lovers with direct access to green spaces.',
    price: 2950000,
    bedrooms: 2,
    bathrooms: 1,
    area: 105,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    ],
  },
  {
    unitNumber: 'AE-506',
    name: 'Executive Penthouse Suite',
    project: 'New Giza',
    description:
      'Ultra-luxury penthouse with private elevator access. Features wine cellar, home theater, and wraparound terrace.',
    price: 11500000,
    bedrooms: 5,
    bathrooms: 5,
    area: 380,
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
  },
  {
    unitNumber: 'AF-201',
    name: 'Smart Urban Living',
    project: 'Villette',
    description:
      'Tech-integrated apartment with smart home automation. Energy-efficient design with modern aesthetic appeal.',
    price: 2550000,
    bedrooms: 2,
    bathrooms: 2,
    area: 100,
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
    ],
  },
  {
    unitNumber: 'AG-404',
    name: 'Contemporary Duplex Loft',
    project: 'Il Bosco',
    description:
      'Stunning two-level loft with industrial-chic design. Double-height ceilings, exposed brick, and modern finishes.',
    price: 6900000,
    bedrooms: 3,
    bathrooms: 3,
    area: 230,
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
  },
  {
    unitNumber: 'AH-107',
    name: 'Serene Garden Apartment',
    project: 'O West',
    description:
      'Peaceful ground-floor unit with expansive garden. Ideal for families with children or pet owners.',
    price: 4750000,
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    images: [
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
  },
  {
    unitNumber: 'AI-309',
    name: 'Metropolitan Chic',
    project: 'City Gate',
    description:
      'Stylish city apartment with contemporary design. Features open kitchen, sleek bathrooms, and smart storage solutions.',
    price: 3350000,
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
    ],
  },
  {
    unitNumber: 'AJ-502',
    name: 'Panoramic Sky Villa',
    project: 'New Giza',
    description:
      'High-floor apartment with 360-degree city views. Premium finishes, spacious layout, and luxury amenities.',
    price: 8950000,
    bedrooms: 4,
    bathrooms: 4,
    area: 290,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
  },
  {
    unitNumber: 'AK-204',
    name: 'Minimalist Modern Home',
    project: 'Villette',
    description:
      'Clean, minimalist design with maximum functionality. Features Japanese-inspired aesthetics and zen garden views.',
    price: 2700000,
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    images: [
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'AL-605',
    name: 'Grand Family Estate',
    project: 'Il Bosco',
    description:
      'Expansive family home with multiple living areas. Features maid quarters, study room, and entertainment space.',
    price: 7500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 310,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
  },
  {
    unitNumber: 'AM-108',
    name: 'Accessible Ground Unit',
    project: 'O West',
    description:
      'Wheelchair-accessible apartment with universal design. Wide doorways, roll-in shower, and barrier-free layout.',
    price: 3850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    images: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    unitNumber: 'AN-301',
    name: 'Urban Professional Suite',
    project: 'City Gate',
    description:
      'Perfect for busy professionals. Home office space, high-speed connectivity, and modern conveniences.',
    price: 2800000,
    bedrooms: 1,
    bathrooms: 1,
    area: 80,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'AO-405',
    name: 'Riverside Luxury',
    project: 'New Giza',
    description:
      'Exclusive riverside location with private dock access. Premium materials, smart home tech, and river views.',
    price: 9200000,
    bedrooms: 4,
    bathrooms: 4,
    area: 275,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
  },
  {
    unitNumber: 'AP-206',
    name: 'Compact Efficiency',
    project: 'Villette',
    description:
      'Efficiently designed small apartment with smart storage. Perfect for minimalists seeking quality over quantity.',
    price: 1950000,
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
  },
  {
    unitNumber: 'AQ-503',
    name: 'Nature-Inspired Retreat',
    project: 'Il Bosco',
    description:
      'Biophilic design with natural materials throughout. Large windows bring outdoor greenery inside.',
    price: 5650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 190,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
  },
  {
    unitNumber: 'AR-109',
    name: 'Family-Friendly Haven',
    project: 'O West',
    description:
      'Safe, family-oriented apartment near schools and parks. Features playroom space and child-safe fixtures.',
    price: 4450000,
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    images: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    ],
  },
  {
    unitNumber: 'AS-407',
    name: 'Skyline View Premium',
    project: 'City Gate',
    description:
      'Stunning skyline views from every room. Features floor-to-ceiling windows and modern open-plan design.',
    price: 4100000,
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    unitNumber: 'AT-604',
    name: 'Deluxe Top Floor',
    project: 'New Giza',
    description:
      'Premium top-floor unit with no noise from above. Features rooftop terrace access and panoramic views.',
    price: 8100000,
    bedrooms: 4,
    bathrooms: 3,
    area: 255,
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
    ],
  },
  {
    unitNumber: 'AU-302',
    name: 'Boutique Living Space',
    project: 'Villette',
    description:
      'Carefully curated apartment with designer touches. Features custom built-ins and premium appliances.',
    price: 2900000,
    bedrooms: 2,
    bathrooms: 2,
    area: 115,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
  },
  {
    unitNumber: 'AV-505',
    name: 'Garden Terrace Oasis',
    project: 'Il Bosco',
    description:
      'Unique unit with private garden terrace. Perfect for entertaining with outdoor kitchen and lounge area.',
    price: 6200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 205,
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    ],
  },
  {
    unitNumber: 'AW-110',
    name: 'Tranquil Ground Living',
    project: 'O West',
    description:
      'Peaceful ground-level apartment with direct courtyard access. Features private entrance and patio space.',
    price: 4200000,
    bedrooms: 2,
    bathrooms: 2,
    area: 155,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
    ],
  },
  {
    unitNumber: 'AX-408',
    name: 'Metropolitan Heights',
    project: 'City Gate',
    description:
      'High-rise living with spectacular city lights. Modern design with integrated smart home technology.',
    price: 3750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    images: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
];

async function seed() {
  console.log('🌱 Starting database seeding...');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing apartments...');
    await db.delete(schema.apartments);

    // Insert new data
    console.log('📦 Inserting apartment data...');
    for (const apartment of apartments) {
      await db.insert(schema.apartments).values({
        unitNumber: apartment.unitNumber,
        name: apartment.name,
        project: apartment.project,
        description: apartment.description,
        price: apartment.price.toString(),
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        area: apartment.area.toString(),
        images: apartment.images,
      });
    }

    console.log(`✅ Successfully seeded ${apartments.length} apartments!`);
    console.log('📊 Summary:');
    console.log(
      `   - O West: ${apartments.filter((a) => a.project === 'O West').length}`,
    );
    console.log(
      `   - New Giza: ${apartments.filter((a) => a.project === 'New Giza').length}`,
    );
    console.log(
      `   - Il Bosco: ${apartments.filter((a) => a.project === 'Il Bosco').length}`,
    );
    console.log(
      `   - City Gate: ${apartments.filter((a) => a.project === 'City Gate').length}`,
    );
    console.log(
      `   - Villette: ${apartments.filter((a) => a.project === 'Villette').length}`,
    );
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seed()
  .then(() => {
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
