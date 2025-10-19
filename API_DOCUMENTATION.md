# 📚 API Documentation

Complete API reference for the Nawy Apartment Listing backend.

## Base URLs

**Local Development:**

```
http://localhost:3001/api/v1
```

**Production (Live):**

```
https://api.adam.ahmadalasiri.info/api/v1
```

**Try it now:** [https://api.adam.ahmadalasiri.info/api/v1/apartments](https://api.adam.ahmadalasiri.info/api/v1/apartments)

---

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Nawy Apartment Listing API"
}
```

---

### 2. List Apartments

Get a paginated list of apartments with optional search and filters.

**Endpoint:** `GET /apartments`

**Query Parameters:**

| Parameter | Type   | Required | Description                             | Example |
| --------- | ------ | -------- | --------------------------------------- | ------- |
| page      | number | No       | Page number (default: 1)                | 1       |
| limit     | number | No       | Items per page (default: 12, max: 100)  | 12      |
| search    | string | No       | Search by name, unit number, or project | luxury  |
| project   | string | No       | Filter by project name                  | O West  |
| minPrice  | number | No       | Minimum price in EGP                    | 2000000 |
| maxPrice  | number | No       | Maximum price in EGP                    | 5000000 |
| bedrooms  | number | No       | Filter by number of bedrooms            | 3       |
| bathrooms | number | No       | Filter by number of bathrooms           | 2       |

**Example Request:**

```bash
curl "http://localhost:3001/api/v1/apartments?page=1&limit=12&search=luxury&project=O%20West&minPrice=2000000&maxPrice=5000000&bedrooms=3"
```

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "unitNumber": "A-101",
      "name": "Luxury Garden Apartment",
      "project": "O West",
      "description": "Stunning ground floor apartment with a private garden...",
      "price": "4500000",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": "180",
      "images": [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

**Status Codes:**

- `200 OK` - Success
- `400 Bad Request` - Invalid query parameters
- `500 Internal Server Error` - Server error

---

### 3. Get Apartment by ID

Get detailed information about a specific apartment.

**Endpoint:** `GET /apartments/:id`

**Path Parameters:**

| Parameter | Type | Required | Description  |
| --------- | ---- | -------- | ------------ |
| id        | UUID | Yes      | Apartment ID |

**Example Request:**

```bash
curl "http://localhost:3001/api/v1/apartments/550e8400-e29b-41d4-a716-446655440000"
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "unitNumber": "A-101",
  "name": "Luxury Garden Apartment",
  "project": "O West",
  "description": "Stunning ground floor apartment with a private garden. Features modern finishes, spacious living areas, and premium amenities. Located in the heart of O West with easy access to all facilities.",
  "price": "4500000",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": "180",
  "images": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1502672260066-6bc35f0f1edb?w=800"
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `200 OK` - Success
- `400 Bad Request` - Invalid UUID format
- `404 Not Found` - Apartment not found
- `500 Internal Server Error` - Server error

---

### 4. Get Unique Projects

Get a list of all unique project names.

**Endpoint:** `GET /apartments/projects`

**Example Request:**

```bash
curl "http://localhost:3001/api/v1/apartments/projects"
```

**Response:**

```json
["City Gate", "Il Bosco", "New Giza", "O West", "Villette"]
```

**Status Codes:**

- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 5. Create Apartment (Admin/Seeding)

Create a new apartment listing.

**Endpoint:** `POST /apartments`

**Request Body:**

```json
{
  "unitNumber": "Z-101",
  "name": "Modern Apartment",
  "project": "New Project",
  "description": "A beautiful modern apartment...",
  "price": 3500000,
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 120,
  "images": ["https://example.com/image1.jpg"]
}
```

**Validation Rules:**

- `unitNumber`: Required, max 50 characters, must be unique
- `name`: Required, max 255 characters
- `project`: Required, max 255 characters
- `description`: Required
- `price`: Required, must be >= 0
- `bedrooms`: Required, integer >= 0
- `bathrooms`: Required, integer >= 0
- `area`: Required, must be >= 0
- `images`: Optional, array of strings

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "unitNumber": "Z-101",
  "name": "Modern Apartment",
  "project": "New Project",
  "description": "A beautiful modern apartment...",
  "price": "3500000",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": "120",
  "images": ["https://example.com/image1.jpg"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `201 Created` - Success
- `400 Bad Request` - Validation error
- `409 Conflict` - Unit number already exists
- `500 Internal Server Error` - Server error

---

## Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## Rate Limiting

- **Limit:** 100 requests per minute per IP
- **Response when exceeded:** `429 Too Many Requests`

---

## CORS

CORS is enabled for all origins in development. Configure `CORS_ORIGINS` in `.env` for production.

---

## Testing with cURL

### List all apartments

```bash
curl http://localhost:3001/api/v1/apartments
```

### Search apartments

```bash
curl "http://localhost:3001/api/v1/apartments?search=luxury"
```

### Filter by project and price

```bash
curl "http://localhost:3001/api/v1/apartments?project=O%20West&minPrice=2000000&maxPrice=5000000"
```

### Get apartment by ID

```bash
curl http://localhost:3001/api/v1/apartments/YOUR_APARTMENT_ID
```

### Get projects

```bash
curl http://localhost:3001/api/v1/apartments/projects
```

---

## Testing with Postman

Import the following requests into Postman:

1. **GET** `http://localhost:3001/api/v1/apartments`
2. **GET** `http://localhost:3001/api/v1/apartments/:id`
3. **GET** `http://localhost:3001/api/v1/apartments/projects`
4. **POST** `http://localhost:3001/api/v1/apartments`

---

## Database Schema

See [README.md](./README.md#-database-schema) for full database schema documentation.
